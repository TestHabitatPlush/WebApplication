import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserHandler from "../../../../handlers/UserHandler";
import ReusableTable from "../../../../components/shared/ReusableTable";
import {
  setPage as setReduxPage,
  setPageSize as setReduxPageSize,
} from "../../../../redux/slices/societySlice";

const SocietyModeratorList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token || null);
  const societyId = useSelector((state) => state.auth?.user?.societyId);

  const { getAllSuperAdminItAndModeratorHandler } = UserHandler();

  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchModerators = async () => {
  try {
    setLoading(true);

    const res = await getAllSuperAdminItAndModeratorHandler(token, {
      page,
      pageSize,
    });

    console.log("Raw API data:", res);

    // Assuming API returns { data: [], total, totalPages }
    if (res && Array.isArray(res.users)) {
      const transformed = res.users.map((m, index) => ({
        slNo: (page - 1) * pageSize + index + 1,
        title: `${m.firstName || m.first_name || ""} ${m.lastName || m.last_name || ""}`.trim(),
        firstName: m.firstName || m.first_name || "",
        lastName: m.lastName || m.last_name || "",
        email: m.email || m.emailId || "",
        mobileNumber: m.mobileNumber || m.mobile || "",
        roleId: m.roleId || m.role || "",
        status: m.status || "",
      }));

      setModerators(transformed);
      setTotal(res.total || transformed.length);
      setTotalPages(res.totalPages || 1);
    } else {
      setModerators([]);
      setTotal(0);
      setTotalPages(0);
    }
  } catch (err) {
    console.error("Error fetching moderators:", err);
    setError("Failed to load moderators");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchModerators();
  }, [page, pageSize]);

  const columns = [
    { Header: "Sl No", accessor: "slNo" },
    { Header: "Title", accessor: "title" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile", accessor: "mobileNumber" },
    { Header: "Role", accessor: "roleId" },
    { Header: "Status", accessor: "status" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Society Moderators</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ReusableTable
        columns={columns}
        data={moderators}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={(index) => {
          setPage(index);
          dispatch(setReduxPage(index));
        }}
        setPageSize={(size) => {
          setPageSize(size);
          dispatch(setReduxPageSize(size));
        }}
      />
    </div>
  );
};

export default SocietyModeratorList;
