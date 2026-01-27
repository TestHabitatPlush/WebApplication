const MemberSummaryTable = ({
  loading,
  units,
  onUnitClick,
  selectedUnitId,
}) => {
  if (loading) return <p>Loading units...</p>;

  if (!units.length)
    return <p className="text-gray-500">No unit assigned</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">User ID</th>
          <th className="p-2 border">Unit ID</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {units.map((unit) => (
          <tr
            key={unit.unitId}
            onClick={() => onUnitClick(unit.unitId)}
            className={`cursor-pointer ${
              selectedUnitId === unit.unitId
                ? "bg-blue-100 font-semibold"
                : ""
            }`}
          >
            <td className="p-2 border">{unit.userId}</td>
            <td className="p-2 border">{unit.unitId}</td>
            <td className="p-2 border">{unit.status || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberSummaryTable;
