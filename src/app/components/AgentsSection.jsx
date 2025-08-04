import { useState, useEffect, useRef } from "react";
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Shield,
  Crown,
  Mail,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const AgentsSection = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAgent, setActiveAgent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/pf/agents?limit=8");
        const json = await res.json();
        
        if (json.success && json.data.length > 0) {
          setAgents(json.data);
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

  useEffect(() => {
    if (!isAutoPlaying || agents.length === 0) return;

    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, agents.length]);

  const nextAgent = () => {
    setActiveAgent((prev) => (prev + 1) % agents.length);
  };

  const prevAgent = () => {
    setActiveAgent((prev) => (prev - 1 + agents.length) % agents.length);
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = (whatsapp) => {
    window.open(`https://wa.me/${whatsapp.replace("+", "")}`, "_blank");
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, "_self");
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900 overflow-hidden py-20">
        <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading our elite agents...</p>
          </div>
        </div>
      </section>
    );
  }

  if (agents.length === 0) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900 overflow-hidden py-20">
        <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-xl">No agents available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentAgent = agents[activeAgent];

  // Calculate which agents to show in thumbnails based on active agent
  const getThumbnailAgents = () => {
    const totalAgents = agents.length;
    const thumbnailCount = 6;
    
    // Start from the current active agent
    let startIndex = activeAgent;
    
    // If we don't have enough agents after the active one, wrap around
    const thumbnailAgents = [];
    for (let i = 0; i < thumbnailCount && i < totalAgents; i++) {
      const index = (startIndex + i) % totalAgents;
      thumbnailAgents.push({ ...agents[index], originalIndex: index });
    }
    
    return thumbnailAgents;
  };

  const thumbnailAgents = getThumbnailAgents();

  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-20">
      {/* Background Elements with Earth Tones */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-earth-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-brand-hover/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent"></div>
            <Award className="text-brand" size={56} />
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent via-brand to-transparent"></div>
          </div>
          <h2 className="mb-8 text-white">
            Meet Our
            <span className="block bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
              Elite Team
            </span>
          </h2>
          <p className="text-xl text-earth-200 max-w-4xl mx-auto leading-relaxed">
            Connect with Dubai's most trusted real estate professionals who deliver exceptional results
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Side - Agent Thumbnails */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-4">
              {thumbnailAgents.map((agent, index) => (
                <div
                  key={`${agent.id}-${agent.originalIndex}`}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    agent.originalIndex === activeAgent 
                      ? 'scale-110 ring-4 ring-brand ring-opacity-60' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setActiveAgent(agent.originalIndex)}
                >
                  <div className="aspect-square  overflow-hidden bg-gradient-to-br from-brand/20 to-earth-600/20 backdrop-blur-sm border border-earth-300/20">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {agent.isSuperAgent && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                      <Crown size={12} className="text-black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Center - Main Agent Card */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div 
              className="relative mx-auto max-w-md"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Animated Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand via-brand-hover to-earth-600 blur opacity-75 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative bg-white 
               overflow-hidden shadow-2xl">
                {/* Agent Photo */}
                <div className="relative h-78 overflow-hidden">
                  <img
                    src={currentAgent.photo}
                    alt={currentAgent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {currentAgent.verification === 'verified' && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                        <Shield size={14} />
                        Verified
                      </div>
                    )}
                  </div>

                  {currentAgent.isSuperAgent && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
                      <Crown size={14} />
                      Super Agent
                    </div>
                  )}
                </div>

                {/* Agent Info */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentAgent.name}
                    </h3>
                    <p className="text-brand font-semibold text-lg mb-1">
                      {currentAgent.position}
                    </p>
                    <p className="text-gray-600">
                      {currentAgent.role}
                    </p>
                  </div>

                  {/* Stats */}
                  

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => handleCall(currentAgent.phone)}
                        className="bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand text-white  py-3 transition-all duration-300 hover:scale-105"
                      >
                        <Phone size={16} className="mr-2" />
                        Call
                      </Button>
                      <Button
                        onClick={() => handleWhatsApp(currentAgent.whatsapp)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white  py-3 transition-all duration-300 hover:scale-105"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleEmail(currentAgent.email)}
                      variant="outline"
                      className="w-full border-2 border-earth-300 hover:border-brand hover:bg-earth-50 py-3 transition-all duration-300"
                    >
                      <Mail size={16} className="mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation & Info */}
          <div className="lg:col-span-1 order-3 space-y-8">
            {/* Navigation Controls */}
            <div className="flex justify-center lg:justify-start gap-4">
              <Button
                onClick={prevAgent}
                variant="outline"
                size="icon"
                className="bg-earth-800/50 backdrop-blur-md border-earth-600/30 text-white hover:bg-brand/20 rounded-full w-14 h-14 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                onClick={nextAgent}
                variant="outline"
                size="icon"
                className="bg-earth-800/50 backdrop-blur-md border-earth-600/30 text-white hover:bg-brand/20 rounded-full w-14 h-14 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={24} />
              </Button>
            </div>

            {/* Agent Bio */}
            {currentAgent.bio && (
              <div className="bg-earth-800/30 backdrop-blur-md  p-6 border border-earth-600/30">
                < h5 className="text-white font-semibold mb-3">About</ h5>
                <p className="text-earth-200 text-lg leading-relaxed">
                  {currentAgent.bio.length > 150 
                    ? `${currentAgent.bio.substring(0, 120)}...` 
                    : currentAgent.bio
                  }
                </p>
                {currentAgent.bio.length > 120 && (
                  <button 
                    className="text-brand hover:text-brand-hover text-sm mt-2 underline transition-colors"
                    onClick={() => {/* Add modal or expand functionality */}}
                  >
                    Read More
                  </button>
                )}
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-earth-800/30 backdrop-blur-md p-6 border border-earth-600/30">
              < h5 className="text-white font-semibold mb-4">Quick Info</ h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-earth-200">
                  <Mail size={16} />
                  <span className="text-lg">{currentAgent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-earth-200">
                  <Phone size={16} />
                  <span className="text-lg">{currentAgent.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-16 gap-3">
          {agents.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveAgent(index)}
              className={`transition-all duration-300 ${
                index === activeAgent
                  ? "w-12 h-3 bg-gradient-to-r from-brand to-brand-hover rounded-full"
                  : "w-3 h-3 bg-earth-400/30 hover:bg-earth-400/50 rounded-full hover:scale-125"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
