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
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const [locations, setLocations] = useState([]);
  const [bedroomOptions, setBedroomOptions] = useState([]);
  const [bathroomOptions, setBathroomOptions] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(
        `http://localhost:1337/api/projects?populate[features]=true&populate[image]=true`
      );
      const json = await res.json();

      const formattedProjects = json.data.map((item) => {
        const attrs = item.attributes || item;
        
        // Extract numeric values from strings
        const rawPrice = parseInt(attrs.price.replace(/[^\d]/g, ""));
        const bedroomCount = parseInt(attrs.beds.replace(/[^\d]/g, "")) || 0;
        const bathroomCount = parseInt(attrs.baths.replace(/[^\d]/g, "")) || 0;
        const areaValue = parseInt(attrs.area.replace(/[^\d]/g, "")) || 0;

        return {
          id: item.id,
          documentId: item.documentId,
          title: attrs.title,
          loc: attrs.loc,
          info: attrs.info,
          price: attrs.price,
          priceValue: rawPrice,
          beds: attrs.beds,
          bedroomCount: bedroomCount,
          baths: attrs.baths,
          bathroomCount: bathroomCount,
          area: attrs.area,
          areaValue: areaValue,
          color: attrs.color,
          features: attrs.features?.map((f) => f.feature) || [],
          image: attrs?.image?.formats?.large?.url
            ? "http://localhost:1337" + attrs.image.formats.large.url
            : null,
          createdAt: attrs.createdAt,
          updatedAt: attrs.updatedAt,
          publishedAt: attrs.publishedAt,
          locale: attrs.locale,
        };
      });

      setProjects(formattedProjects);

      // Extract unique filter options
      const uniqueLocations = [...new Set(formattedProjects.map(p => p.loc))].sort();
      const uniqueBedrooms = [...new Set(formattedProjects.map(p => p.beds))].sort();
      const uniqueBathrooms = [...new Set(formattedProjects.map(p => p.baths))].sort();

      setLocations(uniqueLocations);
      setBedroomOptions(uniqueBedrooms);
      setBathroomOptions(uniqueBathrooms);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      project.priceValue >= priceRange[0] &&
      project.priceValue <= priceRange[1] &&
      (selectedLocation === "" || project.loc === selectedLocation) &&
      (selectedBedrooms === "" || project.beds === selectedBedrooms) &&
      (selectedBathrooms === "" || project.baths === selectedBathrooms) 
    );
  });

  const paginatedProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 50000000]);
    setSelectedLocation("");
    setSelectedBedrooms("");
    setSelectedBathrooms("");
    setAreaRange([0, 20000]);
    setPage(1);
  };

  // Format price for display
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`;
    }
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  // Format area for display
  const formatArea = (area) => {
    return `${area.toLocaleString()} sq.ft`;
  };

  return (
    <section
      id="projects"
      className="pt-24 pb-32 relative overflow-hidden bg-earth-50"
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        style={{ opacity }}
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
            <span className="text-[#ac895e] shine-effect mr-2">Featured</span> Off‑Plan Projects
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>
        </motion.div>

        {/* Premium Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="">
            <div className="flex flex-col md:flex-row items-stretch gap-6 ">
              {/* Search Bar - Premium Styling */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand">
                  <FaSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  className="w-full bg-white/90 placeholder-brand backdrop-blur-sm text-brand rounded-tl-[1.5rem] rounded-br-[1.5rem] pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 shadow-inner transition-all duration-300 hover:"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Toggle Button */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white rounded-tl-[1.5rem] rounded-br-[1.5rem] px-6 py-4 hover: transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSliders />
                <span>Filters</span>
              </motion.button>
            </div>

            {/* Expandable Filters Section */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: showFilters ? 'auto' : 0,
                opacity: showFilters ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 px-2 mt-6 ">
                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {/* Location Filter */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <HiLocationMarker className="text-brand" size={18} />
                      <h3 className="text-sm font-semibold text-earth-700">Location</h3>
                    </div>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms Filter */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FaBed className="text-brand" size={16} />
                      <h3 className="text-sm font-semibold text-earth-700">Bedrooms</h3>
                    </div>
                    <select
                      value={selectedBedrooms}
                      onChange={(e) => setSelectedBedrooms(e.target.value)}
                      className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                    >
                      <option value="">Any Bedrooms</option>
                      {bedroomOptions.map(bedroom => (
                        <option key={bedroom} value={bedroom}>{bedroom}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bathrooms Filter */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FaBath className="text-brand" size={16} />
                      <h3 className="text-sm font-semibold text-earth-700">Bathrooms</h3>
                    </div>
                    <select
                      value={selectedBathrooms}
                      onChange={(e) => setSelectedBathrooms(e.target.value)}
                      className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                    >
                      <option value="">Any Bathrooms</option>
                      {bathroomOptions.map(bathroom => (
                        <option key={bathroom} value={bathroom}>{bathroom}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price and Area Range Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Price Range Filter */}
                  {/* <div>
                    <div className="flex items-center gap-3 mb-3">
                      <IoMdPricetag className="text-brand" size={20} />
                      <h3 className="text-sm font-semibold text-earth-700">Price Range</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-full">
                        <input
                          type="number"
                          placeholder="Min Price"
                          className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-earth-400 text-xs">AED</span>
                      </div>
                      
                      <span className="hidden sm:block text-brand">—</span>
                      
                      <div className="relative w-full">
                        <input
                          type="number"
                          placeholder="Max Price"
                          className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-earth-400 text-xs">AED</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-brand mt-2">
                      {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
                    </p>
                  </div> */}

                  {/* Area Range Filter */}
                  {/* <div>
                    <div className="flex items-center gap-3 mb-3">
                      <FaRulerCombined className="text-brand" size={18} />
                      <h3 className="text-sm font-semibold text-earth-700">Area Range</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-full">
                        <input
                          type="number"
                          placeholder="Min Area"
                          className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                          value={areaRange[0]}
                          onChange={(e) => setAreaRange([+e.target.value, areaRange[1]])}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-earth-400 text-xs">sq.ft</span>
                      </div>
                      
                      <span className="hidden sm:block text-brand">—</span>
                      
                      <div className="relative w-full">
                        <input
                          type="number"
                          placeholder="Max Area"
                          className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 "
                          value={areaRange[1]}
                          onChange={(e) => setAreaRange([areaRange[0], +e.target.value])}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-earth-400 text-xs">sq.ft</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-brand mt-2">
                      {formatArea(areaRange[0])} — {formatArea(areaRange[1])}
                    </p>
                  </div> */}
                </div>

                {/* Reset Filters Button */}
                <div className="flex justify-end mt-6">
                  <motion.button
                    onClick={resetFilters}
                    className="px-6 py-2 text-brand border border-earth-300 rounded-tl-lg rounded-br-lg hover:bg-earth-100 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-8"
        >
          <p className="text-brand text-center">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project, index) => (
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
            totalItems={filteredProjects.length}
            itemsPerPage={pageSize}
            currentPage={page}
            onPageChange={setPage}
            maxPageNumbers={5}
            showItemCount={true}
            showItemsPerPageSelect={true}
            onItemsPerPageChange={handlePageSizeChange}
            itemsPerPageOptions={[6, 12, 24, 48]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
