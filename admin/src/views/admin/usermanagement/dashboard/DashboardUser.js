
import React, { useEffect, useState } from "react";
import { FaUsers, FaBuilding } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import UserHandler from "../../../../handlers/UserHandler";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";
import { useSelector } from "react-redux";

const DashboardUser = () => {

  const paths = ["User", "Add"];
  const { getAllApprovedUserDataHandler, getResidentBySocietyIdHandler } = UserHandler();
  const { getUnitsHandler } = DefineUnitHandler();

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  const [approvedUsersCount, setApprovedUsersCount] = useState(0);
  const [unapprovedUsersCount, setUnapprovedUsersCount] = useState(0);
  const [unitCount, setUnitCount] = useState(0);

  useEffect(() => {
    if (societyId && token) {
      fetchUserCounts();
      fetchUnitCounts();
    } else {
      console.error("Missing Society ID or Token. Please check authentication.");
    }
  }, [societyId, token]);

  const fetchUserCounts = async () => {
    try {
      const approvedUsersResponse = await getAllApprovedUserDataHandler(societyId, token, { page: 0, pageSize: 1000 });

      const approvedUsers = Array.isArray(approvedUsersResponse) ? approvedUsersResponse.length : 0;

      const unapprovedUsersResponse = await getResidentBySocietyIdHandler(societyId, token, { page: 0, pageSize: 1000 });

      const unapprovedUsers = Array.isArray(unapprovedUsersResponse?.residents) ? unapprovedUsersResponse.residents.length : 0;

      setApprovedUsersCount(approvedUsers);
      setUnapprovedUsersCount(unapprovedUsers);
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

 const fetchUnitCounts = async () => {
  try {
    const unitResponse = await getUnitsHandler(societyId, token, { page: 0, pageSize: 1000 });

    console.log("unitResponse:", unitResponse);

    // Extract the unit count correctly from `data`
    const unitDetails = Array.isArray(unitResponse?.data) ? unitResponse.data.length : 0;

    setUnitCount(unitDetails);
  } catch (error) {
    console.error("Error fetching unit counts:", error);
  }
};
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-6">
        <div className="grid grid-cols-3 gap-4 mt-4  ">
        <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold text-blue-600 border-b pb-2 mb-4">Units & Users</h2>
      <div className="flex justify-between">

        <div className="flex items-center space-x-3">
          <FaUsers className="text-2xl text-gray-700" />
          <div>
            <h3 className="text-xl font-semibold text-green-700">{approvedUsersCount + unapprovedUsersCount}</h3>
            <p className="text-lg text-gray-500">Total Users</p>
            <p><a href={`${process.env.REACT_APP_PUBLIC_BASE_URL}user/unapproved`} className="text-sm text-gray-500 hover:underline">
            {unapprovedUsersCount} Unapproved Users
            </a></p>
            <p><a href={`${process.env.REACT_APP_PUBLIC_BASE_URL}user/approved`} className="text-sm text-gray-500 hover:underline">
            {approvedUsersCount} Approved Users
            </a></p>
            {/* <p className="text-xs text-gray-400">11 Never Logged In</p> */}
          </div>
        </div>

       
        <div className="flex items-center space-x-3">
          <FaBuilding className="text-2xl text-gray-700" />
          <div>
            <h3 className="text-xl font-semibold text-green-700">{unitCount}</h3>
            <p className="text-lg text-gray-500">Total Units</p>
            <p><a href={`${process.env.REACT_APP_PUBLIC_BASE_URL}unit/view`} className="text-sm text-gray-500 hover:underline">
            {unitCount} Unit List
            </a></p>
            
          </div>
        </div>
      </div>
    </div>
          {/* <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-bold">HelpDesk Tracker</h2>
            <p>Open Requests</p>
            <p className="text-xl font-semibold">50 / 25</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-bold">Finance & Statistics</h2>
            <p>Income & Expenses</p>
            <p className="text-xl font-semibold text-green-500">₹64,900</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg col-span-3 h-32 flex items-center justify-center border border-dashed">
            <h2 className="text-lg font-bold text-gray-500">Reserved Space</h2>
          </div>

          <div className="bg-white p-4 shadow rounded-lg col-span-3">
            <h2 className="text-lg font-bold">Management Related</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="p-2 bg-gray-200 rounded text-center">Facility & Activity</div>
              <div className="p-2 bg-gray-200 rounded text-center">Projects & Meetings</div>
              <div className="p-2 bg-gray-200 rounded text-center">Assets & Inventory</div>
            </div>
          </div> */}
        </div>
        </div>
        </div>
  );
};

export default DashboardUser;

