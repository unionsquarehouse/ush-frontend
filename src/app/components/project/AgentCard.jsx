

import { motion } from "framer-motion";
import {
  FaStar,
  FaCrown,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const AgentCard = ({ agentProfile, title, reference }) => {
  return (
    agentProfile && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white  p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 overflow-hidden mx-auto bg-gradient-to-br from-[#866c4c] to-[#ac895e] p-1 rounded-full shadow-lg">
              <img
                src={agentProfile?.imageVariants?.large?.default}
                alt={agentProfile.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#866c4c] to-[#ac895e] rounded-full flex items-center justify-center shadow-lg">
              <FaCrown className="text-white text-sm" />
            </div>
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#866c4c] mb-1">
            {agentProfile.name}
          </h3>
          <p className="text-brand font-montserrat mb-2">
            {agentProfile.position?.primary}
          </p>

          <div className="flex items-center justify-center mb-4">
            <div className="flex text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-sm" />
              ))}
            </div>
            <span className="text-brand font-montserrat text-sm">
              5.0 (24 reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href={`tel:${agentProfile.phone || agentProfile.phoneSecondary}`}
            className="w-full bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white py-3 font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <FaPhone className="mr-2" />
            Call {agentProfile.phone || agentProfile.phoneSecondary}
          </a>

          <a
            href={`mailto:${
              agentProfile.email || "info@ushre.com"
            }?subject=Inquiry about ${title}&body=Hi, I'm interested in this property: ${title} (Ref: ${reference})`}
            className="w-full bg-white border-2 border-[#D2CEB9] text-[#866c4c] py-3 font-montserrat font-semibold hover:border-[#ac895e] hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <FaEnvelope className="mr-2" />
            Send Email
          </a>

          <a
            href={`https://wa.me/${
              agentProfile.phone || agentProfile.phoneSecondary
            }?text=Hi, I'm interested in ${title} (Ref: ${reference}). Could you provide more details?`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white border-2 border-green-300 text-green-700 py-3  font-montserrat font-semibold hover:border-green-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </a>
        </div>
      </motion.div>
    )
  );
};

export default AgentCard;
