import React, { useEffect, useState } from "react";
import { FaUsers, FaBuilding, FaCar, FaIdCard, FaFileAlt, FaFrown, FaAddressBook } from "react-icons/fa";
import { GiGate } from 'react-icons/gi';
import UserHandler from "../../../../handlers/UserHandler";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import VisitEntryHandler from "../../../../handlers/VisitorEntryHandler";
import GateHandler from "../../../../handlers/GateHandler";
import EmergencyContactHandler from "../../../../handlers/EmergencyContactHandler";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const { getAllApprovedUserDataHandler, getResidentBySocietyIdHandler } = UserHandler();
  const { getUnitsHandler } = DefineUnitHandler();
  const { getParkingHandler } = ParkingHandler();
  const { getNewVisitorEntryTable } = VisitEntryHandler();
  const { getGateListHandler } = GateHandler();
  const { getEmergencyContactHandler } = EmergencyContactHandler();

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  const [approvedUsersCount, setApprovedUsersCount] = useState(0);
  const [unapprovedUsersCount, setUnapprovedUsersCount] = useState(0);
  const [unitCount, setUnitCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [approvedSecurityCount, setApprovedSecurityCount] = useState(0);
  const [unapprovedSecurityCount, setUnapprovedSecurityCount] = useState(0);
  const [emergencyContactCount, setEmergencyContactCount] = useState(0);

  useEffect(() => {
    if (societyId && token) {
      fetchUserCounts();
      fetchUnitCounts();
      fetchParkingSlotCounts();
      fetchVisitorCounts();
      fetchSecurityGuardCounts();
      fetchEmergencyContactCounts();
    } else {
      console.error("Missing Society ID or Token. Please check authentication.");
    }
  }, [societyId, token]);

  const fetchUserCounts = async () => {
    try {
      const approvedUsersResponse = await getAllApprovedUserDataHandler(societyId, token, { page: 0, pageSize: 1000 });
      const unapprovedUsersResponse = await getResidentBySocietyIdHandler(societyId, token, { page: 0, pageSize: 1000 });

      const approvedUsers = Array.isArray(approvedUsersResponse) ? approvedUsersResponse.length : 0;
      const unapprovedUsers = Array.isArray(unapprovedUsersResponse?.residents)
        ? unapprovedUsersResponse.residents.length
        : 0;

      setApprovedUsersCount(approvedUsers);
      setUnapprovedUsersCount(unapprovedUsers);
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  const fetchUnitCounts = async () => {
    try {
      const unitResponse = await getUnitsHandler(societyId, token, { page: 0, pageSize: 1000 });
      const unitDetails = Array.isArray(unitResponse?.data) ? unitResponse.data.length : 0;
      setUnitCount(unitDetails);
    } catch (error) {
      console.error("Error fetching unit counts:", error);
    }
  };

  const fetchParkingSlotCounts = async () => {
    try {
      const parkingResponse = await getParkingHandler(societyId, token, { page: 0, pageSize: 1000 });
      const parkingDetails = Array.isArray(parkingResponse?.data) ? parkingResponse.data.length : 0;
      setParkingCount(parkingDetails);
    } catch (error) {
      console.error("Error fetching parking counts:", error);
    }
  };

  const fetchVisitorCounts = async () => {
    try {
      const response = await getNewVisitorEntryTable({ page: 0, pageSize: 1000 });
      const data = response?.data?.data;
      const count = Array.isArray(data) ? data.length : 0;
      setVisitorCount(count);
    } catch (error) {
      console.error("Error fetching visitor counts:", error);
    }
  };

  const fetchSecurityGuardCounts = async () => {
    try {
      const approvedSecurityResponse = await getGateListHandler(societyId, token, { page: 0, pageSize: 1000 });
      const unapprovedSecurityResponse = await getResidentBySocietyIdHandler(societyId, token, { page: 0, pageSize: 1000 });

      const approvedSecurityCount = Array.isArray(approvedSecurityResponse) ? approvedSecurityResponse.length : 0;
      const unapprovedSecurityCount = Array.isArray(unapprovedSecurityResponse?.residents)
        ? unapprovedSecurityResponse.residents.length
        : 0;

      setApprovedSecurityCount(approvedSecurityCount);
      setUnapprovedSecurityCount(unapprovedSecurityCount);
    } catch (error) {
      console.error("Error fetching Security counts:", error);
    }
  };

  // FIXED: Correct call structure for getEmergencyContactHandler
  const fetchEmergencyContactCounts = async () => {
    try {
      if (!societyId || !token) {
        console.error("Missing societyId or token");
        return;
      }
      const response = await getEmergencyContactHandler({
        societyId,
        token,
        params: { page: 0, pageSize: 1000 },
      });

      // Adjust extraction based on your API response shape
      const data = response?.data?.data || response?.data || [];
      setEmergencyContactCount(Array.isArray(data) ? data.length : 0);
    } catch (error) {
      console.error("Error fetching Emergency Contacts:", error);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Units & Users */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Units & Users</h2>
          <div className="flex justify-between">
            <div className="flex items-center space-x-3">
              <FaUsers className="text-2xl text-gray-700" />
              <div>
                <h3 className="text-xl font-semibold text-green-700">
                  {approvedUsersCount + unapprovedUsersCount}
                </h3>
                <p className="text-lg text-gray-500">Total Users</p>
                <p>
                  <a href={`${process.env.REACT_APP_PUBLIC_BASE_URL}/user/unapproved`} className="text-sm text-gray-500 hover:underline">
                    {unapprovedUsersCount} Unapproved Users
                  </a>
                </p>
                <p>
                  <a href={`${process.env.REACT_APP_PUBLIC_BASE_URL}/user/approved`} className="text-sm text-gray-500 hover:underline">
                    {approvedUsersCount} Approved Users
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaBuilding className="text-2xl text-gray-700" />
              <div>
                <h3 className="text-xl font-semibold text-green-700">{unitCount}</h3>
                <p className="text-lg text-gray-500">Total Units</p>
                <p>
                  <a href={`${process.env.REACT_APP_PUBLIC_BASE_URL}/unit/view`} className="text-sm text-gray-500 hover:underline">
                    {unitCount} Unit List
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Parking */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Vehicle Parking</h2>
          <div className="flex items-center space-x-3">
            <FaCar className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{parkingCount}</h3>
              <p className="text-lg text-gray-500">Total Parking Slots</p>
            </div>
          </div>
        </div>

        {/* Visitor */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Visitor</h2>
          <div className="flex items-center space-x-3">
            <FaIdCard className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{visitorCount}</h3>
              <p className="text-lg text-gray-500">Total Visitors</p>
            </div>
          </div>
        </div>

        {/* Gate & Security */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Gate & Security </h2>
          <div className="flex items-center space-x-3">
            <GiGate className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{approvedSecurityCount}</h3>
              <p className="text-lg text-gray-500">Total Gate </p>
            </div>
          </div>
        </div>

        {/* Document */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Document</h2>
          <div className="flex items-center space-x-3">
            <FaFileAlt className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{approvedSecurityCount}</h3>
              <p className="text-lg text-gray-500">Total Document </p>
            </div>
          </div>
        </div>

        {/* Complain */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Complain </h2>
          <div className="flex items-center space-x-3">
            <FaFrown className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{approvedSecurityCount}</h3>
              <p className="text-lg text-gray-500">Total complain</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">Emergency Contact</h2>
          <div className="flex items-center space-x-3">
            <FaAddressBook className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">{emergencyContactCount}</h3>
              <p className="text-lg text-gray-500">Total Emergency Contact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
