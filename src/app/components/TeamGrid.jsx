const team = [
  { name: 'John Doe', role: 'Managing Director', img: null },
  { name: 'Jane Smith', role: 'Senior Broker', img: null },
  // Add your agents
];

export default function TeamGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {team.map(a => (
        <div key={a.name} className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="h-40 w-40 bg-gray-200 rounded-full mx-auto mb-4" />
          <h4 className="text-xl font-bold">{a.name}</h4>
          <p className="text-gray-600">{a.role}</p>
        </div>
      ))}
    </div>
  );
}
