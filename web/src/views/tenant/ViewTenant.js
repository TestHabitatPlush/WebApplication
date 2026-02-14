import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ReusableTable from "@/components/shared/ReusableTable";
import MemberHandler from "@/handlers/MemberHandler";
import BackButton from "@/components/shared/BackButton";
const ViewTenant = () => {
  const user = useSelector((state) => state.auth?.user);
  const unitId = user?.unitId;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getMemberDetailsHandler } = MemberHandler();

  useEffect(() => {
    if (!unitId) return;

    const loadMembers = async () => {
      setLoading(true);

      const members = await getMemberDetailsHandler(unitId);
console.log(members)
      setData(members);
      setLoading(false);
    };

    loadMembers();
  }, [unitId]);

  // ✅ Columns
const columns = useMemo(
  () => [
    { Header: "User ID", accessor: "userId" },
     {
      Header: "Unit",
      accessor: "unitId"
    },
    {
      Header: "Name",
      Cell: ({ row }) =>
        `${row.original.firstName} ${row.original.lastName}`,
    },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile", accessor: "mobileNumber" },
   
    {
      Header: "Role",
      Cell: ({ row }) => row.original.role?.roleCategory || "-",
    },
  ],
  []
);
  return (
    <div className="p-5">
      <BackButton />
      <h2 className="mb-4 text-xl font-bold">Tenant Members</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={data}
          pageIndex={0}
          pageSize={data.length || 10}
          totalCount={data.length}
          totalPages={1}          // 🔑 VERY IMPORTANT
          setPageIndex={() => {}}
          setPageSize={() => {}}
        />
      )}
    </div>
  );
};

export default ViewTenant;
