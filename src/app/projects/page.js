"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaSearch, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { IoMdPricetag } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/ui/Pagination";

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(""); // New state for applied search
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [totalProjects, setTotalProjects] = useState(0);
  const [orderBy, setOrderBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter options
  const [locations, setLocations] = useState([]);
  const [bedroomOptions, setBedroomOptions] = useState([]);
  const [bathroomOptions, setBathroomOptions] = useState([]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
    setPage(1); // Reset to first page when searching
  };

  // Handle search icon click
  const handleSearchIconClick = () => {
    setAppliedSearchTerm(searchTerm);
    setPage(1);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pageSize.toString(),
          orderBy,
          sort: sortOrder,
        });

        if (appliedSearchTerm) params.append('search', appliedSearchTerm);
        if (priceRange[0] > 0) params.append('priceFrom', priceRange[0].toString());
        if (priceRange[1] < 50000000) params.append('priceTo', priceRange[1].toString());
        if (selectedLocation) params.append('locationId', selectedLocation);
        if (selectedBedrooms) params.append('bedrooms', selectedBedrooms);
        if (selectedBathrooms) params.append('bathrooms', selectedBathrooms);
        if (selectedType) params.append('type', selectedType);
        if (completionStatus) params.append('completionStatus', completionStatus);

        const res = await fetch(`/api/pf/projects?${params.toString()}`);
        const json = await res.json();
        
        console.log("Projects API response:", json);
        
        if (json.success) {
          setProjects(json.data);
          setTotalProjects(json.total);
          
          // Extract unique filter options from current data
          const uniqueLocations = [...new Set(json.data.map(p => ({ id: p.locationId, name: p.location })).filter(l => l.id))];
          const uniqueBedrooms = [...new Set(json.data.map(p => p.beds).filter(Boolean))].sort();
          const uniqueBathrooms = [...new Set(json.data.map(p => p.baths).filter(Boolean))].sort();

          setLocations(uniqueLocations);
          setBedroomOptions(uniqueBedrooms);
          setBathroomOptions(uniqueBathrooms);
        } else {
          console.error("API Error:", json.error);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, pageSize, appliedSearchTerm, priceRange, selectedLocation, selectedBedrooms, selectedBathrooms, selectedType, completionStatus, orderBy, sortOrder]);

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setAppliedSearchTerm("");
    setPriceRange([0, 50000000]);
    setSelectedLocation("");
    setSelectedBedrooms("");
    setSelectedBathrooms("");
    setSelectedType("");
    setCompletionStatus("");
    setPage(1);
  };

  // Format price for display
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`;
    }
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden bg-earth-50"
      ref={sectionRef}
    >
      <motion.div
        className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl mb-4 text-black flex items-center justify-center">
            <span className="text-[#ac895e] shine-effect mr-2">All</span> Projects
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ac895e] mx-auto mb-4"></div>
              <p className="text-earth-600">Loading projects...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Search and Filter Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row items-stretch gap-6">
                {/* Search Bar with Form */}
                <form onSubmit={handleSearch} className="relative flex-1 flex">
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    className="w-full bg-white/90 placeholder-brand backdrop-blur-sm text-brand rounded-tl-[2rem] rounded-br-[2rem] pl-12 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 shadow-inner transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand">
                    <FaSearch size={18} />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSearchIconClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                    aria-label="Search"
                  >
                    <FaSearch size={14} />
                  </button>
                </form>

                {/* Filter Toggle Button */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white rounded-tl-[2rem] rounded-br-[2rem] px-6 py-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaSliders />
                  <span>Filters</span>
                </motion.button>
              </div>

              {/* Show applied search term */}
              {appliedSearchTerm && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-earth-600">Searching for:</span>
                  <span className="bg-[#ac895e] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    "{appliedSearchTerm}"
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setAppliedSearchTerm("");
                        setPage(1);
                      }}
                      className="hover:bg-white/20 rounded-full p-1"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}

              {/* Expandable Filters Section */}
              {showFilters && (
                <div className="pt-6 px-2 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Price Range */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Price Range (AED)</h3>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        />
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Location</h3>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      >
                        <option value="">All Locations</option>
                        {locations.map(location => (
                          <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Bedrooms Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Bedrooms</h3>
                      <select
                        value={selectedBedrooms}
                        onChange={(e) => setSelectedBedrooms(e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      >
                        <option value="">Any Bedrooms</option>
                        {bedroomOptions.map(beds => (
                          <option key={beds} value={beds}>{beds} Bed{beds > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Sort By</h3>
                      <select
                        value={`${orderBy}-${sortOrder}`}
                        onChange={(e) => {
                          const [order, sort] = e.target.value.split('-');
                          setOrderBy(order);
                          setSortOrder(sort);
                        }}
                        className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      >
                        <option value="publishedAt-desc">Latest First</option>
                        <option value="publishedAt-asc">Oldest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={resetFilters}
                      className="px-6 py-3 text-brand border border-earth-300 rounded-tl-lg rounded-br-lg hover:bg-earth-100 transition-colors duration-200"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <PropertyCard project={project} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-20 text-center">
                  <p className="text-brand text-lg mb-4">No projects found matching your criteria.</p>
                  <motion.button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white rounded-tl-lg rounded-br-lg hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset Filters
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <Pagination
                totalItems={totalProjects}
                itemsPerPage={pageSize}
                currentPage={page}
                onPageChange={handlePageChange}
                maxPageNumbers={5}
                showItemCount={true}
                showItemsPerPageSelect={true}
                onItemsPerPageChange={handlePageSizeChange}
                itemsPerPageOptions={[6, 12, 24, 48]}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
}
