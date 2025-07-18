"use client";

import dynamic from 'next/dynamic';

// Dynamically import the map component to prevent SSR issues
const DubaiMapContent = dynamic(() => import('./DubaiMapContent'), {
  ssr: false,
  loading: () => <div className="h-screen bg-earth-900 flex items-center justify-center">
    <div className="text-white">Loading Map...</div>
  </div>
});

export default function DubaiInteractiveMap() {
  return <DubaiMapContent />;
}

