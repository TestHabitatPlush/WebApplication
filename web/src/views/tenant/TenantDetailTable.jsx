const TenantDetailTable = ({ members }) => {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Unit</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        {members.map((m) => (
          <tr key={m.userId}>
            <td>{m.firstName} {m.lastName}</td>
            <td>{m.email || "-"}</td>
            <td>{m.mobileNumber || "-"}</td>
            <td>{m.unit?.unitId || "-"}</td>
            <td>{m.role?.roleCategory || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};




export default TenantDetailTable;
