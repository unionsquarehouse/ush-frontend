// components/project/ProjectFeatures.jsx
export default function ProjectFeatures({ features, amenities }) {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Features</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 mb-6">
        {features?.map((item, idx) => (
          <li key={idx} className="before:content-['•'] before:mr-2">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-medium mb-3">Amenities</h3>
      <ul className="flex flex-wrap gap-3 text-gray-600">
        {amenities?.map((amenity, idx) => (
          <li key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
            {amenity.replace(/-/g, " ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
