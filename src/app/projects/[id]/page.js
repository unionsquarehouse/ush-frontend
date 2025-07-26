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
      <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-earth-200 flex items-center justify-center">
        <div className="text-center glass-card p-12">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand/20 border-t-brand mx-auto mb-6"></div>
            <SparklesIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand w-6 h-6" />
          </div>
          <p className="text-earth-700 font-montserrat">Loading luxury property details...</p>
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
  const location = data?.location;
  const compliance = data?.compliance;

  const profile = agentProfile?.publicProfile || {};
  console.log(profile,"profile");
  const agentName = profile.name || `Agent #${data?.assignedTo?.id}`;
  const agentPhoto = profile.imageVariants?.large?.default || null;
  const agentPosition = profile.position?.primary || "Luxury Property Consultant";
  const agentPhone = profile?.phone 
  const agentEmail = profile?.email 
  const agentLinkedIn = profile?.linkedinAddress

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-earth-50 to-earth-100">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-earth-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-hover rounded-xl flex items-center justify-center shadow-lg">
                  <FaCrown className="text-white text-lg" />
                </div>
                <span className="font-display text-xl font-semibold text-earth-800">Luxury Estates</span>
              </motion.div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {['Luxury Homes', 'Premium Rentals', 'Exclusive Projects', 'Elite Agents'].map((item, idx) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-earth-700 hover:text-brand transition-colors font-montserrat font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-brand-hover transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-earth-700 hover:text-brand transition-colors font-montserrat font-medium"
              >
                Sign in
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-brand to-brand-hover text-white px-6 py-2.5 rounded-xl font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                List Premium Property
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Premium Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-3 shadow-xl border border-earth-200/30 hover-lift"
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
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-earth-800 px-4 py-2 rounded-xl font-montserrat font-medium shadow-lg">
                    <CameraIcon className="inline w-4 h-4 mr-2" />
                    1 / {galleryImages.length}
                  </div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-earth-800 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
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
                        <div className="absolute inset-0 bg-earth-900/80 backdrop-blur-sm flex items-center justify-center text-white font-montserrat font-semibold">
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

            {/* Premium Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-8 shadow-xl border border-earth-200/30 hover-lift"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <DiamondIcon className="text-brand w-6 h-6" />
                    <span className="text-brand font-montserrat font-semibold text-sm uppercase tracking-wider">Premium Collection</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-earth-900 mb-4 leading-tight">{title}</h1>
                  <p className="text-earth-600 flex items-center font-montserrat text-lg">
                    <MapPinIcon className="mr-2 w-5 h-5" />
                    {location?.area?.name}, {location?.city?.name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-gradient-to-br from-earth-50 to-earth-100 border border-earth-200 px-6 py-4 rounded-2xl shadow-lg">
                    <div className="text-3xl font-display font-bold text-earth-900 mb-1">
                      AED {Number(price).toLocaleString()}
                    </div>
                    <div className="text-earth-600 font-montserrat">AED {Math.round(price / size).toLocaleString()} per sq ft</div>
                  </div>
                </div>
              </div>

              {/* Luxury Property Stats */}
              <div className="grid grid-cols-3 gap-6 py-8 border-t border-b border-earth-200/50">
                {[
                  { icon: FaBed, value: bedrooms, label: 'Bedrooms', color: 'text-brand' },
                  { icon: FaBath, value: bathrooms, label: 'Bathrooms', color: 'text-cyan-500' },
                  { icon: FaRuler, value: size, label: 'Square Feet', color: 'text-earth-600' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-white to-earth-50 border border-earth-200/50 p-4 rounded-2xl mb-3 group-hover:scale-105 transition-transform duration-300 shadow-md">
                      <stat.icon className={`${stat.color} text-2xl mx-auto mb-2`} />
                      <div className="font-display text-2xl font-bold text-earth-900">{stat.value}</div>
                    </div>
                    <span className="text-earth-600 font-montserrat font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Premium Description */}
              <div className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl font-semibold text-earth-900 flex items-center">
                      <SparklesIcon className="mr-3 text-brand w-6 h-6" />
                      Property Story
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                      <span className="text-sm text-earth-500 font-montserrat">Premium Details</span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-brand/10 to-transparent rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-earth-300/20 to-transparent rounded-full blur-lg"></div>
                    
                    <div className="relative bg-gradient-to-br from-white via-earth-50/30 to-earth-100/20 border border-earth-200/50 rounded-3xl p-8 shadow-lg backdrop-blur-sm">
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
                          <p className="text-earth-700 leading-relaxed font-montserrat text-lg font-light tracking-wide">
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
                              className="group flex items-center space-x-3 bg-gradient-to-r from-brand/10 to-brand-hover/10 hover:from-brand/20 hover:to-brand-hover/20 border border-brand/20 hover:border-brand/30 px-6 py-3 rounded-2xl transition-all duration-300"
                            >
                              <span className="font-montserrat font-medium text-brand group-hover:text-brand-hover">
                                {showFullDescription ? 'Show Less' : 'Read Full Story'}
                              </span>
                              <motion.div
                                animate={{ rotate: showFullDescription ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FaChevronDown className="text-brand group-hover:text-brand-hover w-4 h-4" />
                              </motion.div>
                            </motion.button>

                            <div className="flex items-center space-x-2 text-earth-500">
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

                  {/* Additional Info Cards */}
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
                      <div key={idx} className="bg-white/60 backdrop-blur-sm border border-earth-200/30 rounded-xl p-4 text-center hover:bg-white/80 transition-all duration-300">
                        <item.icon className="text-brand w-5 h-5 mx-auto mb-2" />
                        <div className="text-xs text-earth-500 font-montserrat mb-1">{item.label}</div>
                        <div className="text-sm font-semibold text-earth-800">{item.value}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Luxury Amenities */}
              {amenities && amenities.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display text-2xl font-semibold mb-6 text-earth-900 flex items-center">
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
                        className="bg-gradient-to-br from-white to-earth-50 border border-earth-200/50 p-4 rounded-xl hover:shadow-lg hover:border-brand/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <FaCheck className="text-white text-sm" />
                          </div>
                          <span className="capitalize font-montserrat font-medium text-earth-700 group-hover:text-earth-900">
                            {amenity.replace(/-/g, ' ')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Premium Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-8 shadow-xl border border-earth-200/30 hover-lift"
            >
              <h3 className="font-display text-2xl font-semibold mb-6 text-earth-900 flex items-center">
                <MapPinIcon className="mr-3 text-brand w-6 h-6" />
                Prime Location & Surroundings
              </h3>
              <div className="h-80 bg-gradient-to-br from-earth-50 to-earth-100 border border-earth-200/50 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-hover/5"></div>
                <div className="text-center z-10">
                  <MapPinIcon className="w-12 h-12 text-brand mx-auto mb-4" />
                  <p className="text-earth-600 font-montserrat text-lg">Interactive Luxury Location Map</p>
                  <p className="text-earth-500 font-montserrat text-sm mt-2">Premium neighborhood insights coming soon</p>
                </div>
              </div>
            </motion.div>

            {/* DLD Permit */}
            {compliance && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ProjectPermit compliance={compliance} />
              </motion.div>
            )}
          </div>

          {/* Premium Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Elite Agent Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-8 sticky top-24 shadow-xl border border-earth-200/30 hover-lift"
            >
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto bg-gradient-to-br from-brand to-brand-hover p-1 shadow-lg">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-earth-50">
                      {agentPhoto ? (
                        <img src={agentPhoto} alt={agentName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand text-2xl font-display font-bold">
                          {agentName.slice(0, 2)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-full flex items-center justify-center shadow-lg">
                    <FaCrown className="text-white text-sm" />
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-semibold text-earth-900 mb-2">{agentName}</h3>
                <p className="text-earth-600 font-montserrat mb-4">{agentPosition}</p>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                  <span className="text-earth-600 font-montserrat text-sm">5.0 (24 reviews)</span>
                </div>
                
                <div className="bg-gradient-to-br from-earth-50 to-white border border-earth-200/50 p-3 rounded-xl shadow-sm">
                  <p className="text-earth-700 font-montserrat text-sm">
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
                  className="w-full bg-gradient-to-r from-brand to-brand-hover text-white py-4 rounded-xl font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <PhoneIcon className="mr-2 w-5 h-5" />
                  Call {agentPhone}
                </motion.a>
                
                <motion.a
                  href={`mailto:${agentEmail || 'info@ushre.com'}?subject=Inquiry about ${title}&body=Hi, I'm interested in this property: ${title} (Ref: ${reference})`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-brand/30 text-brand py-4 rounded-xl font-montserrat font-semibold hover:border-brand/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
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
                  className="w-full bg-white border-2 border-green-300 text-green-700 py-4 rounded-xl font-montserrat font-semibold hover:border-green-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2 w-5 h-5" />
                  WhatsApp
                </motion.a>
              </div>

              <div className="mt-8 pt-6 border-t border-earth-200/50">
                <div className="bg-gradient-to-br from-earth-50 to-white border border-earth-200/50 p-4 rounded-xl mb-4 shadow-sm">
                  <p className="text-earth-600 font-montserrat text-sm mb-1">Reference ID</p>
                  <p className="font-display font-semibold text-earth-900">{reference}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border border-earth-200 text-earth-700 py-3 rounded-xl font-montserrat font-medium hover:text-brand hover:border-brand/30 hover:shadow-md transition-all duration-300 flex items-center justify-center"
                  >
                    <FaHeart className="mr-2" />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border border-earth-200 text-earth-700 py-3 rounded-xl font-montserrat font-medium hover:text-brand hover:border-brand/30 hover:shadow-md transition-all duration-300 flex items-center justify-center"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Premium Mortgage Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-6 shadow-xl border border-earth-200/30 hover-lift"
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-earth-900 flex items-center">
                <FaKey className="mr-3 text-brand w-5 h-5" />
                Luxury Financing
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-earth-700 mb-2">Property Investment</label>
                  <div className="bg-gradient-to-br from-earth-50 to-white border border-earth-200/50 rounded-xl px-4 py-3 shadow-sm">
                    <span className="font-display font-semibold text-earth-900">AED {Number(price).toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-earth-700 mb-2">Down Payment (%)</label>
                  <input 
                    type="number" 
                    defaultValue="25"
                    className="w-full bg-gradient-to-br text-black from-white to-earth-50 border border-earth-200/50 rounded-xl px-4 py-3 font-montserrat focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-earth-700 mb-2">Loan Term (Years)</label>
                  <select className="w-full text-black bg-gradient-to-br from-white to-earth-50 border border-earth-200/50 rounded-xl px-4 py-3 font-montserrat focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 shadow-sm">
                    <option>25</option>
                    <option>20</option>
                    <option>15</option>
                    <option>10</option>
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-brand to-brand-hover text-white py-3 rounded-xl font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Calculate Premium Financing
                </motion.button>
              </div>
            </motion.div>

            {/* Curated Similar Properties */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-6 shadow-xl border border-earth-200/30 hover-lift"
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-earth-900 flex items-center">
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
                    className="bg-gradient-to-br from-white to-earth-50 border border-earth-200/50 p-4 rounded-xl hover:shadow-lg hover:border-brand/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex space-x-4">
                      <div className="w-16 h-12 bg-gradient-to-br from-earth-200 to-earth-300 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                        <FaHome className="text-earth-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-montserrat font-semibold text-sm text-earth-900 group-hover:text-brand transition-colors">
                          Premium Estate {item}
                        </h4>
                        <p className="text-xs text-earth-600 font-montserrat mb-1">
                          {2 + item} bed • {2 + item} bath • {1200 + item * 200} sqft
                        </p>
                        <p className="text-sm font-display font-semibold text-earth-900">
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

      {/* Premium Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-earth-800 p-4 rounded-2xl z-10 hover:bg-white transition-all duration-300 shadow-lg"
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
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-earth-800 p-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg"
              >
                <FaChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-earth-800 p-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg"
              >
                <FaChevronRight size={24} />
              </motion.button>
              
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-earth-800 px-6 py-3 rounded-2xl font-montserrat shadow-lg">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
