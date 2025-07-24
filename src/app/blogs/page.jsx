"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCalendar, FaUser, FaEye, FaArrowRight } from "react-icons/fa";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Pagination from "../components/ui/Pagination";
import Image from "next/image";
import { FaSliders } from "react-icons/fa6"
const blogPosts = [
  {
    id: 1,
    title: "Dubai Real Estate Market Trends 2024: What Investors Need to Know",
    excerpt: "Discover the latest trends shaping Dubai's real estate landscape and how they impact investment opportunities in the region.",
    content: "Full blog content here...",
    author: "John Doe",
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
    content: "Full blog content here...",
    author: "Jane Smith",
    date: "2024-01-12",
    category: "Buying Guide",
    tags: ["Off-Plan", "First-Time Buyers", "Guide"],
    image: "/assets/blog/off-plan.jpg",
    readTime: "8 min read",
    views: 980,
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Waterfront Living: Top Communities in Dubai",
    excerpt: "Explore Dubai's most prestigious waterfront communities and what makes them the ultimate luxury living destinations.",
    content: "Full blog content here...",
    author: "Ahmed Al-Mansouri",
    date: "2024-01-10",
    category: "Luxury Properties",
    tags: ["Luxury", "Waterfront", "Communities"],
    image: "/assets/blog/waterfront.jpg",
    readTime: "6 min read",
    views: 1450,
    featured: true,
  },
  {
    id: 4,
    title: "Investment ROI: Comparing Dubai's Top Real Estate Areas",
    excerpt: "A comprehensive analysis of return on investment across Dubai's most popular real estate investment areas.",
    content: "Full blog content here...",
    author: "Fatima Al-Rashid",
    date: "2024-01-08",
    category: "Investment",
    tags: ["ROI", "Investment", "Analysis"],
    image: "/assets/blog/investment.jpg",
    readTime: "7 min read",
    views: 890,
    featured: false,
  },
  {
    id: 5,
    title: "Sustainable Living: Green Buildings in Dubai's Future",
    excerpt: "How Dubai is leading the way in sustainable architecture and what it means for future property developments.",
    content: "Full blog content here...",
    author: "Omar Al-Khalili",
    date: "2024-01-05",
    category: "Sustainability",
    tags: ["Sustainability", "Green Buildings", "Future"],
    image: "/assets/blog/green-building.jpg",
    readTime: "4 min read",
    views: 720,
    featured: false,
  },
  {
    id: 6,
    title: "Legal Guide: Property Ownership Laws for Expats in Dubai",
    excerpt: "Understanding the legal framework for property ownership in Dubai as an expatriate investor.",
    content: "Full blog content here...",
    author: "Layla Al-Hashemi",
    date: "2024-01-03",
    category: "Legal",
    tags: ["Legal", "Expats", "Ownership"],
    image: "/assets/blog/legal.jpg",
    readTime: "9 min read",
    views: 1100,
    featured: false,
  },
];

export default function BlogsPage() {
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

  useEffect(() => {
    const uniqueCategories = [...new Set(blogPosts.map(post => post.category))].sort();
    const uniqueAuthors = [...new Set(blogPosts.map(post => post.author))].sort();
    setCategories(uniqueCategories);
    setAuthors(uniqueAuthors);
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    return (
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedCategory === "" || post.category === selectedCategory) &&
      (selectedAuthor === "" || post.author === selectedAuthor)
    );
  }).sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date) - new Date(a.date);
      case "views":
        return b.views - a.views;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);
  const featuredPosts = blogPosts.filter(post => post.featured);

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
                      <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                        <span className="text-earth-600 text-lg">Blog Image</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
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
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </p>
        </div>

        {/* Blog Posts Grid */}
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
                    <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                      <span className="text-earth-600">Blog Image</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
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
                        <div className="w-6 h-6 bg-earth-200 rounded-full flex items-center justify-center">
                          <FaUser size={10} className="text-earth-600" />
                        </div>
                        <span className="text-sm text-earth-600">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-earth-600">
                        <div className="flex items-center gap-1">
                          <FaEye size={12} />
                          <span>{post.views}</span>
                        </div>
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

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Pagination
            totalItems={filteredPosts.length}
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
      </div>
    </section>
  );
}
