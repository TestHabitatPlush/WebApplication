"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import ReusableTable from "@/components/shared/ReusableTable";
import UnitHandler from "@/handlers/UnitHandler";
import UserHandler from "@/handlers/UserHandler";

const Notification = () => {
  const { getUnitsHandler } = UnitHandler();
  const {getUsersBySocietyHandler}=UserHandler();

  const societyId = useSelector((state) => state.society.selectedSocietyId);
  const token = useSelector((state) => state.auth.token);

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // use backend total count

  useEffect(() => {
    if (!societyId || !token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const units = await getUnitsHandler();

        // Fetch users from updated handler
        const response = await getUsersBySocietyHandler(societyId, token, {
          page: pageIndex,
          pageSize,
          // roleCategory: "society_tenant", // Optional: filter by roleCategory
        });

        // backend returns { success, count, data }
        const users = response; // getUsersBySocietyHandler now returns `data` array
        setTotalCount(users.length); // or use response.count if handler returns it

        // Build unitId → unitName map
        const unitMap = {};
        units.forEach((u) => {
          unitMap[u.unitId] = u.unitName;
        });

        // Map users to table rows
       
          const merged = users.map((user, index) => ({
          slno: pageIndex * pageSize + index + 1, 
          unitId: user.unitId || "-",
          unitName: unitMap[user.unitId] || "-",
          userName: `${user.firstName || ""} ${user.lastName || ""}`,
          roleName: user.role?.roleName || "-",
        }));

        setTableData(merged);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [societyId, token, pageIndex, pageSize]);

  const columns = useMemo(
    () => [
      { Header: "S.No.", accessor: "slno" },
      { Header: "Unit ID", accessor: "unitId" },
      { Header: "Unit Name", accessor: "unitName" },
      { Header: "User Name", accessor: "userName" },
      { Header: "Role", accessor: "roleName" },
      {
        Header: "Action",
        Cell: () => (
          <button className="w-8 h-8 text-white bg-teal-600 rounded-full hover:bg-teal-700">
            <FaEye size={14} />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="mb-4 text-2xl font-semibold">Unit – User Mapping</h2>

      {loading ? (
        <p className="py-10 text-center text-gray-500">Loading data...</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={tableData}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalPages={Math.ceil(totalCount / pageSize)} // use backend total
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          totalCount={totalCount} // backend total
        />
      )}
    </div>
  );
};

export default Notification;
