"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaEye, FaClock, FaShare, FaArrowLeft, FaArrowRight, FaTag, FaHeart, FaRegHeart, FaTwitter, FaLinkedin, FaWhatsapp, FaLink } from "react-icons/fa";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogPost({ params }) {
  const router = useRouter();
  const { id } = use(params); // Unwrap the params Promise
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add bookmark logic here
  };

  const shareOptions = [
    { name: 'Twitter', icon: <FaTwitter />, action: () => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog?.title}`) },
    { name: 'LinkedIn', icon: <FaLinkedin />, action: () => window.open(`https://linkedin.com/sharing/share-offsite/?url=${window.location.href}`) },
    { name: 'WhatsApp', icon: <FaWhatsapp />, action: () => window.open(`https://wa.me/?text=${blog?.title} ${window.location.href}`) },
    { name: 'Copy Link', icon: <FaLink />, action: () => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); } }
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/db/blogs");
        const res = await response.json();
        const blogs= res.blogs;
        
        // Find blog by ID
        const foundBlog = blogs.find(blog => blog._id === params.id);
        
        if (foundBlog) {
          // Better image handling with multiple fallbacks
          let imageUrl = `https://ush.imgix.net/${foundBlog.image._default}`;
          

          const transformedBlog = {
            id: foundBlog._id,
            title: foundBlog.title,
            content: foundBlog.desc?.processed || foundBlog.desc?.raw || '',
            excerpt: foundBlog.excerpt?.processed || foundBlog.excerpt?.raw || '',
            date: foundBlog.dateTime,
            author: foundBlog.itemUpdatedBy || 'Admin',
            image: imageUrl,
            imageAlt: foundBlog.image_alt || foundBlog.title,
            metaTitle: foundBlog.meta_title || foundBlog.title,
            metaDesc: foundBlog.meta_desc?.processed || foundBlog.meta_desc?.raw || '',
            slug: foundBlog.slug,
            status: foundBlog.status,
            categories: foundBlog.categories || [],
            collectionID: foundBlog.collectionID,
            itemUpdatedBy: foundBlog.itemUpdatedBy,
            itemUpdated: foundBlog.itemUpdated
          };
          setBlog(transformedBlog);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  const fetchRelatedPosts = async (category) => {
    try {
      const response = await fetch('/api/perch/blogs');
      const result = await response.json();
      
      if (Array.isArray(result)) {
        const transformedBlogs = result
          .filter(blog => blog.itemID.toString() !== id)
          .map(blog => {
            let parsedData = {};
            try {
              parsedData = JSON.parse(blog.itemJSON);
            } catch (e) {
              parsedData = {};
            }
            
            return {
              id: blog.itemID,
              documentId: blog.itemID,
              title: parsedData.title || `Blog ${blog.itemID}`,
              category: parsedData.category || 'General',
              readTime: parsedData.readTime || '5 min read',
              image: parsedData.image || null
            };
          })
          .filter(post => post.category === category)
          .slice(0, 3);
          
        setRelatedPosts(transformedBlogs);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
      setRelatedPosts([]);
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
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-earth-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-brand to-earth-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
        {/* Bookmark Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBookmark}
          className={`w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
            isBookmarked ? 'bg-brand text-white' : 'bg-white/80 text-earth-600 hover:bg-brand hover:text-white'
          }`}
        >
          {isBookmarked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </motion.button>

        {/* Share Button */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-earth-600 hover:bg-brand hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            <FaShare size={16} />
          </motion.button>

          {/* Share Menu */}
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="absolute right-16 top-0 bg-white rounded-xl shadow-xl p-3 min-w-[200px]"
            >
              {shareOptions.map((option, index) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 p-3 hover:bg-earth-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-earth-700">{option.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Back to Top */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-earth-600 hover:bg-brand hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-lg">⬆️</span>
        </motion.button>
      </div>

      <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
        <div className="container mx-auto px-6 md:px-0">
          {/* Enhanced Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              onClick={() => router.push('/blogs')}
              variant="outline"
              className="group border-earth-200 text-brand hover:text-white hover:bg-brand transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enhanced Main Content */}
            <div className="lg:col-span-2">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-xl overflow-hidden relative"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none z-10"></div>
                
                {/* Enhanced Hero Image */}
                <div className="relative overflow-hidden group">
                  {blog.image ? (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-earth-200 via-earth-300 to-earth-400 flex items-center justify-center">
                      <motion.span 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-earth-600 text-xl font-medium"
                      >
                        ✨ {blog.title} ✨
                      </motion.span>
                    </div>
                  )}
                  
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                 

                  {/* Reading time and date indicator */}
                  <div className="absolute bottom-6 left-6 flex gap-3">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                      ⏱️ {blog.readTime}
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                      📅 {new Date(blog.date).toLocaleDateString()}
                    </div>
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
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-earth-50 to-earth-100 rounded-xl mb-8 border border-earth-200">
                    <div className="w-16 h-16 bg-earth-200 rounded-full flex items-center justify-center overflow-hidden">
                      {blog.authorImage ? (
                        <img src={blog.authorImage} alt={blog.author} className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className="text-earth-600" size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-earth-800 text-lg">{blog.author}</h3>
                      <p className="text-earth-600 text-sm mb-2">{blog.authorBio}</p>
                      <div className="flex items-center gap-4 text-xs text-earth-500">
                        <span>Published {new Date(blog.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{blog.views} views</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-earth-200">
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
                  )}

                  {/* Social Share Section */}
                  <div className="mt-12 pt-8 border-t border-earth-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-earth-800">Share this article:</span>
                        <div className="flex gap-3">
                          {shareOptions.map((option, index) => (
                            <button
                              key={option.name}
                              onClick={option.action}
                              className="w-10 h-10 rounded-full bg-earth-100 hover:bg-brand hover:text-white transition-all duration-300 flex items-center justify-center text-earth-600"
                              title={option.name}
                            >
                              <span className="text-sm">{option.icon}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleBookmark}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                          isBookmarked 
                            ? 'bg-brand text-white' 
                            : 'bg-earth-100 text-earth-600 hover:bg-brand hover:text-white'
                        }`}
                      >
                        <span>{isBookmarked ? <FaHeart /> : <FaRegHeart />}</span>
                        <span className="text-sm">{isBookmarked ? 'Saved' : 'Save'}</span>
                      </button>
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
              className="border-earth-200 text-brand hover:bg-brand hover:text-white"
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
    </>
  );

}
