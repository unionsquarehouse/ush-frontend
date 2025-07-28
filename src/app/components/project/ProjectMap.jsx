// // components/project/ProjectMap.jsx
// export default function ProjectMap({ location }) {
//   const encodedAddress = encodeURIComponent(location);

import { LocationEdit } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

//   return (
//     <section className="bg-white/30 bg-linear-gradient(135deg, #D2CEB9 0%, #E6E4D8 50%, #D2CEB9 100%) p-6 rounded-tl-[2rem] text-black rounded-br-[2rem]  shadow-sm">
//       <h2 className="text-2xl  font-semibold mb-4">Location</h2>
//       <p className="mb-4 ">{location}</p>
//       <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
//         <iframe
//           title="Google Map"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           loading="lazy"
//           allowFullScreen
//           referrerPolicy="no-referrer-when-downgrade"
//           src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
//         />
//       </div>
//     </section>
//   );
// }

export default function ProjectMap({ location }) {
  const encodedAddress = encodeURIComponent(location);

  return (
    <section className="bg-white rounded-lg p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300 text-brand">
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaMapMarkerAlt className="text-brand h-6 w-6"/> Location</h2>
        <p className="mb-4">{location}</p>
      </div>
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
        />
      </div>
    </section>
  );
}
