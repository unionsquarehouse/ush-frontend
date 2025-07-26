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

        const response = await fetch(
          `/api/pf/projects/generate-qr-url?${params.toString()}`
        );
        const res = await response.json();
        console.log(res, "***********************************");

        console.log(res.data, "()()()()(()");
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

  return (
    <div>
      <h3 className="font-display text-xl font-semibold mb-6 text-earth-900 flex items-center">
        <FaShieldAlt className="mr-3 text-brand w-5 h-5" />
        DLD Verification
      </h3>
      
      <div className="bg-gradient-to-br from-earth-50 to-white border border-earth-200/50 p-6 rounded-xl shadow-sm">
        <div className="text-center mb-4">
          <div className="text-lg font-semibold text-earth-800 mb-2">
            Permit #{compliance.listingAdvertisementNumber}
          </div>
          <p className="text-sm text-earth-600">
            Verified with Dubai Land Department
          </p>
        </div>

        {data?.validationURL && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-earth-200/50">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                    data.validationURL
                  )}&size=120x120`}
                  alt="DLD Verification QR Code"
                  className="rounded-lg"
                />
              </div>
            </div>
            
            <motion.button
              onClick={handleVisitLink}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <FaShieldAlt className="mr-2 w-4 h-4" />
              Verify on DLD Portal
            </motion.button>
            
            <p className="text-xs text-earth-500 text-center">
              Scan QR code or click button to verify authenticity
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
