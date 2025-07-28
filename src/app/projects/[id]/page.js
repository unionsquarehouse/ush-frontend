// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import ImageGallery from "../../components/project/ImageGallery";
// import PropertyDetails from "../../components/project/ProjectDetails";
// import AgentCard from "../../components/project/AgentCard";
// import MortgageCalculator from "../../components/project/MortgageCalculator";
// import SimilarProperties from "../../components/project/SimilarProperties";
// import ProjectPermit from "../../components/project/ProjectPermit";
// import ProjectMap from "../../components/project/ProjectMap";
// import { SparklesIcon } from "lucide-react";

// export default function PropertyFinderPage() {
//   const params = useParams();
//   const id = params?.id;
//   const [project, setProject] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [agentProfile, setAgentProfile] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchProject = async () => {
//       try {
//         const res = await fetch(`/api/pf/projects/${id}`);
//         const json = await res.json();
//         if (json.success) {
//           setProject(json.data);
//           const images = json.data?.data?.media?.images || [];
//           const urls = images.map((img) => img.original?.url);
//           setGalleryImages(urls);
//         }
//       } catch (err) {
//         console.error("Error fetching project:", err);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   useEffect(() => {
//     if (!project?.data?.assignedTo?.id) return;
//     console.log(project.data.assignedTo.id,"project.data.assignedTo.id");

//     async function fetchAgentProfile() {
//       try {
//         const res = await fetch(`/api/pf/projects/get-user-profile?publicProfileId=${project.data.assignedTo.id}`);

//         const json = await res.json();
//         console.log(json,"json");

//         if (json.data.data.length > 0) {
//           setAgentProfile(json.data.data[0].publicProfile);
//         }
//       } catch (err) {
//         console.error("Failed to fetch agent profile:", err);
//       }
//     }

//     fetchAgentProfile();
//   }, [project]);

//   if (!project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-earth-200 flex items-center justify-center">
//         <div className="text-center glass-card p-12">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand/20 border-t-brand mx-auto mb-6"></div>
//             <SparklesIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand w-6 h-6" />
//           </div>
//           <p className="text-earth-700 font-montserrat">Loading luxury property details...</p>
//         </div>
//       </div>
//     );
//   }

//   const { data } = project;
//   const title = data?.title?.en;
//   const price = data?.price?.amounts?.sale;
//   const size = data?.size;
//   const bedrooms = data?.bedrooms;
//   const bathrooms = data?.bathrooms;
//   const description = data?.description?.en;
//   const amenities = data?.amenities;
//   const reference = data?.reference;
//   const location = project?.location;
//   const compliance = data?.compliance;

//   const priceValue = price?.value || price?.amount || 'Price on request';
//   const currency = price?.currency || 'AED';
//   const locationString = location?.name || location?.address || location?.area || 'Location not specified';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-earth-50 to-earth-100 my-32">
//       <div className="w-[80vw] mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <ImageGallery galleryImages={galleryImages} setIsFullscreen={setIsFullscreen} />
//             <PropertyDetails
//               title={title}
//               locationString={locationString}
//               priceValue={priceValue}
//               currency={currency}
//               size={size}
//               bedrooms={bedrooms}
//               bathrooms={bathrooms}
//             />
//             <ProjectMap location={location} />
//             {compliance && <ProjectPermit compliance={compliance} />}
//           </div>

//           <div className="lg:col-span-1 space-y-6">
//             <AgentCard agentProfile={agentProfile} title={title} reference={reference} />
//             <MortgageCalculator priceValue={priceValue} currency={currency} />
//             <SimilarProperties />
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isFullscreen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
//           >
//             <motion.button
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setIsFullscreen(false)}
//               className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-earth-800 p-4 rounded-2xl z-10 hover:bg-white transition-all duration-300 shadow-lg"
//             >
//               <FaTimes size={24} />
//             </motion.button>
//             <div className="relative w-full h-full flex items-center justify-center p-8">
//               <motion.img
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 src={galleryImages[0]} // Placeholder for the selected image
//                 alt="Luxury Fullscreen"
//                 className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
//               />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ImageGallery from "../../components/project/ImageGallery";
import PropertyDetails from "../../components/project/ProjectDetails";
import AgentCard from "../../components/project/AgentCard";
import MortgageCalculator from "../../components/project/MortgageCalculator";
import ProjectPermit from "../../components/project/ProjectPermit";
import ProjectMap from "../../components/project/ProjectMap";
import { SparklesIcon } from "lucide-react";
import { FaTimes } from "react-icons/fa";

export default function PropertyFinderPage() {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [agentProfile, setAgentProfile] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false)

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
        const res = await fetch(
          `/api/pf/projects/get-user-profile?publicProfileId=${project.data.assignedTo.id}`
        );
        const json = await res.json();
        if (json.data.data.length > 0) {
          setAgentProfile(json.data.data[0].publicProfile);
        }
      } catch (err) {
        console.error("Failed to fetch agent profile:", err);
      }
    }

    fetchAgentProfile();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-12 ">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#866c4c] border-t-[#ac895e] mx-auto mb-6"></div>
            <SparklesIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#866c4c] w-6 h-6" />
          </div>
          {/* <p className="text-[#866c4c] font-sans">
            Loading luxury property details...
          </p> */}
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

  const currency = price?.currency || "AED";

  return (
    <div className="min-h-screen my-32">
      <div className="w-[80vw] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery
              galleryImages={galleryImages}
              setIsFullscreen={setIsFullscreen}
            />
            <PropertyDetails
              title={title}
              locationString={location}
              priceValue={price}
              currency={currency}
              size={size}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              description={description}
              showFullDescription={showFullDescription}
              setShowFullDescription={setShowFullDescription}
            />
            <ProjectMap location={location} />
            {compliance && <ProjectPermit compliance={compliance} />}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <AgentCard
              agentProfile={agentProfile}
              title={title}
              reference={reference}
            />
            <MortgageCalculator priceValue={price} currency={currency} />
          </div>
        </div>
      </div>

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
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-[#866c4c] p-4 rounded-2xl z-10 hover:bg-white transition-all duration-300 shadow-lg"
            >
              <FaTimes size={24} />
            </motion.button>
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={galleryImages[0]} // Placeholder for the selected image
                alt="Luxury Fullscreen"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
