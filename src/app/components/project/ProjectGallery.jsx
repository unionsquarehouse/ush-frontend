"use client";

import { useState, useEffect } from "react";

export default function ProjectGallery({ images = [] }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      const urls = images.map((img) => img.original?.url);
      setGalleryImages(urls);
      setSelectedImage(urls[0]);
    }
  }, [images]);

  if (galleryImages.length === 0) return null;

  return (
    <>
      <div className="py-32 relative bg-white">
 
        
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          {/* Main Image Container */}
          <div className="relative group">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-3xl ">
              <img
                src={selectedImage}
                alt="Selected Property"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              
              
              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 group/btn"
              >
                <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {galleryImages.findIndex(img => img === selectedImage) + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
    
          {/* Thumbnail Grid */}  
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"> 
            {galleryImages.slice(0, 12).map((img, idx) => (    
              <button 
                key={idx} 
                onClick={() => setSelectedImage(img)} 
                className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${    
                  selectedImage === img 
                    ? "ring-4 ring-blue-500 ring-offset-2 ring-offset-gray-900 scale-105" 
                    : "hover:scale-105 hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-gray-900"
                }`}   
              >   
                <div className="aspect-[4/3] bg-gray-800">
                  <img  
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    selectedImage === img 
                      ? "bg-blue-500/20" 
                      : "bg-black/20 group-hover:bg-black/10"
                  }`}></div>
                  
                  {/* Selected Indicator */}
                  {selectedImage === img && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
            
            {/* Show More Button */}
            {galleryImages.length > 12 && (
              <button 
                onClick={() => setIsFullscreen(true)}
                className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center text-white">
                  <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium">+{galleryImages.length - 12} More</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main Image */}
            <img
              src={selectedImage}
              alt="Fullscreen"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    selectedImage === img ? "bg-white" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
