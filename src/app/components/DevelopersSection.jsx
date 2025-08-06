// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useInView, useScroll, useTransform } from "framer-motion";
// import { BsArrowLeft, BsArrowRight, BsBuilding, BsPlus } from "react-icons/bs";
// import { FaStar, FaAward, FaCalendarAlt, FaChartLine } from "react-icons/fa";
// import AnimatedButton from "./ui/AnimatedButton";

// const developers = [
//   {
//     id: 1,
//     name: "Emaar Properties",
//     logo: "/assets/emaar_logo.png",
//     description:
//       "Dubai's premier developer known for iconic projects like Burj Khalifa and Dubai Mall, setting new standards in luxury real estate development across the region.",
//     established: 1997,
//     projects: 42,
//     rating: 4.8,
//     featured: ["Burj Khalifa", "Dubai Mall", "Downtown Dubai"],
//     color: "#7d7460", // earth-600
//   },
//   {
//     id: 2,
//     name: "DAMAC Properties",
//     logo: "/assets/damac_logo.png",
//     description:
//       "Luxury developer with prestigious residential and commercial projects, known for partnerships with global brands like Versace, Fendi, and Trump Organization.",
//     established: 2002,
//     projects: 35,
//     rating: 4.6,
//     featured: ["DAMAC Hills", "AYKON City", "DAMAC Towers"],
//     color: "#645c4c", // earth-700
//   },
//   {
//     id: 3,
//     name: "Nakheel",
//     logo: "/assets/nakheel_logo.png",
//     description:
//       "Creator of Palm Jumeirah and other iconic waterfront developments, transforming Dubai's coastline with innovative and ambitious engineering projects.",
//     established: 2000,
//     projects: 28,
//     rating: 4.7,
//     featured: ["Palm Jumeirah", "Deira Islands", "The World Islands"],
//     color: "#968b74", // earth-500
//   },
//   // {
//   //   id: 4,
//   //   name: "Meraas",
//   //   logo: "/assets/meraas_logo.png",
//   //   description: "Developer focused on creating unique lifestyle destinations and experiences",
//   //   established: 2007,
//   //   projects: 22,
//   //   rating: 4.9,
//   //   featured: ["Bluewaters Island", "City Walk", "La Mer"],
//   //   color: "#aca189" // earth-400
//   // },
//   // {
//   //   id: 5,
//   //   name: "Dubai Properties",
//   //   logo: "/assets/dubai_properties_logo.png",
//   //   description: "Developer of mixed-use destinations and waterfront communities",
//   //   established: 2004,
//   //   projects: 30,
//   //   rating: 4.5,
//   //   featured: ["Jumeirah Beach Residence", "Business Bay", "Culture Village"],
//   //   color: "#4d473b" // earth-800
//   // }
// ];

// export default function DevelopersSection() {
//   const [activeDeveloper, setActiveDeveloper] = useState(0);
//   const containerRef = useRef(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

//   const nextDeveloper = () => {
//     setActiveDeveloper((prev) => (prev + 1) % developers.length);
//   };

//   const prevDeveloper = () => {
//     setActiveDeveloper(
//       (prev) => (prev - 1 + developers.length) % developers.length
//     );
//   };

//   // Auto-rotate carousel unless hovering
//   useEffect(() => {
//     if (isHovering) return;

//     const timer = setTimeout(() => {
//       nextDeveloper();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [activeDeveloper, isHovering]);

//   return (
//     <section
//       className="pb-32 relative overflow-hidden bg-earth-50 text-earth-700"
//       ref={containerRef}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Background pattern */}

//       <motion.div
//         style={{ opacity }}
//         className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10"
//       >
//         {/* Section header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-5xl  mb-4 text-black flex items-center justify-center">
//             <span className="text-brand shine-effect mr-2">Visionary</span>{" "}
//             Developers
//           </h2>
//           <div className="h-0.5 w-24  bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>
//           {/* <p className="text-xl text-black max-w-2xl mx-auto">
//             The masterminds behind Dubai's architectural marvels
//           </p> */}
//         </motion.div>

//         {/* Developer showcase with fixed container */}
//         <div className="relative pb-24 ">
//           {/* Current developer display */}
//           <div className="overflow-hidden">
//             <div
//               className="transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${activeDeveloper * 100}%)` }}
//             >
//               <div className="flex">
//                 {developers.map((developer, index) => (
//                   <div key={developer.id} className="w-full flex-shrink-0">
//                     {/* New unique layout with overlapping elements */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
//                       {/* Left column - Developer info */}
//                       <div className="relative z-10 ">
//                         {/* Main info card */}
//                         <div className="backdrop-blur-sm p-6 sm:p-8 mb-8">
//                           <div className="absolute inset-0 p-[2px] rounded-tl-[3rem] rounded-br-[3rem] z-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-300 opacity-40"></div>
//                           {/* Header with logo */}
//                           <div className="flex items-center mb-6">
//                             <div className="w-20 h-20 bg-white rounded-tl-xl rounded-br-xl  flex items-center justify-center mr-4 border border-earth-200">
//                               <img
//                                 src={developer.logo}
//                                 alt={`${developer.name} logo`}
//                                 className="w-12 h-12 object-contain"
//                               />
//                             </div>

