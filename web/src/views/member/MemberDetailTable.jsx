const MemberDetailTable = ({ unitId, members }) => {
  if (!members || !members.length)
    return <p>No members found for Unit {unitId}</p>;

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">
        Members of Unit {unitId}
      </h3>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Unit ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role Category</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m, idx) => (
            <tr key={m.userId || idx}>
              <td className="p-2 border">{m.userId}</td>
              <td className="p-2 border">{m.unitId}</td>
              <td className="p-2 border">
                {m.firstName} {m.lastName}
              </td>
              <td className="p-2 border">{m.mobileNumber}</td>
              <td className="p-2 border">{m.email}</td>
              <td className="p-2 border">
                {m.userRole?.roleCategory || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDetailTable;
