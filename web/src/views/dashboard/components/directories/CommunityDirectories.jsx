import React, { useEffect, useState, useMemo } from "react";
import ReusableTable from "@/components/shared/ReusableTable";
import ManagementCommitteeHandler from "@/handlers/ManagementCommitteeHandler";
import EmergencyContactHandler from "@/handlers/EmergencyContactHandler";
import { FaEye } from "react-icons/fa";

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
  { name: "Emergency", label: "Emergency Contact", color: "bg-red-500", content: [] },
];

const CommunityDirectories = () => {
  const { getAllCommitteeHandler } = ManagementCommitteeHandler();
  const { getEmergencyContactUserHandler } = EmergencyContactHandler();

  const [activeTab, setActiveTab] = useState(defaultTabs[0].name);
  const [managementData, setManagementData] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    if (activeTab === "Management") {
      fetchManagementCommittee();
    } else if (activeTab === "Emergency") {
      fetchEmergencyContacts();
    }
  }, [activeTab]);

  const fetchManagementCommittee = async () => {
    setLoading(true);
    const result = await getAllCommitteeHandler();

    if (result.success) {
      const mappedData = result.data.map((member, index) => ({
        slno: member.unitNumber || `#${index + 1}`,
        name: `${member.firstName || ""} ${member.lastName || ""}`.trim(),
        managementDesignation: member.managementDesignation || "N/A",
        // mobile: member.mobileNumber || "N/A",
        email: member.email || "N/A",
        remark: member.remarks || "N/A",
      }));
      setManagementData(mappedData);
    } else {
      setManagementData([]);
    }

    setTotalPages(1);
    setLoading(false);
  };

const fetchEmergencyContacts = async () => {
  setLoading(true);
  const result = await getEmergencyContactUserHandler();

  if (result.success && Array.isArray(result.data)) {
    const mappedData = result.data.map((item, index) => ({
      slno: `#${index + 1}`,
      name: item.name || "N/A",
      contactNo: item.econtactNo1 || "N/A",
      emergencyContactType: item.emergencyContactType || "N/A",
      address: item.address || "N/A",
    }));
    console.log("Mapped Emergency Data:", mappedData);
    setEmergencyData(mappedData);
  } else {
    console.warn("Emergency data fetch returned no results.");
    setEmergencyData([]);
  }

  setTotalPages(1);
  setLoading(false);
};


  const handleOpenModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const managementColumns = useMemo(() => [
    { Header: "Sl No", accessor: "slno" },
    { Header: "Name", accessor: "name" },
    { Header: "Designation", accessor: "managementDesignation" },
    // { Header: "Mobile", accessor: "mobile" },
    { Header: "Email", accessor: "email" },
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

  const emergencyColumns = useMemo(() => [
    { Header: "Sl No", accessor: "slno" },
    { Header: "Name", accessor: "name" },
    { Header: "Emergency Contact Type", accessor: "emergencyContactType" },
    { Header: "Contact No", accessor: "contactNo" },
    { Header: "Location", accessor: "address" },
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
    if (activeTab === "Emergency") return emergencyData;
    const tab = defaultTabs.find((tab) => tab.name === activeTab);
    return Array.isArray(tab?.content) ? tab.content : [];
  };

  const getActiveTabColumns = () => {
    if (activeTab === "Management") return managementColumns;
    if (activeTab === "Emergency") return emergencyColumns;
    return [{ Header: "Unit", accessor: "unit" }, { Header: "Name", accessor: "name" }];
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
        columns={getActiveTabColumns()}
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
              {activeTab === "Management" && (
                <>
                  <p><strong>Designation:</strong> {selectedData.managementDesignation}</p>
                  {/* <p><strong>Mobile:</strong> {selectedData.mobile}</p> */}
                  <p><strong>Email:</strong> {selectedData.email}</p>
                  <p><strong>Remarks:</strong> {selectedData.remark}</p>
                </>
              )}
              {activeTab === "Emergency" && (
                <>
                  <p><strong>Relation:</strong> {selectedData.emergencyContactType}</p>
                  <p><strong>Contact No:</strong> {selectedData.contactNo}</p>
                  <p><strong>Location:</strong> {selectedData.address}</p>
                </>
              )}
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
