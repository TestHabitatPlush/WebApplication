import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReusableTable from "@/components/shared/ReusableTable";
import ManagementCommitteeHandler from "@/handlers/ManagementCommitteeHandler";
import EmergencyContactHandler from "@/handlers/EmergencyContactHandler";
import { FaEye } from "react-icons/fa";

/* -------------------- TABS -------------------- */
const defaultTabs = [
  { name: "Neighbours", label: "Neighbours", content: [] },
  { name: "Management", label: "Management Committee", content: [] },
  {
    name: "Service",
    label: "Vendors",
    content: [
      { unit: "S01", name: "Plumbing Co." },
      { unit: "S02", name: "Electrician Inc." },
      { unit: "S03", name: "Cleaning Services" },
    ],
  },
  { name: "Emergency", label: "Emergency Contact", content: [] },
];

/* -------------------- MODAL CONFIG -------------------- */
const tabDetailConfig = {
  Management: [
    { label: "Name", key: "name" },
    { label: "Designation", key: "managementDesignation" },
    { label: "Email", key: "email" },
    { label: "Remarks", key: "remark" },
  ],
  Emergency: [
    { label: "Name", key: "name" },
    { label: "Emergency Contact Type", key: "emergencyContactType" },
    { label: "Contact No", key: "contactNo" },
    { label: "Location", key: "address" },
  ],
};

const CommunityDirectories = () => {
  const { getAllCommitteeHandler } = ManagementCommitteeHandler();
  const { getEmergencyContactUserHandler } = EmergencyContactHandler();

  const [activeTab, setActiveTab] = useState("Neighbours");
  const [managementData, setManagementData] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  /* -------------------- FETCH MANAGEMENT -------------------- */
  const fetchManagementCommittee = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllCommitteeHandler();
      if (result.success) {
        setManagementData(
          result.members.map((member, index) => ({
            slno: member.userId || `#${index + 1}`,
            name: `${member.firstName || ""} ${member.lastName || ""}`.trim() || "N/A",
            managementDesignation: member.managementDesignation || "N/A",
            email: member.email || "N/A",
            remark: member.remarks || "N/A",
          }))
        );
      } else {
        setManagementData([]);
      }
    } catch (err) {
      console.error("Management fetch error:", err);
      setManagementData([]);
    } finally {
      setLoading(false);
    }
  }, [getAllCommitteeHandler]);

  /* -------------------- FETCH EMERGENCY -------------------- */
  const fetchEmergencyContacts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getEmergencyContactUserHandler();
      if (result?.success && Array.isArray(result.data)) {
        setEmergencyData(
          result.data.map((item, index) => ({
            slno: `#${index + 1}`,
            name: item.name || "N/A",
            emergencyContactType: item.emergencyContactType || "N/A",
            contactNo: item.econtactNo1 || "N/A",
            address: item.address || "N/A",
          }))
        );
      } else {
        setEmergencyData([]);
      }
    } catch (err) {
      console.error("Emergency fetch error:", err);
      setEmergencyData([]);
    } finally {
      setLoading(false);
    }
  }, [getEmergencyContactUserHandler]);

  /* -------------------- TAB CHANGE EFFECT -------------------- */
  useEffect(() => {
    if (activeTab === "Management" && managementData.length === 0) fetchManagementCommittee();
    if (activeTab === "Emergency" && emergencyData.length === 0) fetchEmergencyContacts();
  }, [activeTab, fetchManagementCommittee, fetchEmergencyContacts, managementData.length, emergencyData.length]);

  /* -------------------- MODAL -------------------- */
  const handleOpenModal = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  /* -------------------- TABLE COLUMNS -------------------- */
  const managementColumns = useMemo(() => [
    { Header: "Sl No", accessor: "slno" },
    { Header: "Name", accessor: "name" },
    { Header: "Designation", accessor: "managementDesignation" },
    { Header: "Email", accessor: "email" },
    { Header: "Action", Cell: ({ row }) => <FaEye className="cursor-pointer text-turquoise hover:scale-110" onClick={() => handleOpenModal(row.original)} /> },
  ], []);

  const emergencyColumns = useMemo(() => [
    { Header: "Sl No", accessor: "slno" },
    { Header: "Name", accessor: "name" },
    { Header: "Emergency Type", accessor: "emergencyContactType" },
    { Header: "Contact No", accessor: "contactNo" },
    { Header: "Location", accessor: "address" },
    { Header: "Action", Cell: ({ row }) => <FaEye className="cursor-pointer text-turquoise hover:scale-110" onClick={() => handleOpenModal(row.original)} /> },
  ], []);

  /* -------------------- ACTIVE TAB DATA -------------------- */
  const getActiveTabData = () => {
    if (activeTab === "Management") return managementData;
    if (activeTab === "Emergency") return emergencyData;
    return defaultTabs.find(t => t.name === activeTab)?.content || [];
  };

  const getActiveTabColumns = () => {
    if (activeTab === "Management") return managementColumns;
    if (activeTab === "Emergency") return emergencyColumns;
    return [
      { Header: "Unit", accessor: "unit" },
      { Header: "Name", accessor: "name" },
    ];
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Community Directories</h1>

      {/* Tabs */}
      <div className="flex mb-6 space-x-2">
        {defaultTabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-5 py-2 rounded-t-lg ${activeTab === tab.name ? "bg-turquoise text-white" : "bg-gray-200"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <ReusableTable
        columns={getActiveTabColumns()}
        data={getActiveTabData()}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        loading={loading}
      />

      {/* Modal */}
      {isModalOpen && selectedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Details</h2>
            {tabDetailConfig[activeTab]?.map(field => (
              <p key={field.key}><strong>{field.label}:</strong> {selectedData[field.key] || "N/A"}</p>
            ))}
            <button
              className="px-4 py-2 mt-4 text-white rounded bg-turquoise"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityDirectories;
