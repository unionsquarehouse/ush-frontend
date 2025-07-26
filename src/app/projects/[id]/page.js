"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaTag, FaHome, FaStar, 
  FaSwimmingPool, FaCheck, FaExpand, FaTimes, FaPhone, FaEnvelope,
  FaCalendarAlt, FaWhatsapp, FaShare, FaHeart, FaEye, FaChevronLeft,
  FaChevronRight, FaPlay, FaBuilding, FaCar, FaTree, FaDumbbell,
  FaShieldAlt, FaWifi, FaSnowflake, FaCrown, FaGem, FaAward, FaMedal,
  FaKey, FaHandshake, FaVideo,
  FaChevronDown,
  FaClock
} from "react-icons/fa";
import { PhoneIcon, MailIcon, CalendarIcon, MapPinIcon, CameraIcon, SparklesIcon, DiamondIcon } from "lucide-react";
import ProjectPermit from "../../components/project/ProjectPermit";
import ProjectMap from "../../components/project/ProjectMap";


export default function PropertyFinderPage() {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [agentProfile, setAgentProfile] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Add this helper function to truncate description
  const truncateDescription = (text, maxLength = 200) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/pf/projects/${id}`);
        const json = await res.json();
        if (json.success) {
          setProject(json.data);
          const images = json.data?.data?.media?.images || [];
          const urls = images.map((img) => img.original?.url);
          setGalleryImages(urls);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (!project?.data?.assignedTo?.id) return;

    async function fetchAgentProfile() {
      try {
        const res = await fetch(`/api/pf/projects/get-user-profile?publicProfileId=${project.data.assignedTo.id}`);
        const json = await res.json();
        if (json.data.data.length > 0) {
          setAgentProfile(json.data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch agent profile:", err);
      }
    }

    fetchAgentProfile();
  }, [project]);

  if (!project) {
    return (
      
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #D2CEB9 0%, #E6E4D8 50%, #D2CEB9 100%)'}}>
        <div className="text-center bg-white/30 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-3xl p-12" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'}}>
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand/20 border-t-brand mx-auto mb-6"></div>
            <SparklesIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand w-6 h-6" />
          </div>
          <p className="text-black font-montserrat font-medium">Loading luxury property details...</p>
        </div>
      </div>
    );
  }

  const { data } = project;
  const title = data?.title?.en;
  const price = data?.price?.amounts?.sale;
  const size = data?.size;
  const bedrooms = data?.bedrooms;
  const bathrooms = data?.bathrooms;
  const description = data?.description?.en;
  const amenities = data?.amenities;
  const reference = data?.reference;
  const location = project?.location;
  const compliance = data?.compliance;

  const profile = agentProfile?.publicProfile || {};
  console.log(project,"project");
  const agentId = typeof data?.assignedTo?.id === 'object' ? data?.assignedTo?.id?.id : data?.assignedTo?.id;
  const agentName = profile.name || `Agent #${agentId || 'Unknown'}`;
  const agentPhoto = profile.imageVariants?.large?.default || null;
  const agentPosition = profile.position?.primary || "Luxury Property Consultant";
  const agentPhone = profile?.phone 
  const agentEmail = profile?.email 
  const agentLinkedIn = profile?.linkedinAddress

  // Fix price rendering - extract the actual price value
  const priceValue = price?.value || price?.amount || 'Price on request';
  const currency = price?.currency || 'AED';

  // Fix location rendering - extract location string
  const locationString = location?.name || location?.address || location?.area || 'Location not specified';

  return (
    <div style={{background: 'linear-gradient(135deg, #D2CEB9 0%, #E6E4D8 50%, #D2CEB9 100%)'}}>
      {/* Premium Header with White Glassmorphism */}
   
      <div className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Premium Image Gallery with White Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/30 backdrop-blur-3xl rounded-tl-[2rem] rounded-br-[2rem] p-3 border border-white/50 hover-lift"
              style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)'}}
            >
              <div className="grid grid-cols-2 gap-3 h-[500px]">
                {/* Main Image */}
                <motion.div 
                  className="relative cursor-pointer group overflow-hidden rounded-tl-[1.5rem] rounded-bl-[1.5rem]"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsFullscreen(true)}
                >
                  <img 
                    src={galleryImages[0]} 
                    alt="Luxury Property" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 bg-white/40 backdrop-blur-2xl border border-white/60 text-black px-4 py-2 rounded-xl font-montserrat font-medium" style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}>
                    <CameraIcon className="inline w-4 h-4 mr-2" />
                    1 / {galleryImages.length}
                  </div>
                  <div className="absolute top-6 right-6 bg-white/40 backdrop-blur-2xl border border-white/60 text-black p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}>
                    <FaExpand className="w-4 h-4" />
                  </div>
                </motion.div>
                
                {/* Thumbnail Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {galleryImages.slice(1, 5).map((img, idx) => (
                    <motion.div 
                      key={idx} 
                      className="relative cursor-pointer group overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setIsFullscreen(true)}
                    >
                      <img src={img} alt={`Luxury View ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {idx === 3 && galleryImages.length > 5 && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-brand font-montserrat font-semibold">
                          <div className="text-center">
                            <SparklesIcon className="w-6 h-6 mx-auto mb-2" />
                            +{galleryImages.length - 4} more
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Premium Property Details with White Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/30 backdrop-blur-3xl rounded-tl-[2rem] rounded-br-[2rem] p-8 border border-white/50 hover-lift"
              style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)'}}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <DiamondIcon className="text-brand w-6 h-6" />
                    <span className="text-brand font-montserrat font-semibold text-sm uppercase tracking-wider">Premium Collection</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-black mb-4 leading-tight">{title}</h1>
                  <p className="text-black/80 flex items-center font-montserrat text-lg">
                    <MapPinIcon className="mr-2 w-5 h-5" />
                    {locationString}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-white/40 backdrop-blur-2xl border border-white/60 px-6 py-4 rounded-2xl" style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}>
                    <div className="text-3xl font-display font-bold text-black mb-1">
                      {currency} {Number(priceValue).toLocaleString()}
                    </div>
                    <div className="text-black/70 font-montserrat">{currency} {Math.round(priceValue / size).toLocaleString()} per sq ft</div>
                  </div>
                </div>
              </div>

              {/* Luxury Property Stats with White Glassmorphism */}
              <div className="grid grid-cols-3 gap-6 py-8 border-t border-b border-white/40">
                {[
                  { icon: FaBed, value: bedrooms, label: 'Bedrooms', color: 'text-brand' },
                  { icon: FaBath, value: bathrooms, label: 'Bathrooms', color: 'text-cyan-400' },
                  { icon: FaRuler, value: size, label: 'Square Feet', color: 'text-purple-400' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="text-center group"
                  >
                    <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-4 rounded-2xl mb-3 group-hover:scale-105 group-hover:bg-white/50 transition-all duration-300" style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}>
                      <stat.icon className={`${stat.color} text-2xl mx-auto mb-2`} />
                      <div className="font-display text-2xl font-bold text-black">{stat.value}</div>
                    </div>
                    <span className="text-black/80 font-montserrat font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Premium Description with Enhanced Glassmorphism */}
              <div className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl font-semibold text-black flex items-center">
                      <SparklesIcon className="mr-3 text-brand w-6 h-6" />
                      Property Story
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                      <span className="text-sm text-black/70 font-montserrat">Premium Details</span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-brand/20 to-transparent rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-lg"></div>
                    
                    <div className="relative bg-white/35 backdrop-blur-3xl border border-white/50 rounded-3xl p-8" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'}}>
                      {/* Quote Icon */}
                      <div className="absolute top-6 left-6 text-brand">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>

                      <div className="pl-12">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-black leading-relaxed font-montserrat text-lg font-light tracking-wide">
                            {showFullDescription ? description : truncateDescription(description, 180)}
                          </p>
                        </motion.div>

                        {description && description.length > 180 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 flex items-center justify-between"
                          >
                            <motion.button
                              onClick={() => setShowFullDescription(!showFullDescription)}
                              whileHover={{ scale: 1.05, x: 5 }}
                              whileTap={{ scale: 0.95 }}
                              className="group flex items-center space-x-3 bg-white/40 backdrop-blur-2xl hover:bg-white/50 border border-white/60 hover:border-brand/30 px-6 py-3 rounded-2xl transition-all duration-300"
                              style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}
                            >
                              <span className="font-montserrat font-medium text-black group-hover:text-brand">
                                {showFullDescription ? 'Show Less' : 'Read Full Story'}
                              </span>
                              <motion.div
                                animate={{ rotate: showFullDescription ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FaChevronDown className="text-black group-hover:text-brand w-4 h-4" />
                              </motion.div>
                            </motion.button>

                            <div className="flex items-center space-x-2 text-black/70">
                              <FaClock className="w-4 h-4" />
                              <span className="text-sm font-montserrat">2 min read</span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Decorative Bottom Border */}
                      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"></div>
                    </div>
                  </div>

                  {/* Additional Info Cards with Glassmorphism */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                  >
                    {[
                      { icon: FaHome, label: 'Property Type', value: 'Luxury Villa' },
                      { icon: FaCalendarAlt, label: 'Year Built', value: '2024' },
                      { icon: FaAward, label: 'Rating', value: '5 Star Premium' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-xl p-4 text-center hover:bg-white/50 hover:scale-105 transition-all duration-300" style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}>
                        <item.icon className="text-brand w-5 h-5 mx-auto mb-2" />
                        <div className="text-xs text-black/70 font-montserrat mb-1">{item.label}</div>
                        <div className="text-sm font-semibold text-black">{item.value}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Luxury Amenities with White Glassmorphism */}
              {amenities && amenities.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display text-2xl font-semibold mb-6 text-black flex items-center">
                    <FaCrown className="mr-3 text-brand w-6 h-6" />
                    Premium Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="bg-white/40 backdrop-blur-2xl border border-white/60 p-4 rounded-xl hover:bg-white/50 hover:scale-105 hover:border-brand/30 transition-all duration-300 group"
                        style={{boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'}}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm backdrop-blur-sm">
                            <FaCheck className="text-white text-sm" />
                          </div>
                          <span className="capitalize font-montserrat font-medium text-black group-hover:text-brand">
                            {amenity.replace(/-/g, ' ')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Premium Map Section with White Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/30 backdrop-blur-3xl rounded-tl-[2rem] rounded-br-[2rem] p-8 border border-white/50 hover-lift"
              style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)'}}
            >
              <ProjectMap location={location} />
            </motion.div>

            {/* DLD Permit with Glassmorphism */}
            {compliance && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-2xl rounded-tl-[2rem] rounded-br-[2rem] shadow-2xl border border-white/20"
              >
                <ProjectPermit compliance={compliance} />
              </motion.div>
            )}
          </div>

          {/* Premium Sidebar with Enhanced Glassmorphism */}
          <div className="lg:col-span-1 space-y-6">
            {/* Elite Agent Card with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-2xl rounded-tl-[2rem] rounded-br-[2rem] p-8 sticky top-24 shadow-2xl border border-white/20 hover-lift"
            >
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto bg-gradient-to-br from-brand to-brand-hover p-1 shadow-lg backdrop-blur-sm">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                      {agentPhoto ? (
                        <img src={agentPhoto} alt={agentName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand text-2xl font-display font-bold">
                          {agentName.slice(0, 2)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <FaCrown className="text-white text-sm" />
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-semibold text-brand mb-2">{agentName}</h3>
                <p className="text-brand/70 font-montserrat mb-4">{agentPosition}</p>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                  <span className="text-brand/70 font-montserrat text-sm">5.0 (24 reviews)</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-lg">
                  <p className="text-brand/80 font-montserrat text-sm">
                    <FaAward className="inline mr-2 text-brand" />
                    Elite Luxury Property Specialist
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.a
                  href={`tel:${agentPhone}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-brand to-brand-hover text-white py-4 rounded-xl font-montserrat font-semibold shadow-xl hover:shadow-2xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
                >
                  <PhoneIcon className="mr-2 w-5 h-5" />
                  Call {agentPhone}
                </motion.a>
                
                <motion.a
                  href={`mailto:${agentEmail || 'info@ushre.com'}?subject=Inquiry about ${title}&body=Hi, I'm interested in this property: ${title} (Ref: ${reference})`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/30 text-brand py-4 rounded-xl font-montserrat font-semibold hover:bg-white/20 hover:border-brand/50 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                >
                  <MailIcon className="mr-2 w-5 h-5" />
                  Send Email
                </motion.a>
                
                <motion.a
                  href={`https://wa.me/${agentPhone}?text=Hi, I'm interested in ${title} (Ref: ${reference}). Could you provide more details?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 backdrop-blur-xl border-2 border-green-300/50 text-green-300 py-4 rounded-xl font-montserrat font-semibold hover:bg-white/20 hover:border-green-400/70 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2 w-5 h-5" />
                  WhatsApp
                </motion.a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl mb-4 shadow-lg">
                  <p className="text-brand/70 font-montserrat text-sm mb-1">Reference ID</p>
                  <p className="font-display font-semibold text-brand">{reference}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 text-brand py-3 rounded-xl font-montserrat font-medium hover:bg-white/20 hover:text-brand hover:border-brand/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <FaHeart className="mr-2" />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 text-brand py-3 rounded-xl font-montserrat font-medium hover:bg-white/20 hover:text-brand hover:border-brand/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Premium Mortgage Calculator with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-2xl rounded-tl-[2rem] rounded-br-[2rem] p-6 shadow-2xl border border-white/20 hover-lift"
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-brand flex items-center">
                <FaKey className="mr-3 text-brand w-5 h-5" />
                Luxury Financing
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brand/70 mb-2">Property Investment</label>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-lg">
                    <span className="font-display font-semibold text-brand">{currency} {Number(priceValue).toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brand/70 mb-2">Down Payment (%)</label>
                  <input 
                    type="number" 
                    defaultValue="25"
                    className="w-full bg-white/10 backdrop-blur-xl text-brand placeholder-white/50 border border-white/20 rounded-xl px-4 py-3 font-montserrat focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 focus:bg-white/20 transition-all duration-300 shadow-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-brand/70 mb-2">Loan Term (Years)</label>
                  <select className="w-full text-brand bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 font-montserrat focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 focus:bg-white/20 transition-all duration-300 shadow-lg">
                    <option className="bg-slate-800 text-brand">25</option>
                    <option className="bg-slate-800 text-brand">20</option>
                    <option className="bg-slate-800 text-brand">15</option>
                    <option className="bg-slate-800 text-brand">10</option>
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-brand to-brand-hover text-white py-3 rounded-xl font-montserrat font-semibold shadow-xl hover:shadow-2xl backdrop-blur-sm transition-all duration-300"
                >
                  Calculate Premium Financing
                </motion.button>
              </div>
            </motion.div>

            {/* Curated Similar Properties with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-2xl rounded-tl-[2rem] rounded-br-[2rem] p-6 shadow-2xl border border-white/20 hover-lift"
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-brand flex items-center">
                <FaGem className="mr-3 text-brand w-5 h-5" />
                Curated Collection
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + item * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl hover:bg-white/20 hover:shadow-2xl hover:border-brand/30 hover:scale-105 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex space-x-4">
                      <div className="w-16 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg border border-white/20">
                        <FaHome className="text-brand/70 group-hover:text-brand" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-montserrat font-semibold text-sm text-brand group-hover:text-brand transition-colors">
                          Premium Estate {item}
                        </h4>
                        <p className="text-xs text-brand/60 font-montserrat mb-1">
                          {2 + item} bed • {2 + item} bath • {1200 + item * 200} sqft
                        </p>
                        <p className="text-sm font-display font-semibold text-brand">
                          AED {(1500000 + item * 500000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Premium Fullscreen Gallery Modal with Enhanced Glassmorphism */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-3xl flex items-center justify-center"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl border border-white/30 text-white p-4 rounded-2xl z-10 hover:bg-white/30 transition-all duration-300 shadow-2xl"
            >
              <FaTimes size={24} />
            </motion.button>
            
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={galleryImages[selectedImage]}
                alt="Luxury Fullscreen"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
              
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : galleryImages.length - 1)}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-xl border border-white/30 text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-2xl"
              >
                <FaChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-xl border border-white/30 text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-2xl"
              >
                <FaChevronRight size={24} />
              </motion.button>
              
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-3 rounded-2xl font-montserrat shadow-2xl">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}