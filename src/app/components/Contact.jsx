"use client";

import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaCalendarAlt,
  FaGift,
  FaKey,
  FaStar,
  FaCompass,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // State for property carousel
  const [activeProperty, setActiveProperty] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // State for form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    property: "",
  });
  const [formProgress, setFormProgress] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showReward, setShowReward] = useState(false);

  // State for modals
  const [showCallModal, setShowCallModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showScheduleConfirmation, setShowScheduleConfirmation] =
    useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleFormSubmitted, setScheduleFormSubmitted] = useState(false);

  // Form theme
  const [formTheme, setFormTheme] = useState("beach-luxury");
  const [formAnimation, setFormAnimation] = useState("wave");
  const [progressOpacity, setProgressOpacity] = useState(0.7);
  const [progressScale, setProgressScale] = useState(1);

  // Update form state when property changes
  useEffect(() => {
    if (properties[activeProperty]) {
      setFormState((prev) => ({
        ...prev,
        property: properties[activeProperty].name,
      }));
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Calculate form progress
  useEffect(() => {
    const { name, email, phone, message } = formState;
    let progress = 0;

    if (name) progress += 25;
    if (email) progress += 25;
    if (phone) progress += 25;
    if (message) progress += 25;

    setFormProgress(progress);

    // Animate progress bar
    if (progress >= 75) {
      setProgressOpacity(1);
      setProgressScale(1.05);
    } else {
      setProgressOpacity(0.7);
      setProgressScale(1);
    }
  }, [formState]);

  // Properties carousel with immersive 3D experiences
  const properties = [
    {
      name: "Signature Palm Sanctuary",
      tagline: "Beachfront Luxury Living",
      price: "AED 15.5M",
      image: "/assets/properties/signature-villas.jpg",
      location: "Palm Jumeirah, Dubai",
      features: ["Private Beach Access", "Infinity Pool", "Smart Home System"],
      experience: "palm-sanctuary",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34366.79184979789!2d55.10653171981538!3d25.123381543907545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1529c2653b15%3A0x3dcabcae764a3e16!2sPalm%20Jumeirah!5e0!3m2!1sen!2sae!4v1751871491171!5m2!1sen!2sae",
      phone: "+971 50 123 4567",
      agent: "Sarah Al Mansoori",
      // Add interactive elements
      virtualTour: true,
      timelapseView: true,
      interiorStyles: ["Modern", "Classic", "Arabic"],
      formTheme: "beach-luxury",
      formAnimation: "wave",
      formReward: "exclusive-tour",
    },
    {
      name: "Downtown Penthouse",
      price: "AED 8.2M",
      image: "/assets/properties/downtown-penthouse.jpg",
      location: "Downtown Dubai",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14439.802950726855!2d55.2721253!3d25.1953053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097f991e80!2sDowntown%20Dubai!5e0!3m2!1sen!2sae!4v1656869056231!5m2!1sen!2sae",
      phone: "+971 50 765 4321",
      agent: "Mohammed Al Hashimi",
    },
    {
      name: "Emirates Hills Mansion",
      price: "AED 24M",
      image: "/assets/properties/emirates-hills-manison.jpg",
      location: "Emirates Hills, Dubai",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.352892051367!2d55.1614253!3d25.2253053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5a8b7a4c69%3A0x7c4b5a5d7c889172!2sEmirates%20Hills!5e0!3m2!1sen!2sae!4v1656869156231!5m2!1sen!2sae",
      phone: "+971 50 987 6543",
      agent: "Ahmed Al Falasi",
    },
    {
      name: "General Inquiry",
      price: "Various Properties",
      image: "/assets/hero-bg4.jpg",
      location: "Dubai, UAE",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115413.53538108172!2d55.1703971!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1656869256231!5m2!1sen!2sae",
      phone: "+971 4 458 9090",
      agent: "Our Team",
    },
  ];

  useEffect(() => {
    // Don't start the interval if any modal is open or form is submitted
    if (showCallModal || showLocationModal || showMap || formSubmitted) return;

    // Clear any existing interval
    if (carouselInterval.current) {
      clearInterval(carouselInterval.current);
    }

    // Set new interval
    carouselInterval.current = setInterval(() => {
      setActiveProperty((prev) => (prev + 1) % properties.length);
    }, 5000);

    // Cleanup function
    return () => {
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current);
        carouselInterval.current = null;
      }
    };
  }, [
    properties.length,
    showCallModal,
    showLocationModal,
    showMap,
    formSubmitted,
  ]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Enhanced form submission with reward
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setFormSubmitted(true);

    // Stop the carousel from changing when form is submitted
    if (carouselInterval.current) {
      clearInterval(carouselInterval.current);
      carouselInterval.current = null;
    }

    // Trigger confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Show reward after short delay
    setTimeout(() => {
      setShowReward(true);
    }, 1000);

    // Reset form after delay and restart carousel
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
        property: properties[activeProperty].name,
      });
      setFormSubmitted(false);
      setShowReward(false);

      // Restart the carousel
      carouselInterval.current = setInterval(() => {
        setActiveProperty((prev) => (prev + 1) % properties.length);
      }, 5000);
    }, 6000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Add a ref to store the carousel interval
  const carouselInterval = useRef(null);

  const handlePropertyChange = (e) => {
    const selectedProperty = e.target.value;
    setFormState({
      ...formState,
      property: selectedProperty,
    });

    // Find the index of the selected property and update the carousel
    const index = properties.findIndex((p) => p.name === selectedProperty);
    if (index !== -1) {
      setActiveProperty(index);

      // Clear any existing interval to prevent auto-changing
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current);
        carouselInterval.current = null;
      }
    }
  };

  const handleCallHotspot = () => {
    setShowCallModal(true);
  };

  const handleLocationHotspot = () => {
    setShowLocationModal(true);
  };

  const closeModals = () => {
    setShowCallModal(false);
    setShowLocationModal(false);
    setShowMap(false);
    setShowScheduleForm(false);
    setScheduleFormSubmitted(false);

    // Reset the slideshow timer by updating the active property
    setActiveProperty(activeProperty);
  };

  const handleScheduleLater = () => {
    setShowScheduleForm(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();

    // Log the scheduled date and time (you can replace this with your preferred method to receive the data)
    console.log("Viewing scheduled for:", {
      property: properties[activeProperty].name,
      date: scheduleDate,
      time: scheduleTime,
    });

    // You can add your email/notification logic here
    // For example, send this data to your backend API

    setScheduleFormSubmitted(true);

    // Automatically close the confirmation after 3 seconds
    setTimeout(() => {
      closeModals();
      // Reset the form
      setShowScheduleForm(false);
      setScheduleFormSubmitted(false);
      setScheduleDate("");
      setScheduleTime("");
    }, 3000);
  };

  const CallModal = ({ property, onClose, onSchedule, onScheduleSubmit }) => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-500 hover:text-earth-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {!showScheduleForm && !scheduleFormSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-earth-700 text-xl" />
              </div>
              <h3 className="text-2xl font-medium text-earth-800">
                Contact Agent
              </h3>
              <p className="text-earth-600 mt-2">
                Schedule a viewing for {property.name}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-3 bg-earth-50 rounded-lg">
                <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center mr-4">
                  <FaUser className="text-earth-600" />
                </div>
                <div>
                  <p className="text-sm text-earth-500">Agent</p>
                  <p className="font-medium text-earth-800">
                    {property.agent || "Sarah Al Mansoori"}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-earth-50 rounded-lg">
                <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center mr-4">
                  <FaPhone className="text-earth-600" />
                </div>
                <div>
                  <p className="text-sm text-earth-500">Phone</p>
                  <p className="font-medium text-earth-800">
                    {property.phone || "+971 50 123 4567"}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${property.phone || "+97150123456"}`}
                className="block w-full bg-earth-700 hover:bg-earth-800 text-white text-center py-3 rounded-lg font-medium transition-colors duration-300 mt-6"
              >
                Call Now
              </a>

              <button
                onClick={onSchedule}
                className="block w-full bg-earth-100 hover:bg-earth-200 text-earth-800 text-center py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Schedule Later
              </button>
            </div>
          </>
        ) : scheduleFormSubmitted ? (
          <div className="text-center py-8">
            <motion.div
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-medium text-earth-800 mb-2">
              Thank You!
            </h3>
            <p className="text-earth-600 mb-2">
              Your viewing has been scheduled for:
            </p>
            <p className="text-earth-800 font-medium">
              {scheduleDate} at {scheduleTime}
            </p>
          </div>
        ) : (
          <div className="py-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-earth-700 text-xl" />
              </div>
              <h3 className="text-2xl font-medium text-earth-800">
                Schedule Viewing
              </h3>
              <p className="text-earth-600 mt-2">
                Select your preferred date and time
              </p>
            </div>

            <form onSubmit={onScheduleSubmit} className="space-y-4 text-black">
              <div>
                <label
                  htmlFor="date"
                  className="block text-earth-700 mb-2 font-medium"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full p-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-earth-700 mb-2 font-medium"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full p-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-earth-700 hover:bg-earth-800 text-white text-center py-3 rounded-lg font-medium transition-colors duration-300 mt-6"
              >
                Confirm Schedule
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-earth-100 hover:bg-earth-200 text-earth-800 text-center py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  const LocationModal = ({ property, onClose, onViewMap }) => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-500 hover:text-earth-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="text-earth-700 text-xl" />
          </div>
          <h3 className="text-2xl font-medium text-earth-800">
            Property Location
          </h3>
          <p className="text-earth-600 mt-2">
            {property.location || "Palm Jumeirah, Dubai"}
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <button
            onClick={onViewMap}
            className="block w-full bg-earth-700 hover:bg-earth-800 text-white text-center py-3 rounded-lg font-medium transition-colors duration-300"
          >
            View Map
          </button>

          <button
            onClick={onClose}
            className="block w-full bg-earth-100 hover:bg-earth-200 text-earth-800 text-center py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const MapModal = ({ property, onClose }) => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-4xl h-[80vh] relative z-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-500 hover:text-earth-800 z-10 bg-white/80 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src={
              property.mapUrl ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34366.79184979789!2d55.10653171981538!3d25.123381543907545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1529c2653b15%3A0x3dcabcae764a3e16!2sPalm%20Jumeirah!5e0!3m2!1sen!2sae!4v1751871491171!5m2!1sen!2sae"
            }
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="contact" className="p-32 relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-50 to-earth-100"></div>

      {/* Content */}
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto px-0 relative z-10">
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative mb-8">
            <span className="w-24 h-0.5 bg-earth-400 block"></span>
            <span className="absolute -top-1 left-0 w-12 h-0.5 bg-earth-600 block"></span>
          </div>
          <h3 className="text-5xl font-semibold mb-6 text-earth-800 text-center tracking-tight">
            Discover Your Dream Home
          </h3>
          <p className="text-earth-600 text-center max-w-2xl text-lg">
            Inquire about our exclusive properties or schedule a private viewing
          </p>
        </motion.div>

        {/* 3D Interactive Property Showcase with Contact Form */}
        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* 3D Property Carousel - Simplified animation */}
          <motion.div
            className="md:col-span-7 relative h-[500px]"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div
              className="relative h-full w-full cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Subtle Tilt Effect - Reduced intensity */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                style={{
                  rotateY: isHovering ? cursorPosition.x / 40 - 5 : 0,
                  rotateX: isHovering ? -(cursorPosition.y / 40 - 5) : 0,
                }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                {/* Property Images with Simplified Parallax Effect */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProperty}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${properties[activeProperty].image})`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Overlay Gradient - Simplified */}
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent"></div>

                    {/* Property Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h4 className="text-3xl font-light mb-2">
                          {properties[activeProperty].name}
                        </h4>
                        <p className="text-xl text-earth-100">
                          {properties[activeProperty].price}
                        </p>
                        {properties[activeProperty].name !==
                          "General Inquiry" && (
                          <p className="text-earth-200 mt-2">
                            <FaMapMarkerAlt className="inline-block mr-2" />
                            {properties[activeProperty].location}
                          </p>
                        )}
                      </motion.div>

                      {/* Interactive Dots */}
                      <div className="flex space-x-2 mt-6">
                        {properties.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveProperty(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === activeProperty
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/70"
                            }`}
                            aria-label={`View property ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Contact Hotspots - Simplified animations */}
                {properties[activeProperty].name !== "General Inquiry" && (
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-12 h-12 -ml-6 -mt-6 cursor-pointer"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      onClick={handleCallHotspot}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-10"></div>
                        <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <FaPhone className="text-earth-800" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-earth-800 px-3 py-1 rounded text-sm whitespace-nowrap">
                          Call for viewing
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-1/3 right-1/4 w-12 h-12 -mr-6 -mb-6 cursor-pointer"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      onClick={handleLocationHotspot}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-10"></div>
                        <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <FaMapMarkerAlt className="text-earth-800" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-earth-800 px-3 py-1 rounded text-sm whitespace-nowrap">
                          Location details
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/3 right-1/3 w-12 h-12 -mr-6 -mt-6 cursor-pointer"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                      onClick={() =>
                        window.open(
                          `/projects/${properties[activeProperty].name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`,
                          "_blank"
                        )
                      }
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-10"></div>
                        <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <FaInfoCircle className="text-earth-800" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-earth-800 px-3 py-1 rounded text-sm whitespace-nowrap">
                          Property details
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* General Inquiry Hotspots - Simplified animations */}
                {properties[activeProperty].name === "General Inquiry" && (
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-12 h-12 -ml-6 -mt-6 cursor-pointer"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      onClick={() => window.open("tel:+97144589090", "_blank")}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-10"></div>
                        <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <FaPhone className="text-earth-800" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-earth-800 px-3 py-1 rounded text-sm whitespace-nowrap">
                          Call us
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/3 right-1/3 w-12 h-12 -mr-6 -mt-6 cursor-pointer"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      onClick={() => window.open("/projects", "_blank")}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-10"></div>
                        <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <FaInfoCircle className="text-earth-800" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-earth-800 px-3 py-1 rounded text-sm whitespace-nowrap">
                          Browse all properties
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Glass Contact Form */}
          <motion.div
            className="md:col-span-5 relative z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 border border-earth-200 rounded-full"></div>
              <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-earth-300 rounded-full"></div>

              {/* Glass Card - More concise with earth colors */}
              <motion.div
                className="relative bg-white/90 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-earth-100"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4,
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-earth-100/40 to-transparent rounded-full -mr-12 -mt-12"></div>

                {/* Content container with padding */}
                <div className="p-6 relative z-10">
                  {formSubmitted ? (
                    <motion.div
                      className="text-center py-10 relative z-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {showReward ? (
                        <div className="reward-container p-4 rounded-lg bg-earth-50">
                          <div className="w-16 h-16 bg-gradient-to-r from-earth-600 to-earth-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                            <FaKey className="text-white text-xl" />
                          </div>
                          <h4 className="text-xl font-medium text-earth-800 mb-2">
                            Exclusive Access Granted!
                          </h4>
                          <p className="text-earth-600 mb-4 text-sm">
                            You've unlocked a private viewing of{" "}
                            <span className="font-semibold">
                              {formState.property}
                            </span>
                            .
                          </p>
                          <div className="flex justify-center space-x-3">
                            <div className="flex items-center bg-earth-100 px-3 py-1.5 rounded-full">
                              <FaCalendarAlt className="text-earth-600 mr-1.5 text-xs" />
                              <span className="text-xs text-earth-700">
                                Priority Booking
                              </span>
                            </div>
                            <div className="flex items-center bg-earth-100 px-3 py-1.5 rounded-full">
                              <FaGift className="text-earth-600 mr-1.5 text-xs" />
                              <span className="text-xs text-earth-700">
                                Welcome Gift
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                              className="w-8 h-8 text-earth-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <h4 className="text-xl font-medium text-earth-800 mb-2">
                            Thank You
                          </h4>
                          <p className="text-earth-600 mb-4 text-sm">
                            Your inquiry about{" "}
                            <span className="font-semibold">
                              {formState.property}
                            </span>{" "}
                            has been received.
                          </p>
                          <motion.div
                            className="h-1 bg-gradient-to-r from-earth-400 to-earth-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5 }}
                          />
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <>
                      {/* Elegant header */}
                      <div className="mb-4 relative">
                        <h4 className="text-xl font-medium text-earth-800 relative z-10">
                          {properties[activeProperty].name === "General Inquiry"
                            ? "Property Inquiry"
                            : "Inquire About This Property"}
                        </h4>
                        <div className="w-12 h-1 bg-earth-600 mt-1.5"></div>
                      </div>

                      {/* Form Progress Indicator */}
                      <div className="mb-4 relative">
                        <div className="h-1 bg-earth-100 rounded-full w-full">
                          <motion.div
                            className="h-1 bg-earth-600 rounded-full"
                            style={{ width: `${formProgress}%` }}
                          />
                        </div>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="relative z-10 text-black"
                      >
                        {/* Form fields - More concise with earth colors */}
                        <div className="space-y-3">
                          <div>
                            <label
                              className="block text-earth-800 text-sm font-medium mb-1"
                              htmlFor="name"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white/80 border border-earth-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-600 transition-all duration-300"
                              placeholder="Your name"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label
                                className="block text-earth-800 text-sm font-medium mb-1"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white/80 border border-earth-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-600 transition-all duration-300"
                                placeholder="Your email"
                                required
                              />
                            </div>

                            <div>
                              <label
                                className="block text-earth-800 text-sm font-medium mb-1"
                                htmlFor="phone"
                              >
                                Phone
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white/80 border border-earth-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-600 transition-all duration-300"
                                placeholder="Your phone"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              className="block text-earth-800 text-sm font-medium mb-1"
                              htmlFor="message"
                            >
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white/80 border border-earth-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-600 transition-all duration-300"
                              placeholder="Tell us about your requirements"
                              rows="3"
                              required
                            ></textarea>
                          </div>

                          <div>
                            <label
                              className="block text-earth-800 text-sm font-medium mb-1"
                              htmlFor="property"
                            >
                              Property of Interest
                            </label>
                            <select
                              id="property"
                              name="property"
                              value={formState.property}
                              onChange={handlePropertyChange}
                              className="w-full px-3 py-2 bg-white/80 border border-earth-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-600 transition-all duration-300 appearance-none"
                            >
                              {properties.map((property) => (
                                <option
                                  key={property.name}
                                  value={property.name}
                                >
                                  {property.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Interactive Submit Button - Using earth colors */}
                        <motion.button
                          type="submit"
                          className="w-full py-3 rounded-lg relative overflow-hidden group mt-6"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={formProgress < 75}
                        >
                          <span className="relative z-10 flex items-center justify-center text-white font-medium">
                            {formProgress < 75 ? (
                              <span>
                                Complete form to unlock exclusive access
                              </span>
                            ) : (
                              <>
                                <span>
                                  {properties[activeProperty].name ===
                                  "General Inquiry"
                                    ? "Submit Inquiry"
                                    : "Unlock Exclusive Access"}
                                </span>
                                <FaStar className="ml-2 text-earth-100" />
                              </>
                            )}
                          </span>
                          <motion.span
                            className="absolute inset-0 bg-earth-800"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: formProgress >= 75 ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-earth-700 to-earth-900"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: formProgress >= 75 ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ transformOrigin: "left" }}
                          />
                        </motion.button>

                        {/* Form Benefits - More concise with earth colors */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <div className="flex items-center bg-earth-100 px-3 py-1.5 rounded-full">
                            <FaCompass className="text-earth-600 mr-1.5 text-xs" />
                            <span className="text-xs text-earth-700">
                              Priority Viewing
                            </span>
                          </div>
                          <div className="flex items-center bg-earth-100 px-3 py-1.5 rounded-full">
                            <FaKey className="text-earth-600 mr-1.5 text-xs" />
                            <span className="text-xs text-earth-700">
                              Exclusive Access
                            </span>
                          </div>
                          <div className="flex items-center bg-earth-100 px-3 py-1.5 rounded-full">
                            <FaCalendarAlt className="text-earth-600 mr-1.5 text-xs" />
                            <span className="text-xs text-earth-700">
                              Flexible Scheduling
                            </span>
                          </div>
                          <div className="flex items-center bg-earth-100 px-3 py-1.5 rounded-full">
                            <FaGift className="text-earth-600 mr-1.5 text-xs" />
                            <span className="text-xs text-earth-700">
                              Welcome Gift
                            </span>
                          </div>
                        </div>

                        {/* Privacy note - Improved and more concise */}
                        <div className="text-xs text-earth-600 mt-4 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-earth-500 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          Your information is secure and will never be shared
                          with third parties.
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="flex justify-center space-x-10 mt-20">
          {[
            {
              icon: FaPhone,
              text: "Call Us",
              info: "+971 4 458 9090",
              href: "tel:+97144589090",
            },
            {
              icon: FaEnvelope,
              text: "Email Us",
              info: "luxury@ushre.com",
              href: "mailto:luxury@ushre.com",
            },
            {
              icon: FaMapMarkerAlt,
              text: "Visit Us",
              info: "Business Bay, Dubai",
              href: "https://maps.google.com",
            },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.icon === FaMapMarkerAlt ? "_blank" : undefined}
              rel={
                item.icon === FaMapMarkerAlt ? "noopener noreferrer" : undefined
              }
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-earth-100 flex items-center justify-center mb-4 group-hover:bg-earth-200 transition-colors duration-300">
                <item.icon className="text-earth-700 text-xl" />
              </div>
              <span className="text-earth-800 font-medium">{item.text}</span>
              <span className="text-earth-600 text-sm">{item.info}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCallModal && (
          <CallModal
            property={properties[activeProperty]}
            onClose={closeModals}
            onSchedule={handleScheduleLater}
            onScheduleSubmit={handleScheduleSubmit}
          />
        )}

        {showLocationModal && (
          <LocationModal
            property={properties[activeProperty]}
            onClose={closeModals}
            onViewMap={() => {
              setShowLocationModal(false);
              setShowMap(true);
            }}
          />
        )}

        {showMap && (
          <MapModal
            property={properties[activeProperty]}
            onClose={closeModals}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
