// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaShieldAlt } from "react-icons/fa";

// export default function ProjectPermit({ compliance }) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     if (!compliance?.listingAdvertisementNumber || !compliance?.type) return;

//     const fetchQrUrl = async () => {
//       try {
//         const params = new URLSearchParams({
//           listingAdvertisementNumber: compliance.listingAdvertisementNumber,
//           type: compliance.type,
//         });

//         const response = await fetch(
//           `/api/pf/projects/generate-qr-url?${params.toString()}`
//         );
//         const res = await response.json();
//         console.log(res, "***********************************");

//         console.log(res.data, "()()()()(()");
//         if (res?.data?.data) {
//           setData(res.data.data[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch QR URL:", err);
//       }
//     };

//     fetchQrUrl();
//   }, [compliance]);

//   if (!compliance?.listingAdvertisementNumber) return null;

//   const handleVisitLink = () => {
//     if (data?.validationURL) {
//       window.open(data.validationURL, '_blank');
//     }
//   };

//   return (
//     <div className="bg-white/30 bg-linear-gradient(135deg, #D2CEB9 0%, #E6E4D8 50%, #D2CEB9 100%)  p-6 rounded-tl-[2rem] text-black">
//       <h3 className=" flex items-center  shadow-sm">
//         <FaShieldAlt className="mr-3 text-brand w-5 h-5" />
//          <h2 className="text-2xl  font-semibold "> DLD Verification</h2>
       
//       </h3>
      
//       <div className=" p-6 rounded-xl shadow-sm">
//         <div className="text-center mb-4">
//           <div className="text-lg font-semibold text-earth-800 mb-2">
//             Permit #{compliance.listingAdvertisementNumber}p
//           </div>
//           <p className="text-sm text-earth-600">
//             Verified with Dubai Land Department
//           </p>
//         </div>

//         {data?.validationURL && (
//           <div className="space-y-4">
//             <div className="flex justify-center">
//               <div className="bg-white p-3 rounded-xl shadow-sm    border-earth-200/50">
//                 <img
//                   src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
//                     data.validationURL
//                   )}&size=120x120`}
//                   alt="DLD Verification QR Code"
//                   className="rounded-lg"
//                 />
//               </div>
//             </div>
            
//             <motion.button
//               onClick={handleVisitLink}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
//             >
//               <FaShieldAlt className="mr-2 w-4 h-4" />
//               Verify on DLD Portal
//             </motion.button>
            
//             <p className="text-xs text-earth-500 text-center">
//               Scan QR code or click button to verify authenticity
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

export default function ProjectPermit({ compliance }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!compliance?.listingAdvertisementNumber || !compliance?.type) return;

    const fetchQrUrl = async () => {
      try {
        const params = new URLSearchParams({
          listingAdvertisementNumber: compliance.listingAdvertisementNumber,
          type: compliance.type,
        });

        const response = await fetch(`/api/pf/projects/generate-qr-url?${params.toString()}`);
        const res = await response.json();

        if (res?.data?.data) {
          setData(res.data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch QR URL:", err);
      }
    };

    fetchQrUrl();
  }, [compliance]);

  if (!compliance?.listingAdvertisementNumber) return null;

  const handleVisitLink = () => {
    if (data?.validationURL) {
      window.open(data.validationURL, '_blank');
    }
  };

  console.log( data,"-=-=-=-=-=-=-=-=-=-==-");
  if( !data?.validationURL ) return

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300 text-brand flex flex-col md:flex-row items-center justify-between gap-6"
    >
      {/* Left: QR & permit */}
      <div className="flex flex-col items-center md:items-start md:w-1/3 text-center md:text-left  p-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              data?.validationURL || ""
            )}&size=120x120`}
            alt="QR Code"
            className="rounded-md w-[160px] h-[160px] object-contain"
          />
        </div>
        <div className="text-sm text-[#4a4a4a]">
          Permit No.{" "}
          <span className="font-semibold text-[#314D2D]">
            #{compliance.listingAdvertisementNumber}
          </span>
        </div>
      </div>

      {/* Right: Details & CTA */}
      <div className="md:w-2/3 text-left">
        <div className="flex items-center mb-4">
          <div className="bg-[#e6e2cf] text-[#314D2D] w-14 h-14 rounded-full flex items-center justify-center shadow-md mr-3">
            <FaShieldAlt className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#314D2D]">
            Verified by Dubai Land Department
          </h2>
        </div>

        <p className="text-lg text-gray-600 mb-6">
          This listing is officially registered with the DLD. You can scan the QR code or tap the button below to view the live permit record.
        </p>

        <motion.button
          onClick={handleVisitLink}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-[#346335fb] to-[#0aaa12] text-white px-6 py-3 rounded-xl text-lg shadow hover:shadow-md transition"
        >
          Verify on DLD Portal
        </motion.button>
      </div>
    </motion.div>
  );
}
