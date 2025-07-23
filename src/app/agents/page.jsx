

const agents = [
  { name: 'John Doe', phone: '+971 50 1234567', email: 'john@ushre.com', img: null },
  { name: 'Jane Smith', phone: '+971 50 7654321', email: 'jane@ushre.com', img: null },
];

export default function AgentsPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 md:px-0">
        <h2 className="text-3xl text-center mb-12">Meet Our Agents</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {agents.map(a => <AgentCard key={a.email} {...a} />)}
        </div>
      </div>
    </section>
  );
}
