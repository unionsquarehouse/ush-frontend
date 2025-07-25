// components/project/ProjectMap.jsx
export default function ProjectMap({ location }) {
  const encodedAddress = encodeURIComponent(location);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      <p className="mb-4 text-gray-600">{location}</p>
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
        />
      </div>
    </section>
  );
}
