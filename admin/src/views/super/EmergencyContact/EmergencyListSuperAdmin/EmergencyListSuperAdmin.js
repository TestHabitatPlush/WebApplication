import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import EmergencyContactHandler from "../../../../handlers/EmergencyContactHandler";
import ViewEmergencyDetailsModal from "./ViewEmergencyDetailsModal";
import UpdateEmergencyDetailsModal from "./UpdateEmergencyDetailsModal";

const EmergencyListSuperAdmin = () => {
  const paths = ["Emergency Contact", "Emergency Contact List"];
  const Heading = ["Emergency Contact List"];

  const userId = useSelector((state) => state.auth.user?.userId);

  const [emergency, setEmergency] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalEmergency, setTotalEmergency] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmergencyId, setSelectedEmergencyId] = useState(null);
  const [selectedEmergencyData, setSelectedEmergencyData] = useState(null);

  const {
    getEmergencyContactUserHandler,
    deleteEmergencyContactByIdHandler,
    updateEmergencyContactHandler,
  } = EmergencyContactHandler();

  const fetchEmergency = async () => {
    try {
      const params = { page, pageSize, searchTerm };
      const result = await getEmergencyContactUserHandler(userId, params);
      const items = Array.isArray(result?.data) ? result.data : [];
      setEmergency(items);
      setTotalEmergency(result?.total || items.length);
    } catch (err) {
      console.error("Failed to fetch emergency contacts:", err.message);
    }
  };

  useEffect(() => {
    if (userId) fetchEmergency();
  }, [page, pageSize, searchTerm, userId]);

  useEffect(() => {
    if (selectedEmergencyId && emergency.length) {
      const found = emergency.find((el) => el.contactId === selectedEmergencyId);
      if (found) setSelectedEmergencyData({ ...found });
    }
  }, [selectedEmergencyId, emergency]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    const res = await deleteEmergencyContactByIdHandler(id);
    if (res?.data?.success) {
      setEmergency((prev) => prev.filter((el) => el.contactId !== id));
      setTotalEmergency((prev) => prev - 1);
    }
  };

  const openEditModal = (contactId) => {
    setSelectedEmergencyId(contactId);
    setShowUpdateModal(true);
  };

  const openViewModal = (contactId) => {
    setSelectedEmergencyId(contactId);
    setShowViewModal(true);
  };

  const onSubmitEdit = async (formData) => {
    try {
      const res = await updateEmergencyContactHandler(formData);
      if (res?.status === 200 || res?.status === 201) {
        setShowUpdateModal(false);
        fetchEmergency();
      }
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const totalPages = Math.ceil(totalEmergency / pageSize);

  return (
    <div className="relative p-5">
      <UrlPath paths={paths} />
      <PageHeading heading={Heading} />

      <div className="mt-2 text-lg font-medium text-gray-700">
        TOTAL {totalEmergency} EMERGENCY CONTACTS
      </div>

      <div className="flex flex-row mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or keyword..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      {emergency.length === 0 ? (
        <div className="mt-6 text-center text-gray-500">No emergency contacts found.</div>
      ) : (
        emergency.map((el) => (
          <div key={el.contactId} className="flex flex-col mt-4 space-y-2">
            <div className="relative flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="text-xl font-semibold text-gray-800">{el.name}</div>
              <div className="absolute flex gap-2 right-2 top-2">
                <FaEye
                  className="text-lg text-yellow-600 cursor-pointer hover:text-yellow-700"
                  onClick={() => openViewModal(el.contactId)}
                />
                <FaEdit
                  className="text-lg text-green-500 cursor-pointer hover:text-green-700"
                  onClick={() => openEditModal(el.contactId)}
                />
                <FaTrashAlt
                  className="text-lg text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(el.contactId)}
                />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          {page > 1 && (
            <>
              <button onClick={() => setPage(1)}><MdKeyboardDoubleArrowLeft /></button>
              <button onClick={() => setPage((prev) => prev - 1)}><SlArrowLeft /></button>
            </>
          )}
        </div>

        <div>
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalEmergency)} of {totalEmergency}
        </div>

        <div>
          {page < totalPages && (
            <>
              <button onClick={() => setPage((prev) => prev + 1)}><SlArrowRight /></button>
              <button onClick={() => setPage(totalPages)}><MdKeyboardDoubleArrowRight /></button>
            </>
          )}
        </div>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Modals */}
      {showUpdateModal && selectedEmergencyData && (
        <UpdateEmergencyDetailsModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          formData={selectedEmergencyData}
          onEditHandler={onSubmitEdit}
        />
      )}

      {showViewModal && selectedEmergencyData && (
        <ViewEmergencyDetailsModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          formData={selectedEmergencyData}
        />
      )}
    </div>
  );
};

export default EmergencyListSuperAdmin;
