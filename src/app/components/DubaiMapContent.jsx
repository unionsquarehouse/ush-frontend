"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Sample data for Dubai areas with additional metrics
const dubaiAreas = [
  {
    name: "Downtown Dubai",
    coordinates: [25.1972, 55.2744],
    roi: "6.5%",
    population: "16,000",
    avgPrice: "AED 2.1M",
    description: "The vibrant heart of Dubai, home to Burj Khalifa and Dubai Mall.",
    growth: "8.2%",
    category: "Premium",
  },
  {
    name: "Dubai Marina",
    coordinates: [25.0805, 55.1403],
    roi: "7.2%",
    population: "70,000",
    avgPrice: "AED 1.8M",
    description: "A luxurious waterfront community with stunning skyscrapers.",
    growth: "7.9%",
    category: "Premium",
  },
  {
    name: "Palm Jumeirah",
    coordinates: [25.112, 55.1389],
    roi: "5.8%",
    population: "25,000",
    avgPrice: "AED 3.5M",
    description: "Iconic man-made island with luxury villas and hotels.",
    growth: "6.5%",
    category: "Luxury",
  },
  {
    name: "Business Bay",
    coordinates: [25.1857, 55.2632],
    roi: "6.8%",
    population: "30,000",
    avgPrice: "AED 1.9M",
    description: "A bustling business hub with modern office spaces.",
    growth: "7.1%",
    category: "Emerging",
  },
  {
    name: "Jumeirah Village Circle",
    coordinates: [25.0572, 55.219],
    roi: "8.0%",
    population: "40,000",
    avgPrice: "AED 950K",
    description: "A popular residential community with affordable housing.",
    growth: "9.3%",
    category: "Affordable",
  },
  {
    name: "Dubai Silicon Oasis",
    coordinates: [25.1212, 55.3773],
    roi: "7.5%",
    population: "35,000",
    avgPrice: "AED 900K",
    description:
      "Tech-driven community with a mix of business and residential properties.",
    growth: "8.1%",
    category: "Tech Hub",
  },
  {
    name: "Al Barsha",
    coordinates: [25.1119, 55.2007],
    roi: "6.0%",
    population: "60,000",
    avgPrice: "AED 1.4M",
    description:
      "A well-developed neighborhood with schools, malls, and hospitals.",
    growth: "5.7%",
    category: "Family Friendly",
  },
  {
    name: "Dubai Sports City",
    coordinates: [25.0458, 55.2259],
    roi: "7.1%",
    population: "15,000",
    avgPrice: "AED 800K",
    description: "Home to sports facilities and affordable living options.",
    growth: "6.9%",
    category: "Affordable",
  },
  {
    name: "Mirdif",
    coordinates: [25.221, 55.4105],
    roi: "6.3%",
    population: "45,000",
    avgPrice: "AED 1.2M",
    description: "A peaceful suburban area with villas and parks.",
    growth: "6.0%",
    category: "Suburban",
  },
  {
    name: "Dubai Creek Harbour",
    coordinates: [25.2084, 55.3436],
    roi: "7.6%",
    population: "10,000",
    avgPrice: "AED 2.3M",
    description:
      "A waterfront development with views of the future tallest tower.",
    growth: "9.0%",
    category: "Emerging",
  },
  {
    name: "Jumeirah Lake Towers (JLT)",
    coordinates: [25.0657, 55.1415],
    roi: "6.9%",
    population: "60,000",
    avgPrice: "AED 1.5M",
    description:
      "A mixed-use development with high-rise buildings around lakes.",
    growth: "6.7%",
    category: "Premium",
  },
  {
    name: "Arabian Ranches",
    coordinates: [25.0433, 55.2708],
    roi: "5.5%",
    population: "20,000",
    avgPrice: "AED 2.6M",
    description: "Luxury villas in a peaceful gated community.",
    growth: "5.9%",
    category: "Luxury",
  },
];

