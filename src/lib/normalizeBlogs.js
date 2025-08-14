const MONGO_ASSET_BASE = process.env.MONGO_ASSET_BASE || "";

function pickMongoImageUrl(img) {
  if (!img) return undefined;
  const p = img._default || img.path;
  if (!p) return undefined;
  if (/^https?:\/\//i.test(p)) return p;
  return `${MONGO_ASSET_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
}

function mapMongoBlog(doc) {
  const title = doc.title || doc._title || "";
  const slug = doc.slug || doc.title_slug || null;

  const excerpt =
    (doc.excerpt && (doc.excerpt.processed || doc.excerpt.raw)) ||
    (doc.meta_desc && (doc.meta_desc.processed || doc.meta_desc.raw)) ||
    null;

  const contentHtml =
    (doc.desc && doc.desc.processed) ||
    (doc.form_desc && doc.form_desc.processed) ||
    null;

  const blockWithImage = doc._blocks && doc._blocks.find(b => b.image);
  const blockWithImages = doc._blocks && doc._blocks.find(b => b.images && b.images.length);

  const image =
    doc.image ||
    doc.og_image ||
    (blockWithImage && blockWithImage.image) ||
    (blockWithImages && blockWithImages.images?.[0]?.image);

  const imageUrl = pickMongoImageUrl(image);

  const imageAlt =
    doc.image_alt ||
    doc.alt ||
    (doc._blocks && doc._blocks.find(b => b.alt)?.alt) ||
    null;

  const publishedAt = doc.dateTime
    ? new Date(doc.dateTime).toISOString()
    : doc.itemUpdated
    ? new Date(doc.itemUpdated).toISOString()
    : null;

  const updatedAt = doc.itemUpdated ? new Date(doc.itemUpdated).toISOString() : null;

  return {
    id: String(doc._id || doc.itemID || doc.itemRowID || title),
    slug,
    title,
    excerpt,
    contentHtml,
    contentMarkdown: null,
    imageUrl: imageUrl || null,
    imageAlt,
    author: null,
    authorBio: null,
    category: Array.isArray(doc.categories) ? doc.categories[0] : null,
    readTime: null,
    featured: false,
    publishedAt,
    updatedAt,
    source: "mongodb",
    raw: doc,
  };
}

function mapStrapiBlog(entry) {
  return {
    id: String(entry.id),
    slug: null, // add if/when you store slug in Strapi
    title: entry.title || "",
    excerpt: entry.excerpt || null,
    contentHtml: null,
    contentMarkdown: typeof entry.content === "string" ? entry.content : null,
    imageUrl: null,     // set when you add a cover image: entry.cover?.url
    imageAlt: null,
    author: entry.author || null,
    authorBio: entry.authorBio || null,
    category: entry.category || null,
    readTime: entry.readTime || null,
    featured: Boolean(entry.featured),
    publishedAt: entry.date ? new Date(entry.date).toISOString() : entry.createdAt || null,
    updatedAt: entry.updatedAt || null,
    source: "strapi",
    raw: entry,
  };
}

function sortByDateDesc(a, b) {
  const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
  const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
  return db - da;
}

function dedupeByKey(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const k = keyFn(it);
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(it);
    }
  }
  return out;
}

module.exports = {
  mapMongoBlog,
  mapStrapiBlog,
  sortByDateDesc,
  dedupeByKey,
};
