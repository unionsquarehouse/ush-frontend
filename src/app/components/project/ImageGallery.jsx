// import { motion } from "framer-motion";
// import { CameraIcon, SparklesIcon } from "lucide-react";
// import { FaExpand } from "react-icons/fa";

// const ImageGallery = ({ galleryImages, setIsFullscreen, selectedImage, setSelectedImage }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-3 shadow-xl border border-earth-200/30 hover-lift"
//     >
//       <div className="grid grid-cols-2 gap-3 h-[500px]">
//         <motion.div 
//           className="relative cursor-pointer group overflow-hidden rounded-tl-[1.5rem] rounded-bl-[1.5rem]"
//           whileHover={{ scale: 1.02 }}
//           onClick={() => setIsFullscreen(true)}
//         >
//           <img 
//             src={galleryImages[0]} 
//             alt="Luxury Property" 
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-earth-800 px-4 py-2 rounded-xl font-montserrat font-medium shadow-lg">
//             <CameraIcon className="inline w-4 h-4 mr-2" />
//             1 / {galleryImages.length}
//           </div>
//           <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-earth-800 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
//             <FaExpand className="w-4 h-4" />
//           </div>
//         </motion.div>
        
//         <div className="grid grid-cols-2 gap-3">
//           {galleryImages.slice(1, 5).map((img, idx) => (
//             <motion.div 
//               key={idx} 
//               className="relative cursor-pointer group overflow-hidden rounded-lg"
//               whileHover={{ scale: 1.05 }}
//               onClick={() => setIsFullscreen(true)}
//             >
//               <img src={img} alt={`Luxury View ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               {idx === 3 && galleryImages.length > 5 && (
//                 <div className="absolute inset-0 bg-earth-900/80 backdrop-blur-sm flex items-center justify-center text-white font-montserrat font-semibold">
//                   <div className="text-center">
//                     <SparklesIcon className="w-6 h-6 mx-auto mb-2" />
//                     +{galleryImages.length - 4} more
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ImageGallery;












import { motion } from "framer-motion";
import { CameraIcon, SparklesIcon } from "lucide-react";
import { FaExpand } from "react-icons/fa";

const ImageGallery = ({ galleryImages, setIsFullscreen, selectedImage, setSelectedImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300"
      
    >
      {/* <div className="absolute inset-0 rounded-lg pointer-events-none border-effect"></div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
        <motion.div 
          className="relative cursor-pointer group overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setIsFullscreen(true);
            setSelectedImage(0);
          }}
        >
          <img 
            src={galleryImages[0]} 
            alt="Luxury Property" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-[#866c4c] px-4 py-2 rounded-xl font-sans font-medium shadow-lg">
            <CameraIcon className="inline w-4 h-4 mr-2" />
            1 / {galleryImages.length}
          </div>
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-[#866c4c] p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <FaExpand className="w-4 h-4" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.slice(1, 5).map((img, idx) => (
            <motion.div 
              key={idx} 
              className="relative cursor-pointer group overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setIsFullscreen(true);
                setSelectedImage(idx + 1);
              }}
            >
              <img src={img} alt={`Luxury View ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {idx === 3 && galleryImages.length > 5 && (
                <div className="absolute inset-0 bg-[#ac895e]/80 backdrop-blur-sm flex items-center justify-center text-white font-sans font-semibold">
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
  );
};

export default ImageGallery;
