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
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 50000000]); // Applied price range
  const [selectedLocation, setSelectedLocation] = useState("");
  const [appliedLocation, setAppliedLocation] = useState(""); // Applied location
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [appliedBedrooms, setAppliedBedrooms] = useState(""); // Applied bedrooms
  const [selectedBathrooms, setSelectedBathrooms] = useState("");
  const [appliedBathrooms, setAppliedBathrooms] = useState(""); // Applied bathrooms
  const [selectedType, setSelectedType] = useState("");
  const [appliedType, setAppliedType] = useState(""); // Applied type
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [appliedDeveloper, setAppliedDeveloper] = useState(""); // Applied developer
  const [completionStatus, setCompletionStatus] = useState("");
  const [appliedCompletionStatus, setAppliedCompletionStatus] = useState(""); // Applied completion status
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
  const [typeOptions, setTypeOptions] = useState([]);
  const [developerOptions, setDeveloperOptions] = useState([]);
  const [completionStatusOptions, setCompletionStatusOptions] = useState([]);

  // Fetch all filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch all projects to get filter options
        const res = await axios.get('/api/pf/projects');
        const json = await res.json();
        
        if (json.success) {
          // Extract unique filter options from ALL data
          const uniqueLocations = [...new Set(json.data.map(p => ({ id: p.locationId, name: p.location })).filter(l => l.id && l.name))];
          const uniqueBedrooms = [...new Set(json.data.map(p => p.beds).filter(bed => bed && bed > 0))].sort((a, b) => a - b);
          const uniqueBathrooms = [...new Set(json.data.map(p => p.baths).filter(bath => bath && bath > 0))].sort((a, b) => a - b);
          const uniqueTypes = [...new Set(json.data.map(p => p.type).filter(Boolean))].sort();
          const uniqueCompletionStatus = [...new Set(json.data.map(p => p.completionStatus).filter(Boolean))].sort();

          console.log('Filter options extracted:', {
            locations: uniqueLocations.length,
            bedrooms: uniqueBedrooms,
            bathrooms: uniqueBathrooms,
            types: uniqueTypes,
            developers: uniqueDevelopers,
            completionStatus: uniqueCompletionStatus
          });

          setLocations(uniqueLocations);
          setBedroomOptions(uniqueBedrooms.length > 0 ? uniqueBedrooms : [1, 2, 3, 4, 5]);
          setBathroomOptions(uniqueBathrooms.length > 0 ? uniqueBathrooms : [1, 2, 3, 4, 5]);
          setTypeOptions(uniqueTypes.length > 0 ? uniqueTypes : ['Apartment', 'Villa', 'Townhouse', 'Penthouse']);
          setCompletionStatusOptions(uniqueCompletionStatus.length > 0 ? uniqueCompletionStatus : ['Ready', 'Off Plan', 'Under Construction']);
        }
      } catch (err) {
        console.error("Error fetching filter options:", err);
        // Set fallback options if API fails
        setBedroomOptions([1, 2, 3, 4, 5]);
        setBathroomOptions([1, 2, 3, 4, 5]);
        setTypeOptions(['Apartment', 'Villa', 'Townhouse', 'Penthouse']);
        setCompletionStatusOptions(['Ready', 'Off Plan', 'Under Construction']);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
    setPage(1); // Reset to first page when searching
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    setAppliedSearchTerm(searchTerm);
    setAppliedPriceRange([...priceRange]);
    setAppliedLocation(selectedLocation);
    setAppliedBedrooms(selectedBedrooms);
    setAppliedBathrooms(selectedBathrooms);
    setAppliedType(selectedType);
    setAppliedCompletionStatus(completionStatus);
    setPage(1); // Reset to first page when applying filters
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
        
        // Determine which endpoint to use based on APPLIED filters
        const hasFilters = appliedSearchTerm || 
                          appliedPriceRange[0] > 0 || 
                          appliedPriceRange[1] < 50000000 || 
                          appliedLocation || 
                          appliedBedrooms || 
                          appliedBathrooms || 
                          appliedType || 
                          appliedCompletionStatus ||
                          orderBy !== 'publishedAt' ||
                          sortOrder !== 'desc';

        const endpoint = hasFilters ? '/api/pf/projects/search' : '/api/pf/projects';
        
        // Build query parameters using APPLIED filters
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pageSize.toString(),
        });

        if (hasFilters) {
          params.append('orderBy', orderBy);
          params.append('sort', sortOrder);
          
          if (appliedSearchTerm) params.append('search', appliedSearchTerm);
          if (appliedPriceRange[0] > 0) params.append('priceFrom', appliedPriceRange[0].toString());
          if (appliedPriceRange[1] < 50000000) params.append('priceTo', appliedPriceRange[1].toString());
          if (appliedLocation) params.append('locationId', appliedLocation);
          if (appliedBedrooms) params.append('bedrooms', appliedBedrooms);
          if (appliedBathrooms) params.append('bathrooms', appliedBathrooms);
          if (appliedType) params.append('type', appliedType);
          if (appliedCompletionStatus) params.append('completionStatus', appliedCompletionStatus);
        }

        console.log('Using endpoint:', endpoint);
        console.log('With params:', params.toString());

        const res = await fetch(`${endpoint}?${params.toString()}`);
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
  }, [page, pageSize, appliedSearchTerm, appliedPriceRange, appliedLocation, appliedBedrooms, appliedBathrooms, appliedType, appliedCompletionStatus, orderBy, sortOrder]);

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
    setAppliedPriceRange([0, 50000000]);
    setSelectedLocation("");
    setAppliedLocation("");
    setSelectedBedrooms("");
    setAppliedBedrooms("");
    setSelectedBathrooms("");
    setAppliedBathrooms("");
    setSelectedType("");
    setAppliedType("");
    setCompletionStatus("");
    setAppliedCompletionStatus("");
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
                    className="w-full bg-white/90 placeholder-brand backdrop-blur-sm text-brand rounded-[2rem] pl-12 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border-2 border-brand shadow-inner transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6">
                    {/* Price Range */}
                    <div className="md:col-span-2 lg:col-span-1">
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
                        className="w-full max-h-[16rem] overflow-y-scroll  bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
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

                    {/* Bathrooms Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Bathrooms</h3>
                      <select
                        value={selectedBathrooms}
                        onChange={(e) => setSelectedBathrooms(e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      >
                        <option value="">Any Bathrooms</option>
                        {bathroomOptions.map(baths => (
                          <option key={baths} value={baths}>{baths} Bath{baths > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Property Type</h3>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      >
                        <option value="">All Types</option>
                        {typeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    
                    {/* Completion Status Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-earth-700 mb-3">Completion Status</h3>
                      <select
                        value={completionStatus}
                        onChange={(e) => setCompletionStatus(e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      >
                        <option value="">All Status</option>
                        {completionStatusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
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
                </div>
              )}

              {/* Apply Filters Button - Show when filters panel is open */}
              {showFilters && (
                <div className="flex justify-center gap-4 mt-6">
                  <motion.button
                    onClick={handleApplyFilters}
                    className="px-8 py-3 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white rounded-tl-lg rounded-br-lg hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 text-brand border border-earth-300 rounded-tl-lg rounded-br-lg hover:bg-earth-100 transition-colors duration-200"
                  >
                    Reset All Filters
                  </button>
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
