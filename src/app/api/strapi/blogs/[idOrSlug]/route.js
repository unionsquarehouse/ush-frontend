// app/api/blogs/[idOrSlug]/route.js
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STRAPI_BASE = process.env.STRAPI_BASE_URL || "http://localhost:1337";

// ————— helpers —————
const isNumericId = (v) => /^\d+$/.test(String(v || "").trim());

const absUrl = (u) => {
  if (!u) return null;
  return /^https?:\/\//i.test(u) ? u : `${STRAPI_BASE}${u.startsWith("/") ? "" : "/"}${u}`;
};

// Flatten a Strapi entry whether it's `{ id, attributes: {...} }` or already flat
const flattenStrapiEntry = (entry) => {
  const a = entry?.attributes ? { id: entry.id, ...entry.attributes } : entry || {};

  // image & authorImage can be either `{url}` or `{data:{attributes:{url}}}`
  const imageUrl =
    a?.image?.url ||
    a?.image?.data?.attributes?.url ||
    a?.featuredImage?.url ||
    a?.featuredImage?.data?.attributes?.url ||
    null;

  const authorImageUrl =
    a?.authorImage?.url || a?.authorImage?.data?.attributes?.url || null;

  return {
    id: a.id,
    documentId: a.documentId ?? a.id,
    title: a.title ?? "",
    excerpt: a.excerpt ?? "",
    content: a.content ?? "",
    author: a.author ?? "",
    authorBio: a.authorBio ?? "",
    date: a.date ?? a.publishedAt ?? a.createdAt ?? null,
    category: a.category ?? "General",
    readTime: a.readTime ?? null,
    featured: !!a.featured,
    views: a.views ?? 1250, // not in Strapi → default
    image: imageUrl ? absUrl(imageUrl) : null,
    authorImage: authorImageUrl ? absUrl(authorImageUrl) : null,
    createdAt: a.createdAt ?? null,
    updatedAt: a.updatedAt ?? null,
    publishedAt: a.publishedAt ?? null,
    slug: a.slug ?? null,
    blocks: a.blocks ?? [],
    seo: a.seo ?? null,
  };
};

// ————— GET /api/blogs/[idOrSlug] —————
export async function GET(_req, { params }) {
  try {
    const { idOrSlug } = await params || {};
    if (!idOrSlug) {
      return NextResponse.json(
        { success: false, error: "Missing id or slug." },
        { status: 400 }
      );
    }

    // Build URL
    let url;
    const sp = new URLSearchParams();

    // populate multiple relations (same as your list route)
    // Using repeated "populate" params is supported by Strapi v4:
    sp.append("populate", "image");
    sp.append("populate", "blocks");
    sp.append("populate", "seo");

    if (isNumericId(idOrSlug)) {
      // GET by numeric ID
      url = new URL(`${STRAPI_BASE}/api/blogs/${idOrSlug}`);
      // add populate params
      url.search = sp.toString();
    } else {
      // GET by slug (filter & limit 1)
      url = new URL(`${STRAPI_BASE}/api/blogs`);
      sp.set("pagination[pageSize]", "1");
      sp.set("filters[slug][$eq]", idOrSlug);
      url.search = sp.toString();
    }

    // Fetch from Strapi
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      // cache: "no-store", // uncomment if you want no caching at all
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          success: false,
          error: `Strapi HTTP ${res.status}`,
          details: text.slice(0, 200),
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Normalize the response shape
    let entry = null;
    if (isNumericId(idOrSlug)) {
      // by id → single object in `data`
      entry = data?.data || null;
    } else {
      // by slug → array in `data`, take first
      entry = Array.isArray(data?.data) ? data.data[0] : null;
    }

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "Blog not found." },
        { status: 404 }
      );
    }

    const blog = flattenStrapiEntry(entry);

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog by id/slug:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