//                             <div>
//                               <h3 className="text-3xl font-bold mb-1 text-black">
//                                 {developer.name}
//                               </h3>
//                               <div className="flex items-center">
//                                 {[...Array(5)].map((_, i) => (
//                                   <FaStar
//                                     key={i}
//                                     className={
//                                       i < Math.floor(developer.rating)
//                                         ? "text-yellow-600"
//                                         : "text-gray-300"
//                                     }
//                                     size={14}
//                                   />
//                                 ))}
//                                 <span className="ml-2 text-black text-lg">
//                                   {developer.rating}/5
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <p className="text-black   mb-6">
//                             {developer.description}
//                           </p>

//                           {/* Stats in horizontal layout */}
//                           <div className="grid grid-cols-3 gap-4 mb-6">
//                             <div className="bg-white rounded-tl-2xl rounded-br-2xl p-4 text-center">
//                               <p className="text-black font-medium text-xl">
//                                 {developer.established}
//                               </p>
//                               <p className="text-black text-base">
//                                 Established
//                               </p>
//                             </div>

//                             <div className="bg-white rounded-tl-2xl rounded-br-2xl p-4 text-center">
//                               <p className="text-black font-medium text-xl">
//                                 {developer.projects}
//                               </p>
//                               <p className="text-black text-base">Projects</p>
//                             </div>

//                             <div className="bg-white rounded-tl-2xl rounded-br-2xl p-4 text-center">
//                               <p className="text-black font-medium text-xl">
//                                 Premium
//                               </p>
//                               <p className="text-black text-base">Status</p>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Featured projects */}
//                         <div className="backdrop-blur-sm p-8 rounded-tl-[3rem] rounded-br-[3rem] relative">
//                           <div className="absolute inset-0 p-[2px] rounded-tl-[3rem] rounded-br-[3rem] z-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-300 opacity-40"></div>
//                           <h4 className="text-3xl mb-5 text-black flex items-center relative z-10">
//                             <span className="w-4 h-0.5 bg-black mr-2"></span>
//                             Signature Projects
//                           </h4>

//                           <div className="grid grid-cols-3 gap-4 mb-6">
//                             {developer.featured.map((project, idx) => (
//                               <div
//                                 key={idx}
//                                 className="group relative overflow-hidden rounded-tl-xl rounded-br-xl aspect-video"
//                               >
//                                 <Image
//                                   src={`/assets/${project
//                                     .toLowerCase()
//                                     .replace(/\s+/g, "_")}.jpg`}
//                                   alt={project}
//                                   fill
//                                   className="object-cover group-hover:scale-110 transition-transform duration-500"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>
//                                 <div className="absolute bottom-0 left-0 p-3">
//                                   <h5 className="text-white text-lg font-medium">
//                                     {project}
//                                   </h5>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>

//                           <div className="flex justify-end">
//                             {/* <Link
//                               href={`/developers/${developer.name.toLowerCase().replace(/\s+/g, "-")}/projects`}
//                               className="px-6 py-4 rounded-tl-[2rem] rounded-br-[2rem] text-lg bg-yellow-600 text-white hover:bg-yellow-600 transition-colors flex items-center gap-1 relative overflow-hidden group"
//                             >
//                               <span className="relative z-10">View All Projects</span>
//                               <BsArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//                               <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
//                             </Link> */}

