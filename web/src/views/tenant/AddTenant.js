import React, { useState, useEffect } from "react";
import AddMemberModal from "./AddMemberModal";
import AddTenantModal from "./AddTenantModal";


const AddTenant = () => {
  const [activeTab, setActiveTab] = useState("member"); // Default Tab
  const [showModal, setShowModal] = useState(false);
  const [tenantList, setTenantList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  // Fetch initial list
  useEffect(() => {
    fetchTenantList();
    fetchMemberList();
  }, []);

  const fetchTenantList = async () => {
    // Mock tenant data
    const response = [
      {
        id: 1,
        firstName: "Sasmita",
        lastName: "Subhashree",
        phone: "9876543214",
        email: "sasmitasubhashree@gmail.com",
        memberType: "Tenant",
      },
    ];
    setTenantList(response);
  };

  const fetchMemberList = async () => {
    // Mock member data
    const response = [
      {
        id: 1,
        firstName: "Suchismita",
        lastName: "Das",
        phone: "9876543214",
        email: "suchismitadas@gmail.com",
        memberType: "Tenant Family",
      },
    ];
    setMemberList(response);
  };

  // Add Tenant
  const handleAddTenant = (newTenant) => {
    const updatedList = [
      //...tenantList,
      // { id: tenantList.length + 1, ...newTenant },
    ];
    setTenantList(updatedList);
  };

  // Add Member
  const handleAddMember = (newMember) => {
    const updatedList = [
      ...memberList,
      { id: memberList.length + 1, ...newMember },
    ];
    setMemberList(updatedList);
  };

  return (
    <div className="p-5">
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        <button
          onClick={() => setActiveTab("member")}
          className={`px-4 py-2 ${
            activeTab === "member"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          Add Member
        </button>
        <button
          onClick={() => setActiveTab("tenant")}
          className={`px-4 py-2 ${
            activeTab === "tenant"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          Add Tenant
        </button>
      </div>

      {/* Button to Add */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          {activeTab === "member" ? "+ Add Member" : "+ Add Tenant"}
        </button>
      </div>

      {/* Display Member List */}
      {activeTab === "member" && (
        <div>
          <h2 className="mb-3 text-lg font-bold">Member List</h2>
          <TableComponent data={memberList} />
        </div>
      )}

      {/* Display Tenant List */}
      {activeTab === "tenant" && (
        <div>
          <h2 className="mb-3 text-lg font-bold">Tenant List</h2>
          <TableComponent data={tenantList} />
        </div>
      )}

      {/* Add Member Modal */}
      {showModal && activeTab === "member" && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onAddMember={handleAddMember}
        />
      )}

      {/* Add Tenant Modal */}
      {showModal && activeTab === "tenant" && (
        <AddTenantModal
          onClose={() => setShowModal(false)}
          onAddTenant={handleAddTenant}
        />
      )}
    </div>
  );
};

const TableComponent = ({ data }) => {
  return (
    <table className="w-full text-left border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">First Name</th>
          <th className="p-2 border">Last Name</th>
          <th className="p-2 border">Phone</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Type of Member</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border hover:bg-gray-50">
            <td className="p-2 border">{item.id}</td>
            <td className="p-2 border">{item.firstName}</td>
            <td className="p-2 border">{item.lastName}</td>
            <td className="p-2 border">{item.phone}</td>
            <td className="p-2 border">{item.email}</td>
            <td className="p-2 border">{item.memberType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddTenant;
