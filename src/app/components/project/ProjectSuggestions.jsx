import Link from "next/link";

export default function ProjectSuggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <section className="bg-white p-6 mt-10 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {suggestions.map((property) => {
          const image = property.media?.images?.[0]?.watermarked?.url;
          const title = property.title?.en;
          const price = property.price?.amounts?.sale;
          const reference = property.reference;

          return (
            <Link
              key={property.id}
              href={`/projects/${property.id}`}
              className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-gray-700 mb-1">AED {price?.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Ref: {reference}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
