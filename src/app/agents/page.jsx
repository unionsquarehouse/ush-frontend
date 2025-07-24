

"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Star, Award, Mail } from "lucide-react";
import { FaSearch, FaSliders, FaSlidersH } from "react-icons/fa";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Pagination from "../components/ui/Pagination";

const agents = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    phone: "+971501234567",
    email: "john@ushre.com",
    whatsapp: "+971501234567",
    specialty: "Luxury Properties",
    experience: "8 Years",
    experienceYears: 8,
    sales: "250+ Properties",
    salesCount: 250,
    rating: 4.7,
    color: "from-earth-600 to-earth-700",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    phone: "+971507654321",
    email: "jane@ushre.com",
    whatsapp: "+971507654321",
    specialty: "Commercial Real Estate",
    experience: "10 Years",
    experienceYears: 10,
    sales: "300+ Properties",
    salesCount: 300,
    rating: 4.8,
    color: "from-brand to-brand-hover",
  },
  {
    id: 3,
    name: "Ahmed Al-Mansouri",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    phone: "+971507654321",
    email: "ahmed@ushre.com",
    whatsapp: "+971507654321",
    specialty: "Commercial Real Estate",
    experience: "12 Years",
    experienceYears: 12,
    sales: "400+ Properties",
    salesCount: 400,
    rating: 4.8,
    color: "from-earth-700 to-earth-800",
  },
  {
    id: 4,
    name: "Fatima Al-Rashid",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    phone: "+971509876543",
    email: "fatima@ushre.com",
    whatsapp: "+971509876543",
    specialty: "Residential Villas",
    experience: "6 Years",
    experienceYears: 6,
    sales: "180+ Properties",
    salesCount: 180,
    rating: 4.9,
    color: "from-earth-500 to-earth-600",
  },
  {
    id: 5,
    name: "Omar Al-Khalili",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    phone: "+971502468135",
    email: "omar@ushre.com",
    whatsapp: "+971502468135",
    specialty: "Investment Properties",
    experience: "10 Years",
    experienceYears: 10,
    sales: "320+ Properties",
    salesCount: 320,
    rating: 4.7,
    color: "from-earth-800 to-earth-900",
  },
  {
    id: 6,
    name: "Layla Al-Hashemi",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    phone: "+971503691470",
    email: "layla@ushre.com",
    whatsapp: "+971503691470",
    specialty: "Waterfront Properties",
    experience: "7 Years",
    experienceYears: 7,
    sales: "200+ Properties",
    salesCount: 200,
    rating: 4.8,
    color: "from-brand-hover to-earth-600",
  },
];

export default function AgentsPage() {
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [experienceRange, setExperienceRange] = useState([0, 15]);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const uniqueSpecialties = [...new Set(agents.map(agent => agent.specialty))].sort();
    setSpecialties(uniqueSpecialties);
  }, []);

  const filteredAgents = agents.filter((agent) => {
    return (
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty === "" || agent.specialty === selectedSpecialty) &&
      agent.experienceYears >= experienceRange[0] &&
      agent.experienceYears <= experienceRange[1] &&
      agent.rating >= minRating
    );
  });

  const paginatedAgents = filteredAgents.slice((page - 1) * pageSize, page * pageSize);

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = (whatsapp) => {
    window.open(`https://wa.me/${whatsapp.replace("+", "")}`, "_blank");
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, "_self");
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
    setExperienceRange([0, 15]);
    setMinRating(0);
    setPage(1);
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
      <div className="container mx-auto px-6 md:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-brand"></div>
            <Award className="text-brand" size={40} />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-brand"></div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-earth-800 to-earth-600 bg-clip-text text-transparent">
            Meet Our Elite
            <span className="block text-brand">Real Estate Agents</span>
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Our exceptional team of certified professionals dedicated to making your property dreams a reality
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand">
                <FaSearch size={18} />
              </div>
              <input
                type="text"
                placeholder="Search agents by name..."
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
              <FaSlidersH />
              <span>Filters</span>
            </button>
          </div>

          {/* Expandable Filters Section */}
          {showFilters && (
            <div className="pt-6 px-2 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Specialty Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Specialty</h3>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                {/* Experience Range */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Experience (Years)</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      value={experienceRange[0]}
                      onChange={(e) => setExperienceRange([+e.target.value, experienceRange[1]])}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                      value={experienceRange[1]}
                      onChange={(e) => setExperienceRange([experienceRange[0], +e.target.value])}
                    />
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Minimum Rating</h3>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(+e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.0}>4.0+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4.8}>4.8+ Stars</option>
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
        </div>

     

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {paginatedAgents.map((agent) => (
            <Card
              key={agent.id}
              className="relative rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden group cursor-pointer transition-all duration-500 border-0 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:scale-105"
              style={{
                backdropFilter: 'blur(16px)',
                boxShadow: `
                  0 8px 32px 0 rgba(31, 38, 135, 0.2),
                  0 16px 48px -8px rgba(0, 0, 0, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
            >
              {/* Glassmorphism overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none"></div>
              <div className="absolute inset-[1px] rounded-tl-[2rem] rounded-br-[2rem] bg-gradient-to-br from-white/20 to-white/5 pointer-events-none"></div>
              
              {/* Floating shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-lg -z-10 opacity-30 group-hover:opacity-50 transition-opacity"></div>

              <CardContent className="p-0 h-full relative">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                {/* Agent Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-black font-semibold">{agent.rating}</span>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-earth-800">{agent.name}</h3>
                    <p className="text-brand font-medium">{agent.specialty}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-earth-100/50 rounded-lg p-2 text-center backdrop-blur-sm">
                      <div className="font-semibold text-earth-800">{agent.experience}</div>
                      <div className="text-earth-600">Experience</div>
                    </div>
                    <div className="bg-earth-100/50 rounded-lg p-2 text-center backdrop-blur-sm">
                      <div className="font-semibold text-earth-800">{agent.sales}</div>
                      <div className="text-earth-600">Sold</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCall(agent.phone)}
                      size="sm"
                      variant="outline"
                      className="flex-1 group/btn hover:bg-brand hover:text-white transition-colors duration-300 border-earth-200"
                    >
                      <Phone size={16} className="mr-2 group-hover/btn:animate-bounce" />
                      Call
                    </Button>
                    <Button
                      onClick={() => handleWhatsApp(agent.whatsapp)}
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white group/btn transition-colors duration-300"
                    >
                      <MessageCircle size={16} className="mr-2 group-hover/btn:animate-bounce" />
                      WhatsApp
                    </Button>
                  </div>

                  <Button
                    onClick={() => handleEmail(agent.email)}
                    size="sm"
                    variant="outline"
                    className="w-full group/btn hover:bg-earth-600 hover:text-white transition-colors duration-300 border-earth-200"
                  >
                    <Mail size={16} className="mr-2 group-hover/btn:animate-bounce" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={filteredAgents.length}
          itemsPerPage={pageSize}
          currentPage={page}
          onPageChange={setPage}
          maxPageNumbers={5}
          showItemCount={true}
          showItemsPerPageSelect={true}
          onItemsPerPageChange={handlePageSizeChange}
          itemsPerPageOptions={[6, 12, 18, 24]}
        />
      </div>
    </section>
  );
}
