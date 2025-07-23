// pages/index.js
import Masonry from 'react-masonry-css';
import Image from 'next/image';

const propertyData = [
  { id: 1, label: 'Luxury Villas', img: '/assets/damac_hills.jpg' },
  { id: 2, label: 'Penthouse Suites', img: '/assets/damac_towers.jpg' },
  { id: 3, label: 'Apartments', img: '/assets/deira_islands.jpg' },
  { id: 4, label: 'Beachfront Properties', img: '/beachfront.jpg' },
  { id: 5, label: 'Golf Course Residences', img: '/golf.jpg' },
  { id: 6, label: 'Commercial Spaces', img: '/commercial.jpg', link: true },
  { id: 7, label: 'Townhouses', img: '/townhouses.jpg', link: true },
  { id: 8, label: 'Waterfront Homes', img: '/waterfront.jpg' },
  { id: 9, label: 'Holiday Homes', img: '/holiday.jpg', link: true },
  { id: 10, label: 'Investment', img: '/investment.jpg', link: true },
  { id: 11, label: 'Eco-friendly Properties', img: '/eco.jpg' },
  { id: 12, label: 'Desert Retreats', img: '/desert.jpg', link: true },
];

const breakpointColumnsObj = {
  default: 5,
  1280: 4,
  1024: 3,
  768: 2,
  500: 1,
};

export default function DiscoverProperty() {
  return (
    <div className="pb-32 bg-gray-100 min-h-screen ">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4  w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto"
        columnClassName="space-y-4"
      >
        {propertyData.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-2xl shadow group"
          >
            <Image
              src={item.img}
              alt={item.label}
              width={400}
              height={500}
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <p className="text-sm font-light">{String(item.id).padStart(2, '0')}</p>
              <h3 className="text-lg font-semibold">{item.label}</h3>
            </div>
            {item.link && (
              <div className="absolute top-3 right-3 bg-white rounded-full p-1 hover:scale-110 transition z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {/* Center Card */}
        <div className="bg-white text-center rounded-xl p-6 shadow-lg flex flex-col justify-center items-center">
          <div className="text-gray-800 text-md mb-3">
            Explore Our Diverse Range of Property Types and Find Your Perfect Match
          </div>
          <a
            href="/catalog.pdf"
            download
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800"
          >
            Catalog Download
          </a>
        </div>
        {propertyData.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-2xl shadow group"
          >
            <Image
              src={item.img}
              alt={item.label}
              width={400}
              height={500}
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <p className="text-sm font-light">{String(item.id).padStart(2, '0')}</p>
              <h3 className="text-lg font-semibold">{item.label}</h3>
            </div>
            {item.link && (
              <div className="absolute top-3 right-3 bg-white rounded-full p-1 hover:scale-110 transition z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
}
