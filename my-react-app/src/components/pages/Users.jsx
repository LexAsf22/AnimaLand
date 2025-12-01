export default function Users() {
  const users = [
    { id: 1, name: "Buddy", species: "Dog", owner: "Alice Johnson" },
    { id: 2, name: "Whiskers", species: "Cat", owner: "Michael Lee" },
    { id: 3, name: "Chirpy", species: "Parrot", owner: "Sarah Kim" },
    { id: 4, name: "Nibbles", species: "Rabbit", owner: "John Smith" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-green-900">Patients</h1>

      <table className="min-w-full bg-white border border-green-200 rounded-md shadow-md">
        <thead className="bg-green-200 text-green-900">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Species</th>
            <th className="text-left p-3">Owner</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-green-200 hover:bg-green-50 transition"
            >
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.species}</td>
              <td className="p-3">{user.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