//                             <AnimatedButton
//                               href={`/developers/${developer.name
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}/projects`}
//                               animationDelay={0.6}
//                               containerClassName=" text-center"
//                               color="yellow-600"
//                               hoverColor="yellow-500"
//                               gradientFrom="yellow-600"
//                               gradientTo="yellow-500"
//                               variant="solid"
//                             >
//                               View All Projects
//                             </AnimatedButton>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right column - Large showcase image */}
//                       <div className="relative">
//                         <div className="relative h-full rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden l ">
//                           <Image
//                             src={`/assets/${developer.featured[0]
//                               .toLowerCase()
//                               .replace(/\s+/g, "_")}.jpg`}
//                             alt={developer.featured[0]}
//                             fill
//                             className="object-cover"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/40 to-transparent"></div>

//                           {/* Floating badge */}
//                           <div className="absolute top-8 right-8 bg-[#9F3349] backdrop-blur-sm text-white px-4 py-2 rounded-tl-lg rounded-br-lg text-xl">
//                             <div className="flex items-center ">
//                               <FaAward className="mr-2" />
//                               <span>Premium Developer</span>
//                             </div>
//                           </div>

//                           {/* Floating info card */}
//                           <div className="absolute bottom-8 left-8 right-8   rounded-tl-xl rounded-br-xl p-6 ">
//                             <h4 className="text-2xl font-bold mb-2 text-white">
//                               Flagship Development
//                             </h4>
//                             <p className="text-white mb-4 text-lg">
//                               {developer.featured[0]}
//                             </p>
//                             <Link
//                               href={`/projects/${developer.featured[0]
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}`}
//                               className="inline-flex items-center text-white hover:text-[#9F3349] text-lg font-medium"
//                             >
//                               Explore Property
//                               <BsArrowRight className="ml-2" />
//                             </Link>
//                           </div>
//                         </div>

//                         {/* Decorative element */}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Navigation controls */}
//           <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mt-12 gap-6">
//             <motion.button
//               onClick={prevDeveloper}
//               className="w-12 h-12 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors"
//               aria-label="Previous developer"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <BsArrowLeft size={20} />
//             </motion.button>

//             <div className="flex gap-3">
//               {developers.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => setActiveDeveloper(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === activeDeveloper
//                       ? "bg-gradient-to-r from-[#876F4E] to-[#68543b] scale-125"
//                       : "bg-gradient-to-r from-[#ad8f65] to-[#947753]"
//                   }`}
//                   aria-label={`Go to developer ${index + 1}`}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.8 }}
//                 />
//               ))}
//             </div>

//             <motion.button
//               onClick={nextDeveloper}
//               className="w-12 h-12 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors"
//               aria-label="Next developer"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <BsArrowRight size={20} />
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Building2,
  Award,
  ArrowRight,
  Users,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const developers = [
  {
    id: 1,
    name: "Emaar Properties",
    logo: "/assets/emaar_logo.png",
    description:
      "Dubai's premier developer known for iconic projects like Burj Khalifa and Dubai Mall, setting new standards in luxury real estate development across the region.",
    established: 1997,
    projects: 42,
    rating: 4.8,
    featured: ["Burj Khalifa", "Dubai Mall", "Downtown Dubai"],
    heroImage: "/placeholder.svg",
    stats: {
      employees: "5000+",
      countries: "36",
      awards: "200+",
    },
  },
  {
    id: 2,
    name: "DAMAC Properties",
    logo: "/assets/damac_logo.png",
    description:
      "Luxury developer with prestigious residential and commercial projects, known for partnerships with global brands like Versace, Fendi, and Trump Organization.",
    established: 2002,
    projects: 35,
    rating: 4.6,
    featured: ["DAMAC Hills", "AYKON City", "DAMAC Towers"],
    heroImage: "/placeholder.svg",
    stats: {
      employees: "3500+",
      countries: "25",
      awards: "150+",
    },
  },
  {
    id: 3,
    name: "Nakheel",
    logo: "/assets/nakheel_logo.png",
    description:
      "Creator of Palm Jumeirah and other iconic waterfront developments, transforming Dubai's coastline with innovative and ambitious engineering projects.",
    established: 2000,
    projects: 28,
    rating: 4.7,
    featured: ["Palm Jumeirah", "Deira Islands", "The World Islands"],
    heroImage: "/placeholder.svg",
    stats: {
      employees: "2800+",
      countries: "12",
      awards: "180+",
    },
  },
];

