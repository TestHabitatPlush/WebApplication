import React, { useEffect, useState, useMemo } from "react";
import ReusableTable from "@/components/shared/ReusableTable";
import ManagementCommitteeHandler from "@/handlers/ManagementCommitteeHandler";
import { FaEye } from "react-icons/fa";

// Default Tabs Configuration
const defaultTabs = [
  { name: "Neighbours", label: "Neighbours", color: "bg-blue-500", content: [] },
  { name: "Management", label: "Management Committee", color: "bg-green-500", content: [] },
  {
    name: "Service",
    label: "Service",
    extra: "Vendors",
    color: "bg-yellow-500",
    content: [
      { unit: "S01", name: "Plumbing Co." },
      { unit: "S02", name: "Electrician Inc." },
      { unit: "S03", name: "Cleaning Services" },
    ],
  },
  {
    name: "Emergency",
    label: "Emergency",
    extra: "Contact",
    color: "bg-red-500",
    content: [
      { unit: "E01", name: "Fire Department" },
      { unit: "E02", name: "Police Station" },
      { unit: "E03", name: "Hospital" },
    ],
  },
];

const CommunityDirectories = () => {
  const { getAllCommitteeHandler } = ManagementCommitteeHandler();
  const [activeTab, setActiveTab] = useState(defaultTabs[0].name);
  const [managementData, setManagementData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    if (activeTab === "Management") {
      fetchManagementCommittee();
    }
  }, [activeTab]);

  const fetchManagementCommittee = async () => {
    setLoading(true);
    const result = await getAllCommitteeHandler();
    if (result.success) {
      const mappedData = result.data.map((member) => ({
        unit: member.unitNumber || "N/A",
        name: member.name || `${member.firstName} ${member.lastName}`,
        remarks: member.role?.roleName || "N/A",
        mobile: member.mobile,
        email: member.email,
      }));
      setManagementData(mappedData);
    } else {
      setManagementData([]);
    }
    setTotalPages(1); // Static data
    setLoading(false);
  };

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const columns = useMemo(() => [
    { Header: "Unit No", accessor: "unit" },
    { Header: "Name", accessor: "name" },
    { Header: "Remark", accessor: "remarks" },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <FaEye
          className="text-blue-500 cursor-pointer"
          onClick={() => handleOpenModal(row.original)}
        />
      ),
    },
  ], []);

  const getActiveTabContent = () => {
    if (activeTab === "Management") return managementData;
    const tab = defaultTabs.find((tab) => tab.name === activeTab);
    return Array.isArray(tab?.content) ? tab.content : [];
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex mb-4 space-x-2 overflow-x-auto no-scrollbar">
        {defaultTabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 py-2 text-sm rounded-full ${
              activeTab === tab.name ? tab.color : "bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label} {tab.extra && <span className="hidden lg:inline"> - {tab.extra}</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <ReusableTable
        columns={columns}
        data={getActiveTabContent()}
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
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Details</h2>
            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedData.name}</p>
              <p><strong>Remarks:</strong> {selectedData.remarks}</p>
              <p><strong>Mobile:</strong> {selectedData.mobile || "N/A"}</p>
              <p><strong>Email:</strong> {selectedData.email || "N/A"}</p>
            </div>
            <button
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
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
