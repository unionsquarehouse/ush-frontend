"use client";

import { useEffect, useState } from "react";

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

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">DLD Permit Number</h2>
      <div className="text-lg font-medium text-gray-800">
        {compliance.listingAdvertisementNumber}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        This listing has been verified or registered with Dubai Land Department.
      </p>

      {data?.validationURL && (
        <div className="mt-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              data.validationURL
            )}&size=150x150`}
            alt="QR Code for DLD permit"
            className="rounded"
          />
        </div>
      )}
    </section>
  );
}
