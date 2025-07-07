export default function AgentCard({ name, phone, email }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="h-24 w-24 bg-gray-200 rounded-full mr-6" />
      <div>
        <h4 className="text-xl font-bold">{name}</h4>
        <p className="text-gray-600">📞 {phone}</p>
        <p><a href={`mailto:${email}`} className="text-blue-600">{email}</a></p>
      </div>
    </div>
  );
}
