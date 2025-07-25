"use client";

import { useState, useEffect } from "react";

export default function ProjectGallery({ images = [] }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      const urls = images.map((img) => img.original?.url);
      setGalleryImages(urls);
      setSelectedImage(urls[0]);
    }
  }, [images]);

  if (galleryImages.length === 0) return null;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Main Image */}
        <div className="w-full aspect-video bg-gray-100 overflow-hidden rounded-xl mb-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
    
        {/* Thumbnail Grid */}  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> 
          {galleryImages.slice(0, 8).map((img, idx) => (    
            <button 
              key={idx} 
              onClick={() => setSelectedImage(img)} 
              className={`rounded-lg overflow-hidden border-2 ${    
                selectedImage === img ? "border-green-500" : "border-transpa    rent"
              }`}   
            >   
              <img  
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-24 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
