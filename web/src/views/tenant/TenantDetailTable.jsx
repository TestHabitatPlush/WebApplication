const TenantDetailTable = ({ tenants }) => {
  if (!tenants.length) {
    return <p className="text-gray-500">No tenant family found</p>;
  }

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        {tenants.map((t) => (
          <tr key={t.userId}>
            <td>{t.firstName} {t.lastName}</td>
            <td>{t.email}</td>
            <td>{t.mobileNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TenantDetailTable;
