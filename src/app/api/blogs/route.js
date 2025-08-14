// app/blogs/[id]/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaLink,
  FaShareAlt,
} from "react-icons/fa";
import { Button } from "../../components/ui/button"; // adjust if needed

/* ----------------------- HTML helpers ----------------------- */
const ASSET_BASE = "https://ush.imgix.net";

const toText = (v) => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean")
    return String(v);
  if (typeof v === "object") {
    if (typeof v.processed === "string") return v.processed;
    if (typeof v.raw === "string") return v.raw;
  }
  return "";
};

const pickHtml = (v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return toText(v);
};

const absolutizeImageSrc = (html, assetBase = ASSET_BASE) =>
  (html || "").replace(
    /(<img\b[^>]*?\bsrc\s*=\s*["'])(\/[^"']*)(["'][^>]*>)/gi,
    (_, pre, path, post) => `${pre}${assetBase}${path}${post}`
  );

const enhanceHtml = (html) => {
  if (!html) return "";

  const withImgAttrs = html.replace(
    /<img\b((?:(?!>)[\s\S])*)>/gi,
    (match, attrs) => {
      const hasWidth = /\bwidth\s*=/.test(attrs);
      const hasHeight = /\bheight\s*=/.test(attrs);
      const hasLoading = /\bloading\s*=/.test(attrs);
      const hasDecoding = /\bdecoding\s*=/.test(attrs);
      const hasStyle = /\bstyle\s*=/.test(attrs);

      const width = hasWidth ? "" : ' width="1200"';
      const height = hasHeight ? "" : ' height="675"';
      const loading = hasLoading ? "" : ' loading="lazy"';
      const decoding = hasDecoding ? "" : ' decoding="async"';
      const style = hasStyle
        ? ""
        : ' style="max-width:100%;height:auto;display:block;aspect-ratio:1200/675;"';

      return `<img${attrs}${width}${height}${loading}${decoding}${style}>`;
    }
  );

  const withSafeLinks = withImgAttrs.replace(
    /<a\b(?![^>]*\btarget=)[^>]*\bhref=["'][^"']+["'][^>]*>/gi,
    (m) => m.replace(/>$/, ' target="_blank" rel="noopener noreferrer">')
  );

  return withSafeLinks;
};

/* ----------------------- media helpers ----------------------- */
const fullStrapiUrl = (u) => {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u;
  return `${ASSET_BASE}${u.startsWith("/") ? "" : "/"}${u}`;
};
const pickMediaUrl = (node) => {
  if (!node) return undefined;
  if (Array.isArray(node) && node[0]) return pickMediaUrl(node[0]);
  return fullStrapiUrl(
    node?.url ||
      node?.data?.attributes?.url ||
      node?.data?.url ||
      node?.attributes?.url
  );
};

/* ----------------------- Block Renderers ----------------------- */
const RichTextBlock = ({ data }) => {
  const html = useMemo(
    () => enhanceHtml(absolutizeImageSrc(pickHtml(data?.content))),
    [data]
  );
  return (
    <div
      className="prose prose-lg max-w-none prose-a:text-brand prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const ImageBlock = ({ data }) => {
  const url = pickMediaUrl(data?.image);
  const caption = toText(data?.caption);
  if (!url) return null;
  return (
    <figure className="my-8">
      <img
        src={url}
        alt={toText(data?.alt) || caption || "Blog image"}
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16/9",
          display: "block",
        }}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-earth-600 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const GalleryBlock = ({ data }) => {
  const images = Array.isArray(data?.images) ? data.images : [];
  if (!images.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 my-8">
      {images.map((img, i) => {
        const url = pickMediaUrl(img);
        if (!url) return null;
        return (
          <img
            key={i}
            src={url}
            alt={toText(img?.alt) || `Gallery ${i + 1}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "4/3",
              display: "block",
            }}
            className="rounded-lg"
          />
        );
      })}
    </div>
  );
};

const HeroBlock = ({ data }) => {
  const bg = pickMediaUrl(data?.image || data?.background);
  const title = toText(data?.title || data?.heading);
  const sub = toText(data?.subtitle || data?.subheading);
  return (
    <section className="relative overflow-hidden rounded-xl my-6">
      {bg && (
        <img
          src={bg}
          alt={title || "Hero"}
          loading="eager"
          decoding="async"
          width={1600}
          height={900}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            display: "block",
          }}
          className="object-cover"
        />
      )}
      {(title || sub) && (
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-4 sm:p-6 md:p-10 text-white">
            {title && (
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">{title}</h1>
            )}
            {sub && <p className="mt-3 text-base sm:text-lg md:text-xl max-w-3xl">{sub}</p>}
          </div>
        </div>
      )}
    </section>
  );
};

const QuoteBlock = ({ data }) => {
  const quote = toText(data?.quote || data?.text);
  const author = toText(data?.author || data?.cite);
  if (!quote) return null;
  return (
    <blockquote className="border-l-4 border-brand pl-4 italic text-lg sm:text-xl text-earth-800 my-8">
      “{quote}”
      {author && <div className="mt-2 text-sm text-earth-600">— {author}</div>}
    </blockquote>
  );
};

const VideoBlock = ({ data }) => {
  const embed = toText(data?.embedUrl || data?.url);
  if (!embed) return null;
  return (
    <div className="my-8">
      <iframe
        src={embed}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="w-full"
        style={{ aspectRatio: "16/9", border: 0 }}
      />
    </div>
  );
};

const StatsGridBlock = ({ data }) => {
  const items = Array.isArray(data?.items) ? data.items : [];
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-xl border border-earth-200 p-4 bg-white"
        >
          <div className="text-2xl sm:text-3xl font-bold text-brand">
            {toText(it?.value || it?.stat)}
          </div>
          <div className="mt-1 text-sm text-earth-600">
            {toText(it?.label || it?.title)}
          </div>
        </div>
      ))}
    </div>
  );
};

const CtaBlock = ({ data }) => {
  const title = toText(data?.title);
  const desc = toText(data?.desc || data?.description);
  const btnText = toText(data?.buttonText || "Contact Us");
  const btnUrl = toText(data?.buttonUrl || "/contact");
  return (
    <div className="rounded-xl border border-brand/30 bg-brand/5 p-4 sm:p-6 my-10">
      {title && (
        <h3 className="text-xl sm:text-2xl font-semibold text-earth-900">{title}</h3>
      )}
      {desc && <p className="mt-2 text-earth-700">{desc}</p>}
      <a
        href={btnUrl}
        className="inline-block mt-4 px-4 py-2 rounded-md bg-brand text-white hover:opacity-90"
      >
        {btnText}
      </a>
    </div>
  );
};

const DividerBlock = () => <hr className="my-10 border-earth-200" />;

const BLOCK_RENDERERS = {
  "blog.hero": HeroBlock,
  "blog.rich-text": RichTextBlock,
  "blog.image": ImageBlock,
  "blog.gallery": GalleryBlock,
  "blog.quote": QuoteBlock,
  "blog.video": VideoBlock,
  "blog.stats-grid": StatsGridBlock,
  "blog.cta": CtaBlock,
  "blog.divider": DividerBlock,
};

const RenderBlock = ({ block }) => {
  const key = block?.__component;
  const Cmp = key && BLOCK_RENDERERS[key];
  if (!Cmp) return null;
  return <Cmp data={block} />;
};

/* ----------------------- Share (inline under title) ----------------------- */
const getShareTargets = (title = "", url = "") => {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    { id: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, Icon: FaTwitter },
    { id: "fb", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FaFacebook },
    { id: "li", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: FaLinkedin },
    { id: "wa", label: "Share on WhatsApp", href: `https://api.whatsapp.com/send?text=${t}%20${u}`, Icon: FaWhatsapp },
    { id: "tg", label: "Share on Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, Icon: FaTelegram },
  ];
};

const CircleLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    aria-label={label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-earth-200 bg-white shadow-sm hover:bg-earth-50 hover:shadow transition focus:outline-none focus:ring-2 focus:ring-brand"
  >
    {children}
  </a>
);

const ShareInline = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {/* ignore */}
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      alert("Copy failed. Please copy the link manually.");
    }
  };

  const items = getShareTargets(title, url);

  return (
    <div className="mt-4 rounded-xl border border-earth-200 bg-white/70 backdrop-blur-sm p-3">
      <div className="flex flex-nowrap overflow-x-auto sm:overflow-visible items-center gap-2 sm:gap-3">
        <span className="text-sm font-medium text-earth-700 mr-1 shrink-0">Share:</span>

        {/* Icon buttons */}
        <div className="flex items-center gap-2">
          {items.map(({ id, label, href, Icon }) => (
            <CircleLink key={id} href={href} label={label}>
              <Icon className="text-earth-700" />
            </CircleLink>
          ))}
        </div>

        {/* Copy link */}
        <button
          type="button"
          onClick={copy}
          title="Copy link"
          aria-label="Copy link"
          className="inline-flex h-10 px-3 items-center gap-2 rounded-full border border-earth-200 bg-white shadow-sm hover:bg-earth-50 hover:shadow transition focus:outline-none focus:ring-2 focus:ring-brand ml-auto sm:ml-0"
        >
          <FaLink className="text-earth-700" />
          <span className="text-sm text-earth-800">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>

        {/* Mobile native share */}
        <button
          type="button"
          onClick={nativeShare}
          title="Share"
          aria-label="Share"
          className="inline-flex h-10 px-3 items-center gap-2 rounded-full border border-earth-200 bg-white shadow-sm hover:bg-earth-50 hover:shadow transition focus:outline-none focus:ring-2 focus:ring-brand sm:hidden"
        >
          <FaShareAlt className="text-earth-700" />
          <span className="text-sm text-earth-800">Share</span>
        </button>
      </div>
    </div>
  );
};

/* ----------------------- Sidebar cards ----------------------- */
const ContactCard = ({ blogTitle }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Regarding: ${blogTitle || "Blog"}`,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ ok: true, msg: "Thanks! We'll get back to you shortly." });
      setForm({
        name: "",
        email: "",
        phone: "",
        message: `Regarding: ${blogTitle || "Blog"}`,
      });
    } catch (err) {
      setStatus({
        ok: false,
        msg:
          "Could not submit the form. Please try again or email us at support@xrealty.ae",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-earth-200 bg-white p-4 sm:p-5">
      <h3 className="text-lg font-semibold text-earth-900">
        Talk to a Specialist
      </h3>
      <p className="text-sm text-earth-600 mt-1">
        Have a question about this topic? Send us a message.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div>
          <label className="block text-sm text-earth-700 mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="w-full rounded-md border border-earth-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm text-earth-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full rounded-md border border-earth-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-earth-700 mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full rounded-md border border-earth-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            placeholder="+971 ..."
          />
        </div>
        <div>
          <label className="block text-sm text-earth-700 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows={4}
            className="w-full rounded-md border border-earth-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand hover:bg-brand-hover text-white"
        >
          {submitting ? "Sending..." : "Send message"}
        </Button>

        {status && (
          <div
            className={`text-sm mt-2 ${
              status.ok ? "text-green-600" : "text-red-600"
            }`}
            aria-live="polite"
          >
            {status.msg}
          </div>
        )}
      </form>
    </div>
  );
};

const MetaCard = ({ date, category, readTime }) => (
  <div className="rounded-xl border border-earth-200 bg-white p-4 sm:p-5">
    <h3 className="text-lg font-semibold text-earth-900">Article details</h3>
    <ul className="mt-3 space-y-1 text-sm text-earth-700">
      {date && (
        <li>
          <span className="text-earth-500">Published: </span>
          {date}
        </li>
      )}
      {category && (
        <li>
          <span className="text-earth-500">Category: </span>
          {category}
        </li>
      )}
      {readTime && (
        <li>
          <span className="text-earth-500">Read time: </span>
          {readTime} min
        </li>
      )}
    </ul>
  </div>
);

const RelatedArticles = ({ items = [] }) => {
  const top3 = items.slice(0, 3);
  if (!top3.length) return null;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold text-earth-900 mb-4">
        Related articles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {top3.map((it) => (
          <Link
            key={it.id}
            href={`/blogs/${encodeURIComponent(it.id)}`}
            className="group rounded-xl border border-earth-200 bg-white overflow-hidden hover:shadow-md transition"
          >
            {it.image && (
              <img
                src={pickMediaUrl(it.image) || it.image}
                alt={toText(it.imageAlt) || toText(it.title)}
                loading="lazy"
                decoding="async"
                width={600}
                height={340}
                className="w-full aspect-[16/9] object-cover"
              />
            )}
            <div className="p-4">
              <div className="text-xs text-earth-500">
                {toText(it.category) || "General"}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-earth-900 group-hover:underline">
                {toText(it.title)}
              </h3>
              {it.excerpt && (
                <p className="mt-1 text-sm text-earth-700 line-clamp-2">
                  {toText(it.excerpt)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ----------------------- Next / Prev navigation ----------------------- */
const ArticlePager = ({ prev, next }) => {
  if (!prev && !next) return null;
  return (
    <nav className="mt-12 border-t border-earth-200 pt-6" aria-label="Article navigation">
      <div className="grid sm:grid-cols-2 gap-4">
        {prev && (
          <Link
            href={`/blogs/${encodeURIComponent(prev.id)}`}
            rel="prev"
            className="group rounded-xl border border-earth-200 bg-white p-4 flex items-center gap-3 hover:shadow-md transition"
          >
            <div className="shrink-0 h-12 w-12 rounded-lg overflow-hidden border border-earth-200">
              {prev.image ? (
                <img
                  src={pickMediaUrl(prev.image) || prev.image}
                  alt={toText(prev.imageAlt) || toText(prev.title)}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-earth-100" />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-xs text-earth-500 flex items-center gap-1">
                <FaArrowLeft /> Previous
              </div>
              <div className="text-sm font-semibold text-earth-900 truncate group-hover:underline">
                {toText(prev.title)}
              </div>
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={`/blogs/${encodeURIComponent(next.id)}`}
            rel="next"
            className="group rounded-xl border border-earth-200 bg-white p-4 flex items-center gap-3 hover:shadow-md transition justify-end sm:justify-start"
          >
            <div className="min-w-0 order-2 sm:order-1 text-right sm:text-left">
              <div className="text-xs text-earth-500 flex items-center gap-1 justify-end sm:justify-start">
                Next <FaArrowRight />
              </div>
              <div className="text-sm font-semibold text-earth-900 truncate group-hover:underline">
                {toText(next.title)}
              </div>
            </div>
            <div className="shrink-0 h-12 w-12 rounded-lg overflow-hidden border border-earth-200 order-1 sm:order-2">
              {next.image ? (
                <img
                  src={pickMediaUrl(next.image) || next.image}
                  alt={toText(next.imageAlt) || toText(next.title)}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-earth-100" />
              )}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

/* ----------------------- Page ----------------------- */
export default function BlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [related, setRelated] = useState([]);
  const [pageUrl, setPageUrl] = useState("");
  const [adjacent, setAdjacent] = useState({ prev: null, next: null });

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!id) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`/api/blogs/${encodeURIComponent(id)}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { blog } = await res.json();

        const safe = {
          ...blog,
          id: blog?.id ?? id,
          title: toText(blog?.title),
          excerpt: toText(blog?.excerpt),
          author: toText(blog?.author || blog?.authorName) || "Admin",
          authorBio: toText(blog?.authorBio),
          category: toText(blog?.category) || "General",
          image: blog?.image || blog?.imageUrl || pickMediaUrl(blog?.image),
          imageAlt: toText(blog?.imageAlt) || toText(blog?.title),
          blocks: Array.isArray(blog?.blocks) ? blog.blocks : [],
          publishedAt: blog?.publishedAt || blog?.date,
        };

        if (active) setBlog(safe);

        /* -------- Related (3) -------- */
        try {
          const relRes =
            (await fetch(
              `/api/blogs?relatedTo=${encodeURIComponent(safe.id)}&limit=3`,
              { cache: "no-store" }
            )) ||
            (await fetch(
              `/api/blogs?category=${encodeURIComponent(
                safe.category
              )}&exclude=${encodeURIComponent(safe.id)}&limit=3`,
              { cache: "no-store" }
            ));
          if (relRes?.ok) {
            const data = await relRes.json();
            const items = Array.isArray(data?.blogs) ? data.blogs : [];
            if (active) setRelated(items);
          }
        } catch {
          /* ignore */
        }

        /* -------- Adjacent (prev/next) -------- */
        // Try a dedicated adjacent endpoint
        let prevNext = null;
        try {
          const adjRes =
            (await fetch(`/api/blogs/${encodeURIComponent(safe.id)}/adjacent`, {
              cache: "no-store",
            })) ||
            (await fetch(
              `/api/blogs?adjacentTo=${encodeURIComponent(safe.id)}`,
              { cache: "no-store" }
            ));

          if (adjRes?.ok) {
            const j = await adjRes.json();
            // accept {prev, next} or {blogs:[prev,next]}
            prevNext = {
              prev: j?.prev || j?.blogs?.[0] || null,
              next: j?.next || j?.blogs?.[1] || null,
            };
          }
        } catch {
          /* ignore — fallback below */
        }

        // Fallback: pull category list and compute neighbors by publishedAt (asc)
        if (!prevNext?.prev && !prevNext?.next) {
          try {
            const listRes = await fetch(
              `/api/blogs?category=${encodeURIComponent(safe.category)}&limit=50`,
              { cache: "no-store" }
            );
            if (listRes.ok) {
              const j = await listRes.json();
              const arr = (Array.isArray(j?.blogs) ? j.blogs : [])
                .map((b) => ({
                  ...b,
                  id: b?.id,
                  publishedAt: b?.publishedAt || b?.date || null,
                }))
                .filter((b) => b?.id)
                .sort((a, b) => {
                  const da = new Date(a.publishedAt || 0).getTime();
                  const db = new Date(b.publishedAt || 0).getTime();
                  return da - db; // asc
                });

              const idx = arr.findIndex((b) => String(b.id) === String(safe.id));
              prevNext = {
                prev: idx > 0 ? arr[idx - 1] : null,
                next: idx >= 0 && idx < arr.length - 1 ? arr[idx + 1] : null,
              };
            }
          } catch {
            /* ignore */
          }
        }

        if (active) {
          setAdjacent({
            prev: prevNext?.prev || null,
            next: prevNext?.next || null,
          });
        }
      } catch (e) {
        console.error(e);
        if (active) setErr("Failed to load article.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  // Keyboard navigation (← →)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && adjacent.prev?.id) {
        router.push(`/blogs/${encodeURIComponent(adjacent.prev.id)}`);
      } else if (e.key === "ArrowRight" && adjacent.next?.id) {
        router.push(`/blogs/${encodeURIComponent(adjacent.next.id)}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adjacent, router]);

  const descHtml = useMemo(() => {
    const html = pickHtml(blog?.desc) || pickHtml(blog?.contentHtml);
    return enhanceHtml(absolutizeImageSrc(html));
  }, [blog]);

  const displayDate = useMemo(() => {
    const v = blog?.publishedAt || blog?.date;
    if (!v) return "";
    const d = new Date(v);
    return isNaN(+d)
      ? ""
      : d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  }, [blog]);

  // Fallback read time if not provided (roughly 200 wpm)
  const computedReadTime = useMemo(() => {
    if (blog?.readTime) return blog.readTime;
    const tmp = document.createElement("div");
    tmp.innerHTML = descHtml || "";
    const words = (tmp.textContent || "").trim().split(/\s+/).length || 0;
    return Math.max(1, Math.round(words / 200));
  }, [blog, descHtml]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4" />
          <p className="text-earth-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (err || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-earth-800 mb-4">
            Article Not Found
          </h1>
          <p className="text-earth-600 mb-8">
            {err || "The article you're looking for doesn't exist."}
          </p>
          <Button
            onClick={() => router.push("/blogs")}
            className="bg-brand hover:bg-brand-hover text-white"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-10 md:py-16">
      {/* Strong, scoped overrides for injected HTML */}
      <style jsx global>{`
        [data-cms].prose {
          font-size: 1rem !important;
          line-height: 1.8 !important;
        }
        @media (min-width: 640px) {
          [data-cms].prose {
            font-size: 1.03rem !important;
          }
        }
        @media (min-width: 768px) {
          [data-cms].prose {
            font-size: 1.06rem !important;
          }
        }
        [data-cms].prose :where(p, ul, ol, blockquote, pre, table, figure) {
          margin-top: 0.9em !important;
          margin-bottom: 0.9em !important;
        }
        [data-cms].prose :where(h1) {
          font-size: 1.75rem !important;
          line-height: 1.25 !important;
        }
        @media (min-width: 640px) {
          [data-cms].prose :where(h1) {
            font-size: 2rem !important;
          }
        }
        [data-cms].prose :where(h2) {
          font-size: 1.35rem !important;
          line-height: 1.3 !important;
        }
        [data-cms].prose :where(h3) {
          font-size: 1.2rem !important;
          line-height: 1.35 !important;
        }
        [data-cms].prose :where(p) {
          font-size: 1.02rem !important;
          line-height: 1.8 !important;
        }
        [data-cms].prose ul {
          list-style: disc;
          padding-left: 1.25rem;
        }
        [data-cms].prose ol {
          list-style: decimal;
          padding-left: 1.25rem;
        }
        [data-cms].prose a {
          text-decoration: underline;
        }
        [data-cms].prose img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1rem 0 !important;
          content-visibility: auto;
          contain-intrinsic-size: 1200px 675px;
        }
      `}</style>

      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
        {/* Back */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/blogs")}
            variant="outline"
            className="border-earth-200 text-brand hover:text-white hover:bg-brand"
          >
            <FaArrowLeft className="mr-2" />
            Back to Articles
          </Button>
        </div>

        {/* Title + meta */}
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-earth-900">
            {blog.title}
          </h1>
          <div className="mt-2 text-earth-600 flex flex-wrap gap-x-4 gap-y-1">
            {displayDate && <span>{displayDate}</span>}
            {blog.category && <span>{blog.category}</span>}
            {computedReadTime && <span>{computedReadTime} min read</span>}
            {blog.author && <span>By {blog.author}</span>}
          </div>
          {blog.excerpt && (
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-earth-700">
              {blog.excerpt}
            </p>
          )}

          {/* Inline share row */}
          <ShareInline title={blog.title} url={pageUrl} />
        </header>

        {/* Layout: content + sticky sidebar */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Content */}
          <div className="lg:col-span-8">
            {!!blog.blocks.length && (
              <div className="space-y-6">
                {blog.blocks.map((block, idx) => (
                  <RenderBlock
                    key={`${block.__component}-${idx}`}
                    block={block}
                  />
                ))}
              </div>
            )}

            {!blog.blocks.length && descHtml?.length > 0 && (
              <article
                data-cms
                className="cms-content prose max-w-none px-0 py-2 prose-a:text-brand prose-img:rounded-xl text-neutral-800"
                dangerouslySetInnerHTML={{ __html: descHtml }}
              />
            )}

            {/* Author bio */}
            {blog.authorBio && (
              <div className="mt-10 p-6 bg-earth-50 rounded-xl border border-earth-200">
                <div className="text-sm text-earth-500 mb-1">
                  About the author
                </div>
                <div className="text-earth-800">{blog.authorBio}</div>
              </div>
            )}

            {/* Related */}
            <RelatedArticles items={related} />

            {/* Next / Prev */}
            <ArticlePager prev={adjacent.prev} next={adjacent.next} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24 self-start">
            <MetaCard
              date={displayDate}
              category={blog.category}
              readTime={computedReadTime}
            />
            <ContactCard blogTitle={blog.title} />
          </aside>
        </div>
      </div>
    </section>
  );
}
  