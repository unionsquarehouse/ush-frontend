
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaCalendar,
  FaUser,
  FaEye,
  FaArrowRight,
} from "react-icons/fa";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Pagination from "../components/ui/Pagination";
import { useRouter } from "next/navigation";
import { FaSliders } from "react-icons/fa6";

// Category mapping based on provided schemas
const categoryMap = {
  "100": "Lifestyle",
  "103": "News & Updates",
  // Add more mappings as needed based on your categories
};

export default function BlogsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  // State for blogs and metadata
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);

  // Extract unique categories and authors for filters
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Navigation to individual blog page using slug
  const handleBlogClick = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  // Fetch blogs from /api/db/blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/db/blogs");
        const res = await response.json();
        const result = res.data;

        console.log("MongoDB API Response:", res);

        if (Array.isArray(result)) {
          // Transform API data to match frontend expectations
          const transformedBlogs = result.map((blog) => {
            // Construct image URL (adjust base URL as needed)
            const imageUrl = blog.image?._default
              ? `https://ush.imgix.net${blog.image._default}` // Replace with your actual CDN or server URL
              : "/fallback-image.png"; // Fallback image
            console.log(imageUrl,"-=-=-=-=-=-=-=-=");
            
            return {
              id: blog._id,
              documentId: blog._id,
              title: blog.title || `Blog ${blog._id}`,
              excerpt: blog.excerpt?.processed || blog.excerpt?.raw || "No excerpt available",
              content: blog.desc?.processed || blog.desc?.raw || "No content available",
              author: blog.itemUpdatedBy || "Unknown Author",
              date: blog.dateTime || blog.itemUpdated || new Date().toISOString(),
              category: categoryMap[blog.categories?.[0]] || "General", // Map category ID to name
              readTime: "5 min read", // Static for now, can be calculated dynamically
              featured: false, // Adjust based on your logic for featured posts
              views: Math.floor(Math.random() * 2000) + 500, // Placeholder
              image: imageUrl,
              imageAlt: blog.image_alt || blog.title,
              authorImage: null, // Not provided in API response
              tags: blog.categories || [],
              createdAt: blog.itemUpdated,
              updatedAt: blog.itemUpdated,
              publishedAt: blog.dateTime || blog.itemUpdated,
              collectionID: blog.collectionID,
              itemUpdatedBy: blog.itemUpdatedBy,
              itemSearch: blog.itemSearch || "",
              status: blog.status,
              slug: blog.slug,
            };
          });

          setBlogPosts(transformedBlogs);
          setTotalBlogs(transformedBlogs.length);

          // Extract unique categories and authors
          const uniqueCategories = [
            ...new Set(transformedBlogs.map((blog) => blog.category).filter(Boolean)),
          ];
          const uniqueAuthors = [
            ...new Set(transformedBlogs.map((blog) => blog.author).filter(Boolean)),
          ];
          setCategories(uniqueCategories);
          setAuthors(uniqueAuthors);

          // Apply initial filtering and pagination
          applyFiltersAndPagination(transformedBlogs);
        } else {
          console.error("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Client-side filtering and pagination
  const applyFiltersAndPagination = (blogs) => {
    let filtered = [...blogs];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.itemSearch.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Apply author filter
    if (selectedAuthor) {
      filtered = filtered.filter((blog) => blog.author === selectedAuthor);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "title":
          return a.title.localeCompare(b.title);
        case "views":
          return b.views - a.views;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedBlogs = filtered.slice(startIndex, startIndex + pageSize);

    setFilteredPosts(paginatedBlogs);
    setTotalBlogs(filtered.length);
  };

  // Re-apply filters when dependencies change
  useEffect(() => {
    if (blogPosts.length > 0) {
      applyFiltersAndPagination(blogPosts);
    }
  }, [page, pageSize, selectedCategory, selectedAuthor, searchTerm, sortBy, blogPosts]);

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setSortBy("date");
    setPage(1);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
            Stay informed with the latest trends, market analysis, and expert
            insights from Dubai's real estate industry
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
            <h2 className="text-3xl font-bold text-earth-800 mb-8">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card
                  key={post.id}
                  onClick={() => handleBlogClick(post.slug)}
                  className="relative overflow-hidden group cursor-pointer transition-all duration-500 border-0 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:scale-105"
                  style={{
                    backdropFilter: "blur(16px)",
                    boxShadow: `
                      0 8px 32px 0 rgba(31, 38, 135, 0.2),
                      0 16px 48px -8px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                  }}
                >
                  {/* Glassmorphism overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-[1px] bg-gradient-to-br from-white/20 to-white/5 pointer-events-none"></div>

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
                          alt={post.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                          <span className="text-earth-600 text-lg">
                            Blog Image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-earth-600">
                        <span className="bg-brand/10 text-brand px-2 py-1 rounded-full">
                          {post.category}
                        </span>
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

                      <p className="text-earth-600 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-earth-200 rounded-full flex items-center justify-center">
                            <FaUser size={12} className="text-earth-600" />
                          </div>
                          <span className="text-sm text-earth-600">
                            {post.author}
                          </span>
                        </div>
                        <span className="text-sm text-brand">
                          {post.readTime}
                        </span>
                      </div>

                      <Button className="w-full bg-brand hover:bg-brand-hover text-white group/btn">
                        Read More
                        <FaArrowRight
                          className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                          size={14}
                        />
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
          className="mb-16"
        >
          <div className="max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-earth-400">
                <FaSearch size={20} />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-white/95 backdrop-blur-sm text-earth-800 placeholder-earth-400 rounded-full pl-16 pr-20 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand/30 border border-earth-100 shadow-lg transition-all duration-300 hover:shadow-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand text-white rounded-full p-3 hover:bg-brand-hover transition-all duration-300 hover:scale-105 shadow-md"
              >
                <FaSliders size={16} />
              </button>
            </div>

            {/* Expandable Filters Section */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-white/80 backdrop-blur-sm p-6 shadow-lg border border-earth-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-2 block">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-white/90 text-earth-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 border border-earth-200"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Author Filter */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-2 block">
                      Author
                    </label>
                    <select
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full bg-white/90 text-earth-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 border border-earth-200"
                    >
                      <option value="">All Authors</option>
                      {authors.map((author) => (
                        <option key={author} value={author}>
                          {author}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-2 block">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white/90 text-earth-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 border border-earth-200"
                    >
                      <option value="date">Latest First</option>
                      <option value="views">Most Popular</option>
                      <option value="title">Alphabetical</option>
                    </select>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 text-earth-600 border border-earth-300 rounded-full hover:bg-earth-50 transition-colors duration-200"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  onClick={() => handleBlogClick(post.slug)}
                  className="group cursor-pointer transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:-translate-y-2 h-full overflow-hidden"
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
                          <span className="text-earth-600">Blog Image</span>
                        </div>
                      )}
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-sm text-brand px-3 py-1 rounded-full text-sm font-medium shadow-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-earth-500 mb-3">
                        <FaCalendar size={12} />
                        <span>{formatDate(post.date)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-earth-800 group-hover:text-brand transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-base text-earth-600 line-clamp-3 flex-grow mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-earth-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                            <FaUser size={12} className="text-brand" />
                          </div>
                          <span className="text-sm font-medium text-earth-700">{post.author}</span>
                        </div>
                        <div className="flex items-center text-brand font-medium text-sm group-hover:gap-2 transition-all duration-300">
                          <span>Read More</span>
                          <FaArrowRight
                            className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                            size={12}
                          />
                        </div>
                      </div>
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
