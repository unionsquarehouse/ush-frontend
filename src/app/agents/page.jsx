

"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Star, Award, Mail } from "lucide-react";
import { FaSearch, FaSliders, FaSlidersH } from "react-icons/fa";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Pagination from "../components/ui/Pagination";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [experienceRange, setExperienceRange] = useState([0, 15]);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const [specialties, setSpecialties] = useState([]);

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/pf/agents?limit=50");
        const json = await res.json();
        
        if (json.success && json.data.length > 0) {
          setAgents(json.data);
          // Extract unique positions for filter options
          const uniqueSpecialties = [...new Set(json.data.map(agent => agent.position))].sort();
          setSpecialties(uniqueSpecialties);
        } else {
          console.error("Failed to fetch agents:", json.error);
        }
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    return (
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty === "" || agent.position === selectedSpecialty)
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
    setPage(1);
  };

  if (loading) {
    return (
      <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
        <div className="container mx-auto px-6 md:px-0 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-earth-600 text-xl">Loading our elite agents...</p>
          </div>
        </div>
      </section>
    );
  }

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Specialty Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-earth-700 mb-3">Position</h3>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm text-brand rounded-tl-xl rounded-br-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200"
                  >
                    <option value="">All Positions</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
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

        {/* Professional Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {paginatedAgents.map((agent) => (
            <Card
              key={agent.id}
              className="group bg-white border border-earth-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                {/* Agent Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {agent.verification === 'verified' && (
                      <div className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Verified
                      </div>
                    )}
                    {agent.isSuperAgent && (
                      <div className="bg-brand text-white px-2 py-1 rounded-md text-xs font-semibold">
                        Elite Agent
                      </div>
                    )}
                  </div>
                </div>

                {/* Agent Information */}
                <div className="p-6 space-y-4">
                  {/* Name and Title */}
                  <div className="text-center border-b border-earth-100 pb-4">
                    <h3 className="text-xl font-bold text-earth-800 mb-1">{agent.name}</h3>
                    <p className="text-brand font-semibold text-sm">{agent.position}</p>
                    {agent.role && (
                      <p className="text-earth-600 text-xs mt-1">{agent.role}</p>
                    )}
                  </div>

                  {/* Professional Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-earth-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-earth-800">
                        {agent.verification === 'verified' ? 'Verified' : 'Pending'}
                      </div>
                      <div className="text-earth-600 text-xs uppercase tracking-wide">Status</div>
                    </div>
                    <div className="bg-brand/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-earth-800">
                        {agent.compliances?.length || 0}
                      </div>
                      <div className="text-earth-600 text-xs uppercase tracking-wide">Licenses</div>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  {agent.bio && (
                    <div className="text-earth-600 text-sm leading-relaxed">
                      {agent.bio.length > 80 
                        ? `${agent.bio.substring(0, 80)}...` 
                        : agent.bio
                      }
                    </div>
                  )}

                  {/* Contact Actions */}
                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleCall(agent.phone)}
                        variant="outline"
                        size="sm"
                        className="border-earth-300 hover:bg-earth-50 text-earth-700 font-medium"
                      >
                        <Phone size={14} className="mr-2" />
                        Call
                      </Button>
                      <Button
                        onClick={() => handleWhatsApp(agent.whatsapp)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium"
                      >
                        <MessageCircle size={14} className="mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleEmail(agent.email)}
                      variant="outline"
                      size="sm"
                      className="w-full border-brand text-brand hover:bg-brand hover:text-white font-medium transition-colors"
                    >
                      <Mail size={14} className="mr-2" />
                      Send Email
                    </Button>
                  </div>
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
          itemsPerPageOptions={[8, 16, 24, 32]}
        />
      </div>
    </section>
  );
}
