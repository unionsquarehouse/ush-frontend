import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaTag, FaBed, FaBath, FaRuler } from "react-icons/fa";

const PropertyDetails = ({
  title,
  locationString,
  priceValue,
  currency,
  bedrooms,
  bathrooms,
  size,
  description,
  showFullDescription,
  setShowFullDescription,
}) => {
  return (
    <div className="bg-white  p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300 ">
      {/* <div className="absolute inset-0 rounded-lg pointer-events-none border-effect"></div> */}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative">
        <div>
          <h1 className="text-2xl font-semibold text-[#866c4c]">{title}</h1>
          <div className="flex items-center text-brand mt-2">
            <FaMapMarkerAlt className="mr-2" />
            <span className="text-lg">{locationString}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 absolute right-0 flex items-center">
          <div className="inline-flex items-center bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white px-6 py-3  shadow-lg">
            <FaTag className="mr-2" />
            <span className="text-2xl font-semibold whitespace-nowrap">
              AED {Number(priceValue).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard icon={<FaBed />} label="Bedrooms" value={bedrooms} />
        <InfoCard icon={<FaBath />} label="Bathrooms" value={bathrooms} />
        <InfoCard icon={<FaRuler />} label="Size" value={`${size} sqft`} />
      </div>

      {/* Description Section */}
      <h3 className="font-semibold text-2xl text-[#866c4c] mb-2">
        Property Story
      </h3>
      <p className="text-gray-700 text-base">
        {showFullDescription
          ? description
          : truncateDescription(description, 180)}
      </p>
      {description && description.length > 180 && (
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="mt-2 text-[#866c4c] underline"
        >
          {showFullDescription ? "Show Less" : "Read Full Story"}
        </button>
      )}
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => {
  return (
    <motion.div
      className="relative bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 group overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      {/* Shiny Border */}

      {/* Content */}
      <div className="text-[#866c4c] text-4xl mb-2 z-10">{icon}</div>
      <div className="text-xl font-semibold text-[#866c4c] z-10">{value}</div>
      <div className="text-sm text-gray-500 z-10">{label}</div>
    </motion.div>
  );
};

const truncateDescription = (text, maxLength = 200) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default PropertyDetails;