const DubaiMapContent = () => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([25.2048, 55.2708], 11);

    // Add satellite/hybrid themed tiles with better visibility
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(map);

    // Add custom zoom control
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Create custom marker icon
    const customIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Store map reference
    mapRef.current._leaflet_map = map;

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  // Update markers when filter changes
  useEffect(() => {
    if (!mapRef.current?._leaflet_map) return;

    const map = mapRef.current._leaflet_map;

    // Clear existing markers
    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    // Create custom marker icon
    const customIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add filtered markers
    filteredAreas.forEach((area) => {
      const marker = L.marker([area.coordinates[0], area.coordinates[1]], {
        icon: customIcon,
      }).addTo(map);

      // Add popup with area info
      marker.bindPopup(
        `
        <div class="bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white p-6 rounded-tl-[2rem] rounded-br-[2rem] min-w-[200px]">
          <h3 class="text-lg font-bold mb-2">${area.name}</h3>
          <p class="text-sm mb-2">${area.description}</p>
          <div class="flex justify-between text-xs">
            <span class="text-white">ROI: ${area.roi}</span>
            <span class="text-white">${area.category}</span>
          </div>
        </div>
      `,
        {
          closeButton: false,
          className: "custom-popup",
        }
      );

      marker.on("click", () => {
        setSelectedArea(area);
        map.flyTo([area.coordinates[0], area.coordinates[1]], 14, {
          duration: 1,
        });
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all filtered markers if there are any
    if (filteredAreas.length > 0 && filteredAreas.length < dubaiAreas.length) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [filterCategory, searchTerm]);

  // Handle area click from investment zones panel
  const handleAreaClick = (area) => {
    setSelectedArea(area);
    if (mapRef.current?._leaflet_map) {
      const map = mapRef.current._leaflet_map;
      map.flyTo([area.coordinates[0], area.coordinates[1]], 14, {
        duration: 1,
      });
    }
  };

  // Filter areas based on search and category
  const filteredAreas = dubaiAreas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || area.category === filterCategory)
  );

  return (
    <section className="bg-earth-50">
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4 text-black flex items-center justify-center font-sans">
            <span className="text-[#ac895e] shine-effect mr-2">Dubai</span>{" "}
            Investment Map
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>
        </div>

        <div className="relative w-full h-[85vh] bg-gradient-to-br from-earth-50 to-earth-100 overflow-hidden border-3 border-earth-300 shadow-2xl">
          {/* Map Container */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Control Panel */}
          <div
            className={`absolute h-[80vh] top-6 left-6 w-80 bg-white/95 backdrop-blur-lg rounded-tl-2xl rounded-br-2xl shadow-xl transition-all duration-500 border border-earth-200 z-30 ${
              isPanelOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-96 opacity-0"
            }`}
          >
            <div className="p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-earth-800 font-sans">
                  Investment Zones
                </h3>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="text-earth-400 hover:text-earth-600 transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-earth-50 text-earth-800 rounded-tl-lg rounded-br-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 font-sans"
              />

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-earth-50 text-earth-800 rounded-tl-lg rounded-br-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ac895e] border border-earth-200 font-sans"
              >
                <option value="All">All Categories</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
                <option value="Emerging">Emerging</option>
              </select>

              {/* Area List */}
              <div className=" overflow-y-scroll h-[55vh] space-y-3">
                {filteredAreas.map((area) => (
                  <div
                    key={area.name}
                    onClick={() => handleAreaClick(area)}
                    className="p-4 bg-earth-50 rounded-tl-xl rounded-br-xl hover:bg-earth-100 cursor-pointer transition-all duration-300 border border-earth-200"
                  >
                    <h4 className="text-lg font-semibold text-earth-800 font-sans">
                      {area.name}
                    </h4>
                    <p className="text-sm text-earth-600 font-sans">
                      {area.description}
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-[#ac895e] font-bold text-sm">
                        ROI: {area.roi}
                      </span>
                      <span className="text-earth-600 text-sm">
                        {area.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Area Details Panel */}
          {selectedArea && (
            <div className="absolute bottom-6 right-6 w-96 bg-white/95 backdrop-blur-lg rounded-tl-2xl rounded-br-2xl shadow-xl p-6 border border-earth-200 z-30">
              <h3 className="text-2xl font-bold text-earth-800 mb-2 font-sans">
                {selectedArea.name}
              </h3>
              <p className="text-sm text-earth-600 mb-4 font-sans">
                {selectedArea.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-earth-50 p-3 rounded-tl-lg rounded-br-lg border border-earth-200">
                  <span className="text-earth-600 font-medium text-sm font-sans">
                    ROI
                  </span>
                  <p className="text-[#ac895e] text-lg font-bold font-sans">
                    {selectedArea.roi}
                  </p>
                </div>
                <div className="bg-earth-50 p-3 rounded-tl-lg rounded-br-lg border border-earth-200">
                  <span className="text-earth-600 font-medium text-sm font-sans">
                    Growth
                  </span>
                  <p className="text-earth-800 text-lg font-bold font-sans">
                    {selectedArea.growth}
                  </p>
                </div>
                <div className="bg-earth-50 p-3 rounded-tl-lg rounded-br-lg border border-earth-200">
                  <span className="text-earth-600 font-medium text-sm font-sans">
                    Population
                  </span>
                  <p className="text-earth-800 text-lg font-bold font-sans">
                    {selectedArea.population}
                  </p>
                </div>
                <div className="bg-earth-50 p-3 rounded-tl-lg rounded-br-lg border border-earth-200">
                  <span className="text-earth-600 font-medium text-sm font-sans">
                    Avg. Price
                  </span>
                  <p className="text-earth-800 text-lg font-bold font-sans">
                    {selectedArea.avgPrice}
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white py-3 rounded-tl-xl rounded-br-xl hover:bg-[#6b563d]  duration-300 shadow-lg font-sans font-medium">
                Explore Properties
              </button>
            </div>
          )}

          {/* Toggle Panel Button */}
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="inline-flex items-center px-6 py-3 text-base bg-gradient-to-r from-[#866c4c] to-[#ac895e] btn-glass text-white rounded-tl-[2rem] rounded-br-[2rem] transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">
                {isPanelOpen ? "Hide Panel" : "Show Panel"}
              </span>

              <span className="absolute inset-0 w-full h-full">
                <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1000"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DubaiMapContent;


