import TeamGrid from "../components/TeamGrid";

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 md:px-0 text-center">
        <h2 className="text-3xl font-semibold mb-6">About Union Square House</h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-12">
          Recognised by developers like Emaar, Meraas, Damac for consistent excellence…
        </p>
        <TeamGrid />
      </div>
    </section>
  );
}
