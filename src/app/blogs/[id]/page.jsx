"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaEye, FaClock, FaShare, FaArrowLeft, FaArrowRight, FaTag } from "react-icons/fa";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock blog data - in real app, this would come from API/CMS
const blogPosts = [
  {
    id: 1,
    title: "Dubai Real Estate Market Trends 2024: What Investors Need to Know",
    excerpt: "Discover the latest trends shaping Dubai's real estate landscape and how they impact investment opportunities in the region.",
    content: `
      <h2>The Current State of Dubai's Real Estate Market</h2>
      <p>Dubai's real estate market continues to show remarkable resilience and growth in 2024. With strategic government initiatives and increasing foreign investment, the emirate has positioned itself as a global real estate hub.</p>
      
      <h3>Key Market Indicators</h3>
      <p>Property prices have seen a steady increase of 15-20% year-over-year, with luxury segments leading the charge. The off-plan market has particularly benefited from new regulations that protect investor interests.</p>
      
      <h3>Investment Hotspots</h3>
      <p>Areas like Dubai Marina, Downtown Dubai, and the emerging Dubai South continue to attract significant investment. These locations offer excellent rental yields and capital appreciation potential.</p>
      
      <h2>What This Means for Investors</h2>
      <p>For both local and international investors, Dubai presents unique opportunities. The city's tax-free environment, world-class infrastructure, and strategic location make it an attractive destination for real estate investment.</p>
      
      <h3>Future Outlook</h3>
      <p>With Expo 2020's legacy projects and upcoming developments, Dubai's real estate market is poised for continued growth. Investors should focus on emerging areas and sustainable developments for maximum returns.</p>
    `,
    author: "John Doe",
    authorBio: "Senior Real Estate Analyst with 10+ years of experience in Dubai's property market",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "2024-01-15",
    category: "Market Analysis",
    tags: ["Dubai", "Investment", "Market Trends", "2024"],
    image: "/assets/blog/dubai-skyline.jpg",
    readTime: "5 min read",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Off-Plan Properties: A Complete Guide for First-Time Buyers",
    excerpt: "Everything you need to know about purchasing off-plan properties in Dubai, from benefits to potential risks.",
    content: `
      <h2>Understanding Off-Plan Properties</h2>
      <p>Off-plan properties are real estate units sold before construction is completed. This investment strategy has become increasingly popular in Dubai due to attractive payment plans and potential for capital appreciation.</p>
      
      <h3>Benefits of Off-Plan Investment</h3>
      <ul>
        <li>Lower initial investment with flexible payment plans</li>
        <li>Potential for significant capital appreciation</li>
        <li>Choice of prime units and customization options</li>
        <li>Modern amenities and latest design trends</li>
      </ul>
      
      <h3>Key Considerations</h3>
      <p>While off-plan properties offer excellent opportunities, buyers should carefully evaluate the developer's track record, project timeline, and market conditions.</p>
    `,
    author: "Jane Smith",
    authorBio: "Property Investment Consultant specializing in off-plan developments",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    date: "2024-01-12",
    category: "Buying Guide",
    tags: ["Off-Plan", "First-Time Buyers", "Guide"],
    image: "/assets/blog/off-plan.jpg",
    readTime: "8 min read",
    views: 980,
    featured: false,
  },
];

// Related posts data
const relatedPosts = [
  {
    id: 3,
    title: "Luxury Waterfront Living: Top Communities in Dubai",
    excerpt: "Explore Dubai's most prestigious waterfront communities...",
    image: "/assets/blog/waterfront.jpg",
    readTime: "6 min read",
    category: "Luxury Properties"
  },
  {
    id: 4,
    title: "Investment ROI: Comparing Dubai's Top Real Estate Areas",
    excerpt: "A comprehensive analysis of return on investment...",
    image: "/assets/blog/investment.jpg",
    readTime: "7 min read",
    category: "Investment"
  },
];

export default function BlogPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBlog = async () => {
      setLoading(true);
      // In real app, fetch from API: `/api/blogs/${id}`
      const foundBlog = blogPosts.find(post => post.id === parseInt(id));
      setBlog(foundBlog);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-earth-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-earth-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-earth-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-earth-800 mb-4">Article Not Found</h1>
          <p className="text-earth-600 mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/blogs')} className="bg-brand hover:bg-brand-hover text-white">
            <FaArrowLeft className="mr-2" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
      <div className="container mx-auto px-6 md:px-0">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            onClick={() => router.push('/blogs')}
            variant="outline"
            className="border-earth-200 text-white hover:bg-brand"
          >
            <FaArrowLeft className="mr-2" />
            Back to Articles
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] shadow-lg overflow-hidden"
            >
              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                  <span className="text-earth-600 text-xl">Article Image</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-brand text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {blog.category}
                  </span>
                </div>

                {/* Share Button */}
                <div className="absolute top-6 right-6">
                  <Button
                    onClick={handleShare}
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  >
                    <FaShare size={14} />
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-black mb-6">
                  <div className="flex items-center gap-2">
                    <FaCalendar size={14} />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye size={14} />
                    <span>{blog.views} views</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-earth-800 mb-6 leading-tight">
                  {blog.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-earth-600 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 p-6 bg-earth-50 rounded-xl mb-8">
                  <div className="w-16 h-16 bg-earth-200 rounded-full flex items-center justify-center overflow-hidden">
                    {blog.authorImage ? (
                      <img src={blog.authorImage} alt={blog.author} className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-earth-600" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-800">{blog.author}</h3>
                    <p className="text-earth-600 text-sm">{blog.authorBio}</p>
                  </div>
                </div>

                {/* Article Content */}
                <div 
                  className="text-black"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-earth-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FaTag className="text-brand" />
                    <span className="font-semibold text-earth-800">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm hover:bg-brand/20 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Related Articles */}
              <Card className="rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-earth-800 mb-6">Related Articles</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blogs/${post.id}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-earth-200 to-earth-300 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-earth-600 text-xs">Image</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-earth-800 group-hover:text-brand transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-earth-600">
                              <span className="bg-brand/10 text-brand px-2 py-1 rounded-full text-xs">
                                {post.category}
                              </span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden bg-gradient-to-br from-brand/5 to-earth-100/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-earth-800 mb-4">Stay Updated</h3>
                  <p className="text-earth-600 mb-6">
                    Get the latest real estate insights delivered to your inbox.
                  </p>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    <Button className="w-full bg-brand hover:bg-brand-hover text-white">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-earth-800 mb-6">Quick Links</h3>
                  <div className="space-y-3">
                    <Link href="/properties" className="block text-earth-600 hover:text-brand transition-colors">
                      Browse Properties
                    </Link>
                    <Link href="/agents" className="block text-earth-600 hover:text-brand transition-colors">
                      Meet Our Agents
                    </Link>
                    <Link href="/communities" className="block text-earth-600 hover:text-brand transition-colors">
                      Explore Communities
                    </Link>
                    <Link href="/contact" className="block text-earth-600 hover:text-brand transition-colors">
                      Contact Us
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-between items-center"
        >
          <Button
            onClick={() => router.push('/blogs')}
            variant="outline"
            className="border-earth-200 text-white hover:bg-brand"
          >
            <FaArrowLeft className="mr-2" />
            All Articles
          </Button>
          
          <Button
            onClick={() => router.push('/contact')}
            className="bg-brand hover:bg-brand-hover text-white"
          >
            Get In Touch
            <FaArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
