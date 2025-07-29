"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCalendar, FaUser, FaEye, FaArrowRight } from "react-icons/fa";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Pagination from "../components/ui/Pagination";
import Image from "next/image";
import { FaSliders } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [meta, setMeta] = useState(null);

  const handleBlogClick = (documentId) => {
    router.push(`/blogs/${documentId}`);
  };

  // Fetch blogs from Strapi API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedAuthor) params.set('author', selectedAuthor);
        if (searchTerm) params.set('search', searchTerm);
        
        // Add sorting
        let sortParam = 'createdAt:desc'; // default
        switch (sortBy) {
          case 'date':
            sortParam = 'date:desc';
            break;
          case 'title':
            sortParam = 'title:asc';
            break;
          case 'views':
            sortParam = 'createdAt:desc'; // fallback since views not in Strapi
            break;
        }
        params.set('sort', sortParam);

        const response = await fetch(`/api/strapi/blogs?${params.toString()}`);
        const result = await response.json();
        
        console.log('API Response:', result); 

        if (result.success) {
          setBlogPosts(result.data);
          setMeta(result.meta);
          setTotalBlogs(result.meta.pagination.total);
        } else {
          console.error('Failed to fetch blogs:', result.error);
          console.error('Error details:', result.details);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, pageSize, selectedCategory, selectedAuthor, searchTerm, sortBy]);

  // Extract unique categories and authors from fetched data
  useEffect(() => {
    if (blogPosts.length > 0) {
      const uniqueCategories = [...new Set(blogPosts.map(post => post.category))];
      const uniqueAuthors = [...new Set(blogPosts.map(post => post.author))];
      setCategories(uniqueCategories);
      setAuthors(uniqueAuthors);
    }
  }, [blogPosts]);

  // Filter featured posts from the fetched data
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Remove the static filtering since we're now filtering on the server
  const filteredPosts = blogPosts;
  const paginatedPosts = filteredPosts;

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setSortBy("date");
    setPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
      <div className="container mx-auto px-6 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-brand"></div>
            <FaUser className="text-brand" size={40} />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-brand"></div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-earth-800 to-earth-600 bg-clip-text text-transparent">
            Real Estate
            <span className="block text-brand">Insights & News</span>
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Stay informed with the latest trends, market analysis, and expert insights from Dubai's real estate industry
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-earth-800 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card
                  key={post.id}
                  onClick={() => handleBlogClick(post.documentId)}
                  className="relative rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden group cursor-pointer transition-all duration-500 border-0 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:scale-105"
                  style={{
                    backdropFilter: 'blur(16px)',
                    boxShadow: `
                      0 8px 32px 0 rgba(31, 38, 135, 0.2),
                      0 16px 48px -8px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                >
                  {/* Glassmorphism overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-[1px] rounded-tl-[2rem] rounded-br-[2rem] bg-gradient-to-br from-white/20 to-white/5 pointer-events-none"></div>
                  
                  <CardContent className="p-0 h-full relative">
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-brand text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>

                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                          <span className="text-earth-600 text-lg">Blog Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-earth-600">
                        <span className="bg-brand/10 text-brand px-2 py-1 rounded-full">{post.category}</span>
                        <div className="flex items-center gap-1">
                          <FaCalendar size={12} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaEye size={12} />
                          <span>{post.views}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-earth-800 group-hover:text-brand transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-earth-600 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-earth-200 rounded-full flex items-center justify-center">
                            <FaUser size={12} className="text-earth-600" />
                          </div>
                          <span className="text-sm text-earth-600">{post.author}</span>
                        </div>
                        <span className="text-sm text-brand">{post.readTime}</span>
                      </div>

                      <Button className="w-full bg-brand hover:bg-brand-hover text-white group/btn">
                        Read More
                        <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand">
                <FaSearch size={18} />
              </div>
              <input
                type="text"
                placeholder="Search articles, tags, or topics..."
                className="w-full bg-white/90 placeholder-brand backdrop-blur-sm text-brand rounded-tl-[2rem] rounded-br-[2rem] pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 shadow-inner transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white rounded-tl-[2rem] rounded-br-[2rem] px-6 py-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <FaSliders />
              <span>Filters</span>
            </button>
          </div>

          {/* Expandable Filters Section */}
          {showFilters && (
            <div className="pt-6 px-2 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Category</h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Author Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Author</h3>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                  >
                    <option value="">All Authors</option>
                    {authors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                  >
                    <option value="date">Latest First</option>
                    <option value="views">Most Popular</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-6 py-3 text-brand border border-earth-300 rounded-tl-lg rounded-br-lg hover:bg-earth-100 transition-colors duration-200"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Summary */}
        <div className="mb-8 text-center">
          <p className="text-brand">
            {loading ? 'Loading...' : `Showing ${filteredPosts.length} of ${totalBlogs} articles`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {paginatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  key={post.id}
                  onClick={() => handleBlogClick(post.documentId)}
                  className="relative rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden group cursor-pointer transition-all duration-500 border-0 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:scale-105 h-full"
                  style={{
                    backdropFilter: 'blur(16px)',
                    boxShadow: `
                      0 8px 32px 0 rgba(31, 38, 135, 0.2),
                      0 16px 48px -8px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                >
                  {/* Glassmorphism overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-[1px] rounded-tl-[2rem] rounded-br-[2rem] bg-gradient-to-br from-white/20 to-white/5 pointer-events-none"></div>
                  
                  <CardContent className="p-0 h-full relative flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                          <span className="text-earth-600">Blog Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-earth-600">
                        <span className="bg-brand/10 text-brand px-2 py-1 rounded-full">{post.category}</span>
                        <div className="flex items-center gap-1">
                          <FaCalendar size={12} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-earth-800 group-hover:text-brand transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-earth-600 line-clamp-3 flex-grow">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-earth-200/50">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-earth-200 rounded-full flex items-center justify-center overflow-hidden">
                            {post.authorImage ? (
                              <img 
                                src={post.authorImage} 
                                alt={post.author}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaUser size={10} className="text-earth-600" />
                            )}
                          </div>
                          <span className="text-sm text-earth-600">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-earth-600">
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-brand hover:bg-brand-hover text-white group/btn mt-auto">
                        Read More
                        <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Pagination
              totalItems={totalBlogs}
              itemsPerPage={pageSize}
              currentPage={page}
              onPageChange={setPage}
              maxPageNumbers={5}
              showItemCount={true}
              showItemsPerPageSelect={true}
              onItemsPerPageChange={handlePageSizeChange}
              itemsPerPageOptions={[6, 12, 18, 24]}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
