import PropertyCard from './PropertyCard';

const projects = [
  { title: 'Terra Golf Collection', loc: 'Jumeirah Golf Estates', info: 'From AED 7.2M • 6BR Villas & Townhouses' },
  { title: 'South Living', loc: 'Dubai South', info: 'Studio to 3BR • From AED 600K' },
  { title: 'Park Views Residences', loc: 'Dubai', info: '1–4 BR Apartments • From AED 1.45M' },
];

export default function FeaturedProjects() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-0">
        <h2 className="text-3xl font-semibold text-center mb-12">Featured Projects</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map(p => <PropertyCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  );
}
