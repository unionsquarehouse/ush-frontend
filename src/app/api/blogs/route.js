// app/api/blogs/route.js
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ----------------------- ENV + helpers ----------------------- */

// Mongo assets (e.g., https://ush.imgix.net/)
const MONGO_ASSET_BASE = (process.env.MONGO_ASSET_BASE || "").replace(
  /\/+$/,
  ""
);
const withMongoBase = (u) => {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u; // already absolute
  if (!MONGO_ASSET_BASE) return u; // base not set—return as-is
  return `${MONGO_ASSET_BASE}/${String(u).replace(/^\/+/, "")}`;
};

// Strapi base
const STRAPI_BASE = process.env.STRAPI_BASE_URL;

const joinUrl = (...parts) =>
  parts
    .filter(Boolean)
    .map((p, i) =>
      i === 0 ? p.replace(/\/+$/, "") : p.replace(/^\/+|\/+$/g, "")
    )
    .join("/");

const STRAPI_ASSET_BASE = process.env.STRAPI_BASE_URL;;

const fullUrl = (u) => {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u;
  if (!STRAPI_ASSET_BASE) return u;
  return joinUrl(STRAPI_ASSET_BASE, u);
};

const cryptoRandom = () => Math.random().toString(36).slice(2);
const toIso = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d) ? null : d.toISOString();
};
const ts = (x) => {
  const t = x?.publishedAt ? new Date(x.publishedAt).getTime() : 0;
  return Number.isFinite(t) ? t : 0;
};

/* ----------------------- normalizers ----------------------- */

function normalizeMongo(doc) {
  // try a bunch of common shapes
  const imgCandidates = [
    doc.imageUrl,
    doc.image?._default,
    doc.image?.url,
    doc.featuredImage?._default,
    doc.featuredImage?.url,
    doc.coverImage?._default,
    doc.coverImage?.url,
    doc.thumbnail?._default,
    doc.thumbnail?.url,
    Array.isArray(doc.images) &&
      (doc.images[0]?._default || doc.images[0]?.url || doc.images[0]),
  ].filter(Boolean);

  const rawImg = imgCandidates.find(Boolean);
  const imageUrl = withMongoBase(rawImg);

  const html =
    doc.contentHtml ||
    (typeof doc.content === "string" && /<\/?[a-z][\s\S]*>/i.test(doc.content)
      ? doc.content
      : undefined);

  const publishedAt = toIso(
    doc.publishedAt ?? doc.date ?? doc.createdAt ?? doc.updatedAt
  );
  const id = String(doc._id ?? doc.id ?? doc.slug ?? cryptoRandom());

  return {
    source: "mongo",
    id,
    documentId: id,
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? doc.summary ?? "",
    desc: doc.desc?.raw ?? "",
    contentHtml: html,
    contentMarkdown: undefined,
    imageUrl,
    image: imageUrl, // legacy alias your UI also reads
    imageAlt: doc.imageAlt || doc.image_alt || doc.image?.alt || "",
    author: doc.author ?? doc.authorName ?? "Unknown Author",
    authorBio: doc.authorBio ?? "",
    category: doc.category ?? "General",
    readTime: doc.readTime ?? null,
    featured: !!doc.featured,
    publishedAt,
    date: publishedAt, // convenience
    slug: doc.slug ?? id,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
  };
}

