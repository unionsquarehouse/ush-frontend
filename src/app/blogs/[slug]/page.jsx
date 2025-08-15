
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaLink,
  FaShareAlt,
} from "react-icons/fa";
import { Button } from "../../components/ui/button";
import sanitizeHtml from "sanitize-html";

// Category mapping based on provided schemas
const categoryMap = {
  "100": "Lifestyle",
  "103": "News & Updates",
  // Add more mappings as needed
};

// Author mapping for itemUpdatedBy IDs
const authorMap = {
  "11": "John Doe",
  // Add more author mappings as needed
};

// Asset base URL for images
const ASSET_BASE = "https://ush.imgix.net"; // Replace with your actual CDN URL

/* ----------------------- HTML helpers ----------------------- */
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

const sanitizeCmsHtml = (html) => {
  if (!html) return "";
  let out = String(html);
  out = out.replace(/\\n/g, "");
  out = out.replace(/>\s+</g, "><");
  out = out.replace(
    /<p[^>]*>(?:\s|&nbsp;|<(?:strong|b|em|i|span)[^>]*>\s*(?:<br\s*\/?>\s*)*<\/(?:strong|b|em|i|span)>)+\s*<\/p>/gi,
    ""
  );
  out = out.replace(
    /<(strong|b|em|i|span)[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi,
    ""
  );
  out = out.replace(/<p[^>]*>\s*(<img\b[^>]*>)\s*<\/p>/gi, "$1");
  out = out.replace(/(?:\s|&nbsp;|<br\s*\/?>)+(?=<img\b)/gi, "");
  out = out.replace(/(<img\b[^>]*>)(?:\s|&nbsp;|<br\s*\/?>)+/gi, "$1");
  out = out.replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");
  return out.trim();
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
  const sanitized = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "loading", "decoding", "style"],
      iframe: [
        "src",
        "title",
        "allow",
        "allowfullscreen",
        "loading",
        "width",
        "height",
        "style",
      ],
      a: ["href", "target", "rel"],
    },
  });
  const withImgAttrs = sanitized.replace(
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

/* ----------------------- Media helpers ----------------------- */
const fullStrapiUrl = (u) => {
  if (!u || typeof u !== "string") return undefined;
  if (/^https?:\/\//i.test(u)) return u; // Skip if already absolute (e.g., external URLs)
  return `${ASSET_BASE}${u.startsWith("/") ? "" : "/"}${u}`; // Prepend Imgix CDN base
};

const pickMediaUrl = (node) => {
  if (!node) return "/fallback-image.png";
  if (Array.isArray(node) && node[0]) return pickMediaUrl(node[0]);
  return (
    fullStrapiUrl(
      node?.url ||
        node?._default ||
        node?.data?.attributes?.url ||
        node?.data?.url ||
        node?.attributes?.url
    ) || "/fallback-image.png"
  );
};



/* ----------------------- Block Renderers ----------------------- */
const RichTextBlock = ({ data }) => {
  const html = useMemo(
    () =>
      enhanceHtml(absolutizeImageSrc(sanitizeCmsHtml(pickHtml(data?.content)))),
    [data]
  );
  return (
    <div
      className="prose prose-lg max-w-none prose-a:text-brand"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
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
    <section className="relative overflow-hidden my-6">
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
          <div className="p-6 md:p-10 text-white">
            {title && (
              <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
            )}
            {sub && <p className="mt-3 text-lg md:text-xl max-w-3xl">{sub}</p>}
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
    <blockquote className="border-l-4 border-brand pl-4 italic text-xl text-earth-800 my-8">
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
        <div key={i} className="border border-earth-200 p-4 bg-white">
          <div className="text-3xl font-bold text-brand">
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
    <div className="border border-brand/30 bg-brand/5 p-6 my-10">
      {title && (
        <h3 className="text-2xl font-semibold text-earth-900">{title}</h3>
      )}
      {desc && <p className="mt-2 text-earth-700">{desc}</p>}
      <a
        href={btnUrl}
        className="inline-block mt-4 px-4 py-2 bg-brand text-white hover:opacity-90"
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
    {
      id: "x",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      Icon: FaTwitter,
    },
    {
      id: "fb",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: FaFacebook,
    },
    {
      id: "li",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: FaLinkedin,
    },
    {
      id: "wa",
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${t}%20${u}`,
      Icon: FaWhatsapp,
    },
    {
      id: "tg",
      label: "Share on Telegram",
      href: `https://t.me/share/url?url=${u}&text=${t}`,
      Icon: FaTelegram,
    },
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
      } catch {
        /* ignore cancel */
      }
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
    <div className="mt-4 border border-earth-200 bg-white/70 backdrop-blur-sm p-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-earth-700 mr-1">Share:</span>
        <div className="flex items-center gap-2">
          {items.map(({ id, label, href, Icon }) => (
            <CircleLink key={id} href={href} label={label}>
              <Icon className="text-earth-700" />
            </CircleLink>
          ))}
          <button
            type="button"
            onClick={copy}
            title="Copy link"
            aria-label="Copy link"
            className="inline-flex h-10 px-3 items-center gap-2 rounded-full border border-earth-200 bg-white shadow-sm hover:bg-earth-50 hover:shadow transition focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <FaLink className="text-earth-700" />
            <span className="text-sm text-earth-800">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
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
        msg: "Could not submit the form. Please try again or email us at support@xrealty.ae",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-earth-200 bg-white p-5">
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
            aria-label="Your name"
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
            aria-label="Your email"
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
            aria-label="Your phone number"
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
            aria-label="Your message"
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand hover:bg-brand-hover text-white"
          aria-label={submitting ? "Sending message" : "Send message"}
        >
          {submitting ? "Sending..." : "Send message"}
        </Button>
        {status && (
          <div
            className={`text-sm mt-2 ${status.ok ? "text-green-600" : "text-red-600"}`}
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
  <div className="border border-earth-200 bg-white p-5">
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
  const toText = (v) => (v ? String(v).trim() : "Untitled");
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold text-earth-900 mb-4">
        Related articles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {top3.map((it) => (
          <Link
            key={it.id}
            href={`/blogs/${encodeURIComponent(it.slug)}`}
            className="group border border-earth-200 bg-white overflow-hidden hover:shadow-md transition"
            aria-label={`Read article: ${toText(it.title)}`}
          >

          
            
            {it.image && (
              <img
                src={it.image}
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

/* ----------------------- Page ----------------------- */
export default function BlogPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [related, setRelated] = useState([]);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`/api/db/blogs/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error || `HTTP ${res.status}: Failed to fetch blog`);
        }
        const { data } = await res.json();

        if (!data) throw new Error("Blog not found");

        if (data.status !== "published") {
          throw new Error("This article is not published yet.");
        }

        const safe = {
          id: data._id,
          slug: data.slug,
          title: toText(data.title),
          excerpt: toText(data.excerpt),
          desc: toText(data.desc),
          author: authorMap[data.itemUpdatedBy] || "Admin",
          authorBio: "", // Not provided in API
          category: categoryMap[data.categories?.[0]] || "General",
          image: pickMediaUrl(data.image),
          imageAlt: toText(data.image_alt) || toText(data.title),
          blocks: [], // Not provided in API, using desc.processed
          date: data.dateTime || data.itemUpdated,
        };

        if (active) setBlog(safe);

        // Fetch related articles by category, excluding current blog
        try {
          const category = data.categories?.[0] || "";
          const relRes = await fetch(
            `/api/db/blogs?category=${encodeURIComponent(category)}&exclude=${encodeURIComponent(data._id)}&limit=3`,
            { cache: "no-store" }
          );
          if (relRes?.ok) {
            const relData = await relRes.json();
            const items = Array.isArray(relData.data)
              ? relData.data.map((item) => ({
                  id: item._id,
                  slug: item.slug,
                  title: toText(item.title),
                  excerpt: toText(item.excerpt),
                  category: categoryMap[item.categories?.[0]] || "General",
                  image: pickMediaUrl(item.image),
                  imageAlt: toText(item.image_alt) || toText(item.title),
                }))
              : [];
            if (active) setRelated(items);
          }
        } catch {
          // Ignore related load errors
        }
      } catch (e) {
        console.error(e);
        if (active) setErr(`Failed to load article: ${e.message}`);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const descHtml = useMemo(() => {
    const html = pickHtml(blog?.desc) || pickHtml(blog?.contentHtml);
    return enhanceHtml(absolutizeImageSrc(sanitizeCmsHtml(html)));
  }, [blog]);

  const displayDate = useMemo(() => {
    const v = blog?.date || blog?.publishedAt;
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

  const computedReadTime = useMemo(() => {
    const tmp = document.createElement("div");
    tmp.innerHTML = descHtml || "";
    const words = (tmp.textContent || "").trim().split(/\s+/).length || 0;
    return Math.max(1, Math.round(words / 200));
  }, [descHtml]);

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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-earth-800 mb-4">
            Article Not Found
          </h1>
          <p className="text-earth-600 mb-8">
            {err || "The article you're looking for doesn't exist or is not published."}
          </p>
          <Button
            onClick={() => router.push("/blogs")}
            className="bg-brand hover:bg-brand-hover text-white"
            aria-label="Back to all blogs"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title} | Your Blog Name</title>
        <meta name="description" content={blog.excerpt || "Read the latest article on our blog."} />
        <meta name="keywords" content={`${blog.category}, ${blog.title}, blog`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || "Read the latest article on our blog."} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <section className="py-10 md:py-16">
        <style jsx global>{`
          [data-cms].prose {
            font-size: 1rem !important;
            line-height: 1.8 !important;
          }
          @media (min-width: 768px) {
            [data-cms].prose {
              font-size: 1.05rem !important;
            }
          }
          [data-cms].prose :where(p, ul, ol, blockquote, pre, table, figure) {
            margin-bottom: 0.9em !important;
          }
          [data-cms].prose :where(h1) {
            font-size: 2rem !important;
            line-height: 1.25 !important;
          }
          [data-cms].prose :where(h2) {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          [data-cms].prose :where(h3) {
            font-size: 1.25rem !important;
            line-height: 1.35 !important;
          }
          [data-cms].prose :where(p) {
            font-size: 1.05rem !important;
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
            content-visibility: auto;
            contain-intrinsic-size: 1200px 675px;
          }
        `}</style>

        <div className="container mx-auto px-6 md:px-0 mt-20">
          <div className="mb-6">
            <Button
              onClick={() => router.push("/blogs")}
              variant="outline"
              className="border-earth-200 text-brand hover:text-white hover:bg-brand"
              aria-label="Back to all blogs"
            >
              <FaArrowLeft className="mr-2" />
              Back to Articles
            </Button>
          </div>

          <header className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-900">
              {blog.title}
            </h1>
            <div className="mt-2 text-earth-600 flex flex-wrap gap-x-4 gap-y-1">
              {displayDate && <span>{displayDate}</span>}
              {blog.category && <span>{blog.category}</span>}
              {computedReadTime && <span>{computedReadTime} min read</span>}
              {blog.author && <span>By {blog.author}</span>}
            </div>
            <ShareInline title={blog.title} url={pageUrl} />
          </header>

          <div className="grid lg:grid-cols-12 gap-8">
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
                  className="cms-content prose max-w-none px-0 md:px-0 prose-a:text-brand text-neutral-800"
                  dangerouslySetInnerHTML={{ __html: descHtml }}
                />
              )}
              {!blog.blocks.length && !descHtml && (
                <p className="text-earth-600">
                  No content available for this article.
                </p>
              )}
              {blog.authorBio && (
                <div className="mt-10 p-6 bg-earth-50 border border-earth-200">
                  <div className="text-sm text-earth-500 mb-1">
                    About the author
                  </div>
                  <div className="text-earth-800">{blog.authorBio}</div>
                </div>
              )}
              <RelatedArticles items={related} />
            </div>
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
    </>
  );
}