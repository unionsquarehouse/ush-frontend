// app/api/blogs/[id]/route.js
export const dynamic = "force-dynamic";

import clientPromise from "../../../../lib/mongodb";

/* ---------- ENV + helpers ---------- */
const MONGO_ASSET_BASE = (process.env.MONGO_ASSET_BASE || "").replace(/\/+$/, "");
const STRAPI_API_BASE = (process.env.STRAPI_BASE_URL || process.env.STRAPI_BASE_URL || "").replace(/\/+$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
// Where your public assets are served from; default to your imgix CDN
const STRAPI_ASSET_BASE = (process.env.STRAPI_ASSET_BASE || "https://ush.imgix.net").replace(/\/+$/, "");

const withMongoBase = (u) => {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u;
  if (!MONGO_ASSET_BASE) return u;
  return `${MONGO_ASSET_BASE}/${String(u).replace(/^\/+/, "")}`;
};

const joinUrl = (...parts) =>
  parts
    .filter(Boolean)
    .map((p, i) => (i === 0 ? p.replace(/\/+$/, "") : p.replace(/^\/+|\/+$/g, "")))
    .join("/");

// Use ASSET base (imgix) for media files, not the API base
const fullAssetUrl = (u) => {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u;
  if (!STRAPI_ASSET_BASE) return u;
  return joinUrl(STRAPI_ASSET_BASE, u);
};

const toIso = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d) ? null : d.toISOString();
};
const ts = (x) => {
  const t = x?.publishedAt ? new Date(x.publishedAt).getTime() : 0;
  return Number.isFinite(t) ? t : 0;
};

/* ---------- media resolvers ---------- */
const pickMediaUrl = (node) => {
  if (!node) return undefined;
  if (Array.isArray(node) && node.length > 0) return pickMediaUrl(node[0]);
  const url = node.url || node?.data?.attributes?.url || node?.data?.url || node?.attributes?.url;
  return fullAssetUrl(url);
};

// Walk a block and replace common media fields with plain URLs
const normalizeBlock = (block) => {
  if (!block || typeof block !== "object") return block;

  const out = { ...block };

  // Most common fields across your components
  if (out.image) out.image = pickMediaUrl(out.image);
  if (out.background) out.background = pickMediaUrl(out.background);
  if (out.media) out.media = pickMediaUrl(out.media);
  if (Array.isArray(out.images)) out.images = out.images.map((x) => pickMediaUrl(x));

  // Some components may nest objects; shallowly walk one level
  for (const k of Object.keys(out)) {
    const v = out[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      // If it looks like a Strapi media object, resolve it
      const maybeUrl = pickMediaUrl(v);
      if (maybeUrl) out[k] = maybeUrl;
    }
  }
  return out;
};

/* ---------- normalizers ---------- */
function normalizeMongo(doc) {
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
    Array.isArray(doc.images) && (doc.images[0]?._default || doc.images[0]?.url || doc.images[0]),
  ].filter(Boolean);
  const rawImg = imgCandidates.find(Boolean);
  const imageUrl = withMongoBase(rawImg);

  const html =
    doc.contentHtml ||
    (typeof doc.content === "string" && /<\/?[a-z][\s\S]*>/i.test(doc.content) ? doc.content : undefined);

  const publishedAt = toIso(doc.publishedAt ?? doc.date ?? doc.createdAt ?? doc.updatedAt);
  const id = String(doc._id ?? doc.id ?? doc.slug ?? Math.random().toString(36).slice(2));

  return {
    source: "mongo",
    id,
    documentId: id,
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? doc.summary ?? "",
    // Keep HTML/string if present; frontend will render as HTML
    desc: doc.desc ?? html ?? "",
    contentHtml: html,
    contentMarkdown: undefined,
    imageUrl,
    image: imageUrl,
    imageAlt: doc.imageAlt || doc.image_alt || doc.image?.alt || "",
    author: doc.author ?? doc.authorName ?? "Unknown Author",
    authorBio: doc.authorBio ?? "",
    category: doc.category ?? "General",
    readTime: doc.readTime ?? null,
    featured: !!doc.featured,
    publishedAt,
    date: publishedAt,
    slug: doc.slug ?? id,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    // Mongo doesn't have Strapi dynamic blocks; keep empty for symmetry
    blocks: [],
    seo: undefined,
  };
}