// Safer getter for nested Strapi media fields (v4)
const getMediaUrl = (node) => {
  // Accepts shapes: {url}, {data:{attributes:{url}}}, arrays, or null
  if (!node) return undefined;
  if (Array.isArray(node) && node.length > 0) return getMediaUrl(node[0]);
  const url =
    node.url ||
    node?.data?.attributes?.url ||
    node?.data?.url ||
    node?.attributes?.url;
  return fullUrl(url);
};
function normalizeStrapi(item) {
  const a = item?.attributes ? { id: item.id, ...item.attributes } : item || {};

  const image = getMediaUrl(
    a.image || a.cover || a.featuredImage || a.thumbnail || a.images
  );

  const publishedAt = toIso(a.publishedAt ?? a.date ?? a.createdAt);
  const id = String(a.id ?? a.documentId ?? cryptoRandom());

  return {
    source: "strapi",
    id,
    documentId: id,
    title: a.title ?? "",
    excerpt: a.excerpt ?? "",
    desc: a?.desc ?? "",
    contentHtml: undefined, // keep markdown fallback
    contentMarkdown: a.content ?? "",
    imageUrl: image,
    image: image, // legacy alias
    imageAlt:
      a.image?.alternativeText ||
      a.image?.data?.attributes?.alternativeText ||
      "",
    author: a.authorName ?? a.author ?? "Unknown Author",
    authorBio: a.authorBio ?? "",
    category: a.category ?? "General",
    readTime: a.readMinutes ?? null,
    featured: !!a.featured,
    publishedAt,
    date: publishedAt,
    slug: a.slug ?? id,
    tags: Array.isArray(a.tags) ? a.tags : [],
  };
}
/* ----------------------- route ----------------------- */

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // query params
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const ppRaw = Math.max(
      parseInt(searchParams.get("pageSize") || "9", 10),
      1
    );
    const pageSize = Math.min(ppRaw, 100);

    const search = (searchParams.get("search") || "").trim().toLowerCase();
    const category = (searchParams.get("category") || "").trim().toLowerCase();
    const author = (searchParams.get("author") || "").trim().toLowerCase();
    const sortBy = (searchParams.get("sort") || "date").toLowerCase(); // date | title

    // fetch in parallel
    const [mongoRes, strapiRes] = await Promise.allSettled([
      // Mongo
      (async () => {
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB_NAME);
        const raw = await db
          .collection(process.env.BLOGS_COLLECTION)
          .find({})
          .sort({ publishedAt: 1 })
          .toArray();
        return raw.map(normalizeMongo);
      })(),

      // Strapi
      (async () => {
        // Hitting the correct collection endpoint:
        const url =
          joinUrl(process.env.STRAPI_BASE_URL, "api", "blogs") +
          `?populate=image&pagination[pageSize]=9`;

        const headers = {
          Accept: "application/json",
        };

        const res = await fetch(url, {
          headers /* , cache: 'no-store' if you want */,
        });

        if (!res.ok) {
          // Surface status text clearly
          const text = await res.text();
          throw new Error(`Strapi HTTP ${res.status}: ${text.slice(0, 200)}`);
        }

        // Make sure it's JSON before parsing
        const ctype = res.headers.get("content-type") || "";
        if (!ctype.toLowerCase().includes("application/json")) {
          const text = await res.text();
          // Log the first part so you can see if it's HTML/login/redirect
          console.error("Strapi non-JSON response head:", text.slice(0, 200));
          return []; // fail soft so your route keeps working
        }

        const json = await res.json();
        const arr = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
          ? json.data
          : [];
        return arr.map(normalizeStrapi);
      })(),
    ]);

    const mongoBlogs = mongoRes.status === "fulfilled" ? mongoRes.value : [];
    const strapiBlogs = strapiRes.status === "fulfilled" ? strapiRes.value : [];
    console.log(mongoBlogs, "-----------------------------------mongo");
    console.log(strapiBlogs, "-------------------------strapi");

    if (mongoRes.status === "rejected")
      console.error("Mongo error:", mongoRes.reason);
    if (strapiRes.status === "rejected")
      console.error("Strapi error:", strapiRes.reason);

    // merge both sources
    let merged = [...strapiBlogs, ...mongoBlogs];

    // build facets from the full set (so dropdowns include all options)
    const facetCategories = Array.from(
      new Set(merged.map((x) => x.category || "General"))
    ).sort((a, b) => a.localeCompare(b));
    const facetAuthors = Array.from(
      new Set(merged.map((x) => x.author || "Unknown Author"))
    ).sort((a, b) => a.localeCompare(b));

    // filters
    if (search) {
      merged = merged.filter((b) => {
        const hay = `${b.title} ${b.excerpt} ${b.category} ${b.author} ${
          b.tags?.join(" ") || ""
        }`.toLowerCase();
        return hay.includes(search);
      });
    }
    if (category) {
      merged = merged.filter(
        (b) => (b.category || "").toLowerCase() === category
      );
    }
    if (author) {
      merged = merged.filter((b) => (b.author || "").toLowerCase() === author);
    }

    // sort globally: latest date first (no Strapi/Mongo grouping)
    if (sortBy === "title") {
      merged.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      merged.sort((a, b) => ts(b) - ts(a)); // newest first
    }

    // pagination
    const total = merged.length;
    const pageCount = Math.max(Math.ceil(total / pageSize), 1);
    const safePage = Math.min(page, pageCount);
    const start = (safePage - 1) * pageSize;
    const blogs = merged.slice(start, start + pageSize);

    return Response.json({
      success: true,
      blogs,
      meta: {
        pagination: {
          page: safePage,
          pageSize,
          pageCount,
          total,
        },
        facets: {
          categories: facetCategories,
          authors: facetAuthors,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
