


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
      className="bg-white  p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300 text-brand flex flex-col md:flex-row items-center justify-between gap-6"
    >
      {/* Left: QR & permit */}
      <div className="flex flex-col items-center md:items-start md:w-1/3 text-center md:text-left  p-3">
        <div className="bg-white shadow-sm border border-gray-200 mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              data?.validationURL || ""
            )}&size=120x120`}
            alt="QR Code"
            className=" w-[160px] h-[160px] object-contain"
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
          className="bg-gradient-to-r from-[#346335fb] to-[#0aaa12] text-white px-6 py-3  text-lg shadow hover:shadow-md transition"
        >
          Verify on DLD Portal
        </motion.button>
      </div>
    </motion.div>
  );
}
