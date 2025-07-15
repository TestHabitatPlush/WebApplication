import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaCar,
  FaIdCard,
  FaFileAlt,
  FaFrown,
  FaAddressBook,
} from "react-icons/fa";
import { GiGate } from "react-icons/gi";
import UserHandler from "../../../../handlers/UserHandler";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import VisitEntryHandler from "../../../../handlers/VisitorEntryHandler";
import GateHandler from "../../../../handlers/GateHandler";
import EmergencyContactHandler from "../../../../handlers/EmergencyContactHandler";
import DocumentHandler from "../../../../handlers/DocumentHandler";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
  const userId = useSelector((state) => state.auth.user?.userId);

  const { getAllApprovedUserDataHandler, getResidentBySocietyIdHandler } = UserHandler();
  const { getUnitsHandler } = DefineUnitHandler();
  const { getParkingHandler } = ParkingHandler();
  const { getNewVisitorEntryTable } = VisitEntryHandler();
  const { getGateListHandler } = GateHandler();
  const { getEmergencyContactSocietyHandler } = EmergencyContactHandler();
  const { getDocumentBySocietyHandler } = DocumentHandler();

  const [approvedUsersCount, setApprovedUsersCount] = useState(0);
  const [unapprovedUsersCount, setUnapprovedUsersCount] = useState(0);
  const [unitCount, setUnitCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [approvedSecurityCount, setApprovedSecurityCount] = useState(0);
  const [unapprovedSecurityCount, setUnapprovedSecurityCount] = useState(0);
  const [emergencyContactCount, setEmergencyContactCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);

  useEffect(() => {
    if (societyId && token && userId) {
      fetchUserCounts();
      fetchUnitCounts();
      fetchParkingSlotCounts();
      fetchVisitorCounts();
      fetchSecurityGuardCounts();
      fetchEmergencyContactCounts();
      fetchDocumentCounts();
    } else {
      console.error("Missing Society ID or Token or User ID. Please check authentication.");
    }
  }, [societyId, token, userId]);

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

  const fetchEmergencyContactCounts = async () => {
    try {
      const response = await getEmergencyContactSocietyHandler(societyId, userId, { page: 0, pageSize: 1000 });

      const contactList = Array.isArray(response?.data?.data)
        ? response.data.data
        : response?.data || [];

      setEmergencyContactCount(contactList.length || 0);
    } catch (error) {
      console.error("Error fetching Emergency Contacts:", error);
    }
  };

  const fetchDocumentCounts = async () => {
    try {
      const response = await getDocumentBySocietyHandler(societyId, userId, { page: 0, pageSize: 1000 });

      const docList = Array.isArray(response?.data?.data)
        ? response.data.data
        : response?.data || [];

      setDocumentCount(docList.length || 0);
    } catch (error) {
      console.error("Error fetching Document:", error);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <SummaryCard
          title="Units & Users"
          icon={<FaUsers className="text-2xl text-gray-700" />}
          count={approvedUsersCount + unapprovedUsersCount}
          subItems={[
            { label: "Unapproved Users", value: unapprovedUsersCount, link: "/user/unapproved" },
            { label: "Approved Users", value: approvedUsersCount, link: "/user/approved" },
            { label: "Units", value: unitCount, link: "/unit/view", icon: <FaBuilding className="text-2xl text-gray-700" /> },
          ]}
        />
        <SummaryCard
          title="Vehicle Parking"
          icon={<FaCar className="text-2xl text-gray-700" />}
          count={parkingCount}
          description="Total Parking Slots"
        />
        <SummaryCard
          title="Visitor"
          icon={<FaIdCard className="text-2xl text-gray-700" />}
          count={visitorCount}
          description="Total Visitors"
        />
        <SummaryCard
          title="Gate & Security"
          icon={<GiGate className="text-2xl text-gray-700" />}
          count={approvedSecurityCount}
          description="Total Gates"
        />
        <SummaryCard
          title="Document"
          icon={<FaFileAlt className="text-2xl text-gray-700" />}
          count={documentCount}
          description="Total Documents"
        />
        <SummaryCard
          title="Complaint"
          icon={<FaFrown className="text-2xl text-gray-700" />}
          count={0}
          description="Total Complaints"
        />
        <SummaryCard
          title="Emergency Contact"
          icon={<FaAddressBook className="text-2xl text-gray-700" />}
          count={emergencyContactCount}
          description="Total Emergency Contacts"
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ title, icon, count, description, subItems = [] }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">{title}</h2>
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <h3 className="text-xl font-semibold text-green-700">{count}</h3>
        {description && <p className="text-lg text-gray-500">{description}</p>}
        {subItems.map((item, i) => (
          <p key={i}>
            <a
              href={`${process.env.REACT_APP_PUBLIC_BASE_URL}${item.link}`}
              className="text-sm text-gray-500 hover:underline"
            >
              {item.value} {item.label}
            </a>
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardUser;