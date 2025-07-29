"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaEye, FaClock, FaShare, FaArrowLeft, FaArrowRight, FaTag } from "react-icons/fa";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogPage({ params }) {
  const router = useRouter();
  const { id } = use(params); // Unwrap the params Promise
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/strapi/blogs/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setBlog(result.data);
          // Fetch related posts based on category
          fetchRelatedPosts(result.data.category);
        } else {
          console.error('Failed to fetch blog:', result.error);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const fetchRelatedPosts = async (category) => {
    try {
      const response = await fetch(`/api/strapi/blogs?category=${category}&pageSize=3`);
      const result = await response.json();
      
      if (result.success) {
        // Filter out current blog and take first 3
        const filtered = result.data.filter(post => post.documentId !== id).slice(0, 3);
        setRelatedPosts(filtered);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
      setRelatedPosts([]); // Set empty array on error
    }
  };

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
                {blog.image ? (
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                    <span className="text-earth-600 text-xl">Article Image</span>
                  </div>
                )}
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
                    {blog.tags && blog.tags.length > 0 ? (
                      blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm hover:bg-brand/20 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-earth-600 text-sm">No tags available</span>
                    )}
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
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blogs/${post.documentId}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-earth-200 to-earth-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {post.image ? (
                                <img 
                                  src={post.image} 
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-earth-600 text-xs">Image</span>
                              )}
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
                      ))
                    ) : (
                      <p className="text-earth-600 text-sm">No related articles found.</p>
                    )}
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