function normalizeStrapi(item) {
  const a = item?.attributes ? { id: item.id, ...item.attributes } : item || {};

  const image = pickMediaUrl(a.image || a.cover || a.featuredImage || a.thumbnail || a.images);
  const publishedAt = toIso(a.publishedAt ?? a.date ?? a.createdAt);
  const id = String(a.id ?? a.documentId ?? Math.random().toString(36).slice(2));

  // Normalize dynamic zone blocks (preserve order)
  const blocks = Array.isArray(a.blocks) ? a.blocks.map((b) => normalizeBlock(b)) : [];

  return {
    source: "strapi",
    id,
    documentId: id,
    title: a.title ?? "",
    excerpt: a.excerpt ?? "",
    // In your schema `desc` is TEXT; you store HTML in it — pass through as-is
    desc: a.desc ?? "",
    contentMarkdown: a.content ?? "",
    imageUrl: image,
    image: image,
    imageAlt:
      a.image?.alternativeText ||
      a?.image?.data?.attributes?.alternativeText ||
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
    blocks,
    seo: a.seo ?? undefined,
  };
}

/* ---------- data loaders ---------- */
async function loadMongoAll() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const raw = await db
    .collection(process.env.BLOGS_COLLECTION)
    .find({})
    .sort({ publishedAt: 1 })
    .toArray();
  return raw.map(normalizeMongo);
}

async function loadStrapiByKey(key) {
  if (!STRAPI_API_BASE) return [];

  const params = new URLSearchParams();
  // Try slug
  params.append("filters[$or][0][slug][$eq]", key);
  // If key is numeric, also try id
  const asNum = Number(key);
  if (Number.isFinite(asNum)) params.append("filters[$or][1][id][$eq]", String(asNum));

  // Populate hero image + dynamic zone (and its media) + seo
  params.append("populate[image]", "*");
  params.append("populate[blocks][populate]", "*");
  params.append("populate[seo]", "*");
  params.append("pagination[pageSize]", "1");

  const url = `${joinUrl(STRAPI_API_BASE, "api", "blogs")}?${params.toString()}`;
  const headers = { Accept: "application/json" };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url, { headers, cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Strapi HTTP", res.status, text.slice(0, 200));
    return [];
  }
  const ctype = (res.headers.get("content-type") || "").toLowerCase();
  if (!ctype.includes("application/json")) {
    const text = await res.text().catch(() => "");
    console.error("Strapi non-JSON:", text.slice(0, 200));
    return [];
  }

  const json = await res.json();
  const arr = Array.isArray(json?.data) ? json.data : [];
  return arr.map(normalizeStrapi);
}

/* ---------- route ---------- */
export async function GET(_req, { params }) {
  try {
    const key = decodeURIComponent(params.id); // id OR slug

    // Load targeted Strapi (0-1 items) and all Mongo (small collection expected)
    const [mongoRes, strapiRes] = await Promise.allSettled([
      loadMongoAll(),
      loadStrapiByKey(key),
    ]);

    const mongoBlogs = mongoRes.status === "fulfilled" ? mongoRes.value : [];
    const strapiBlogs = strapiRes.status === "fulfilled" ? strapiRes.value : [];

    if (mongoRes.status === "rejected") console.error("Mongo error:", mongoRes.reason);
    if (strapiRes.status === "rejected") console.error("Strapi error:", strapiRes.reason);

    // Prefer Strapi match if found (has blocks etc.), else look in Mongo
    const fromStrapi =
      strapiBlogs.find((b) => String(b.id) === key) ||
      strapiBlogs.find((b) => String(b.documentId) === key) ||
      strapiBlogs.find((b) => String(b.slug) === key);

    const fromMongo =
      mongoBlogs.find((b) => String(b.id) === key) ||
      mongoBlogs.find((b) => String(b.documentId) === key) ||
      mongoBlogs.find((b) => String(b.slug) === key);

    const blog = fromStrapi || fromMongo;

    if (!blog) {
      return Response.json({ success: false, message: "Not found" }, { status: 404 });
    }

    // Ensure `desc` is present for frontend HTML rendering
    const final = {
      ...blog,
      desc:
        blog.desc ||
        blog.contentHtml ||
        (blog.contentMarkdown ? `<pre>${blog.contentMarkdown}</pre>` : ""),
    };

    return Response.json({ success: true, blog: final });
  } catch (err) {
    console.error("GET /api/blogs/[id] error:", err);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