export default function DevelopersSection() {
  const [activeDeveloper, setActiveDeveloper] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextDeveloper = () => {
    setActiveDeveloper((prev) => (prev + 1) % developers.length);
  };

  const prevDeveloper = () => {
    setActiveDeveloper(
      (prev) => (prev - 1 + developers.length) % developers.length
    );
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      nextDeveloper();
    }, 5000);

    return () => clearInterval(timer);
  }, [activeDeveloper, isAutoPlay]);

  const currentDeveloper = developers[activeDeveloper];

  return (
    <section
      className="pb-40 bg-earth-50"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw]  mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="h-6 w-6 text-brand" />
            <span className="font-semibold text-brand uppercase tracking-wider">
              Elite Developers
            </span>
          </div>
          <h2 className=" flex justify-center items-center mb-4 text-black">
            <span className="text-brand shine-effect mr-2">Visionary</span>{" "}
            Developers
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>
          <p className=" max-w-2xl mx-auto">
            The masterminds behind Dubai's architectural marvels
          </p>
        </div>

        {/* Main Developer Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Developer Info */}
          <div className="space-y-8">
            {/* Developer Header */}
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-white shadow-lg flex items-center justify-center border border-earth-200">
                <img
                  src={currentDeveloper.logo}
                  alt={`${currentDeveloper.name} logo`}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div className="flex-1 text-black">
                <h3 className="text-5xl mb-2">
                  {currentDeveloper.name}
                </h3>
                <div className="flex items-center gap-3 mb-3 ">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(currentDeveloper.rating)
                            ? "fill-brand text-brand"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl ">
                    {currentDeveloper.rating}/5.0
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-white text-xl bg-[#9F3349]"
                  >
                    <Award className="w-5 h-5 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className=" leading-relaxed">
              {currentDeveloper.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base">
              <Card className="bg-white border-earth-200">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-7 h-7 text-brand mx-auto mb-2" />
                  <div className="font-bold text-3xl text-black">
                    {currentDeveloper.established}
                  </div>
                  <div className=" text-gray-600">Founded</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-earth-200">
                <CardContent className="p-4 text-center">
                  <Building2 className="w-7 h-7 text-brand mx-auto mb-2" />
                  <div className="font-bold text-3xl text-black">
                    {currentDeveloper.projects}
                  </div>
                  <div className="text-sm text-gray-600">Projects</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-earth-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-7 h-7 text-brand mx-auto mb-2" />
                  <div className="font-bold text-3xl text-black">
                    {currentDeveloper.stats.employees}
                  </div>
                  <div className="text-sm text-gray-600">Employees</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-earth-200">
                <CardContent className="p-4 text-center">
                  <Award className="w-7 h-7 text-brand mx-auto mb-2" />
                  <div className="font-bold text-3xl text-black">
                    {currentDeveloper.stats.awards}
                  </div>
                  <div className="text-sm text-gray-600">Awards</div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Projects */}
            {/* <Card className="bg-white border-earth-200">
              <CardContent className="p-6">
                <h4 className="text-xl text-black font-semibold mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5  bg-brand"></span>
                  Signature Projects
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {currentDeveloper.featured.map((project, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-lg aspect-video bg-gradient-to-t from-[#866c4c] to-transparent"
                    >
                      <Image
                        src={`/assets/${project
                          .toLowerCase()
                          .replace(/\s+/g, "_")}.jpg`}
                        alt={project}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h5 className="text-white font-medium text-sm">
                          {project}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-[#866c4c] to-[#ac895e] hover:bg-brand text-white ">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card> */}
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden h-[50vh] bg-earth-100">
              <Image
                src={`/assets/${currentDeveloper.featured[0]
                  .toLowerCase()
                  .replace(/\s+/g, "_")}.jpg`}
                alt={currentDeveloper.featured[0]}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/40 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-premium text-premium-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                <Award className="w-7 h-7" />
                <span className="text-xl">Premium Developer</span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-2xl  text-white mb-2">
                  Flagship Development
                </h4>
                <p className="text-white/90 mb-4 text-lg">
                  {currentDeveloper.featured[0]}
                </p>
                <Button
                  variant="outline"
                  className="border-white text-base bg-white text-black"
                >
                  Explore Property
                  <ArrowRight className="w-7 h-7 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            onClick={prevDeveloper}
            className="w-12 h-12  flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors"
            aria-label="Previous developer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsArrowLeft size={20} />
          </motion.button>

          <div className="flex gap-3">
            {developers.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveDeveloper(index)}
                className={`w-3 h-3  transition-all duration-300 ${
                  index === activeDeveloper
                    ? "bg-gradient-to-r from-[#876F4E] to-[#68543b] scale-125"
                    : "bg-gradient-to-r from-[#ad8f65] to-[#947753]"
                }`}
                aria-label={`Go to developer ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextDeveloper}
            className="w-12 h-12  flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors"
            aria-label="Next developer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsArrowRight size={20} />
          </motion.button>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mt-12 gap-6">
          <motion.button
            onClick={prevDeveloper}
            className="w-12 h-12 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors"
            aria-label="Previous developer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsArrowLeft size={20} />
          </motion.button>

          <div className="flex gap-3">
            {developers.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveDeveloper(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeDeveloper
                    ? "bg-gradient-to-r from-[#876F4E] to-[#68543b] scale-125"
                    : "bg-gradient-to-r from-[#ad8f65] to-[#947753]"
                }`}
                aria-label={`Go to developer ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextDeveloper}
            className="w-12 h-12 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors"
            aria-label="Next developer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsArrowRight size={20} />
          </motion.button>
        </div> */}
      </div>
    </section>
  );
}
