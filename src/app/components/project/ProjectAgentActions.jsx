"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, MailIcon, CalendarIcon } from "lucide-react";

export default function ProjectAgentActions({ agent }) {
    console.log(agent,"7878787877878787");
    
  const agentId = agent?.id;
  const [agentProfile, setAgentProfile] = useState(null);

  useEffect(() => {
    if (!agentId) return;

    async function fetchAgentProfile() {
      try {
        const res = await fetch(`/api/pf/projects/get-user-profile?publicProfileId=${agentId}`);
        const json = await res.json();
        
        if (json.data.data.length > 0) {
            console.log("hihihihihihih");
            
          setAgentProfile(json.data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch agent profile:", err);
      }
    }

    fetchAgentProfile();
  }, []);

  if (!agentProfile) {
    return <div>Loading agent info...</div>;
  }

  

  const profile = agentProfile.publicProfile || {};
  const name = profile.name || `Agent #${agentId}`;
  const photo = profile.imageVariants?.large?.default || null;
  const position = profile.position?.primary || "Real Estate Consultant";
  const phone = agentProfile.phone || profile.phone || profile.whatsappPhone || "";
  const email = agentProfile.email || profile.email || "";

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-4 sticky top-6">
      {/* Agent Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 font-bold">
              {name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500">{position}</p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-2">
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
          >
            <PhoneIcon size={16} /> Call Now
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            <MailIcon size={16} /> Email
          </a>
        )}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800">
          <CalendarIcon size={16} /> Schedule Viewing
        </button>
      </div>

      {/* Optional bio */}
      {profile.bio?.primary && (
        <p className="text-sm text-gray-600 mt-3">{profile.bio.primary}</p>
      )}
    </div>
  );
}
