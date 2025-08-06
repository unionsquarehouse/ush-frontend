
import { FaMapMarkerAlt } from "react-icons/fa";



export default function ProjectMap({ location }) {
  const encodedAddress = encodeURIComponent(location);

  return (
    <section className="bg-white  p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300 text-brand">
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaMapMarkerAlt className="text-brand h-6 w-6"/> Location</h2>
        <p className="mb-4">{location}</p>
      </div>
      <div className="w-full h-64 md:h-96  overflow-hidden">
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
