import React, { useEffect, useMemo, useState } from "react";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import toast from "react-hot-toast";

import NoticeHandler from "../../../../handlers/NoticeHandler";
import ViewNoticeModal from "../noticelist/ViewNoticeDetailsModal";
import UpdateNoticeDetailsModal from "./UpdateNoticeDetailsModal";
const visibilityOptions = [
  { value: "", label: "All Groups" },
  { value: "owner", label: "Owner" },
  { value: "tenant", label: "Tenant" },
  { value: "primary", label: "Primary Member" },
  { value: "all", label: "All" },
];

const visibilityMap = {
  owner: ["society_owner", "society_owner_family"],
  tenant: ["society_tenant", "society_tenant_family"],
  primary: ["primary_member"],
  all: [
    "society_owner",
    "society_owner_family",
    "society_tenant",
    "society_tenant_family",
  ],
};

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editNotice, setEditNotice] = useState(null);

  const { getNoticesByUserHandler, updateNoticeHandler, deleteNoticeHandler } =
    NoticeHandler();

  const toggleViewModal = () => setViewModal((prev) => !prev);
  useEffect(() => {
    const fetchAllNotices = async () => {
      setLoading(true);
      try {
        const userRes = await getNoticesByUserHandler();

        const allNotices = Array.isArray(userRes?.data?.data)
          ? userRes.data.data
          : [];

        if (visibilityFilter && visibilityMap[visibilityFilter]) {
          const filterCategories = visibilityMap[visibilityFilter];

          const filtered = allNotices.filter((notice) =>
            Array.isArray(notice.roleCategories)
              ? notice.roleCategories.some((category) =>
                  filterCategories.includes(category)
                )
              : false
          );

          setNotices(filtered);
        } else {
          setNotices(allNotices);
        }

        setPageIndex(0);
      } catch (err) {
        console.error("Notice fetch error:", err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotices();
  }, [visibilityFilter, pageSize]);

  const pagedNotices = useMemo(() => {
    if (!Array.isArray(notices)) return [];

    const reversed = [...notices].reverse();
    const start = pageIndex * pageSize;
    return reversed.slice(start, start + pageSize);
  }, [notices, pageIndex, pageSize]);

  const totalPages = Math.ceil(notices.length / pageSize);

  const handleDelete = async (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const res = await deleteNoticeHandler(noticeId);
      console.log("deleteres",res)
      if (res?.status === 200) {
        toast.success("Notice deleted.");
        setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
      } else {
        toast.error("Failed to delete notice.");
      }
    }
  };

  const handleView = (notice) => {
    setSelectedNotice(notice);
    setViewModal(true);
  };

  const handleEdit = (notice) => {
    setEditNotice(notice);
    setEditModal(true);
  };

  const toggleEditModal = () => {
    setEditModal(false);
    setEditNotice(null);
  };

  const activeGroupName =
    visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label ||
    "";

  return (
    <div className="relative px-4 py-6">
      <div className="text-2xl font-semibold text-lime mt-4">Notice List</div>
      <div className="text-gray-700 font-sans text-lg mt-2">
        TOTAL {notices.length} NOTICES
      </div>

      <div className="flex flex-col md:flex-row justify-end items-center mt-4 gap-2">
        <select
          value={visibilityFilter}
          onChange={(e) => {
            setPageIndex(0);
            setVisibilityFilter(e.target.value);
          }}
          className="px-3 py-2 uppercase border border-gray-300 rounded-md text-sm"
        >
          {visibilityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {visibilityFilter && (
        <div className="mt-2 text-sm text-gray-600">
          Showing notices for:{" "}
          <span className="font-semibold">{activeGroupName}</span>
        </div>
      )}

      {viewModal && selectedNotice && (
        <ViewNoticeModal
          isOpen={viewModal}
          onClose={toggleViewModal}
          notice={selectedNotice}
        />
      )}

      {editModal && editNotice && (
        <UpdateNoticeDetailsModal
          isOpen={editModal}
          onClose={toggleEditModal}
          formData={editNotice}
          onEditHandler={async (updatedForm) => {
            const res = await updateNoticeHandler(
              editNotice.noticeId,
              updatedForm
            );
            if (res?.status === 200) {
              setNotices((prev) =>
                prev.map((n) =>
                  n.noticeId === editNotice.noticeId
                    ? { ...n, ...updatedForm }
                    : n
                )
              );
              toggleEditModal();
            }
          }}
        />
      )}

      {loading ? (
        <div className="text-center mt-6 text-gray-500">Loading notices...</div>
      ) : pagedNotices.length > 0 ? (
        <div className="mt-4 space-y-4">
          {pagedNotices.map((notice, index) => (
            <div
              key={notice.noticeId || index}
              className="relative p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="text-xl font-semibold text-gray-800">
                {notice.noticeHeading}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Created On:{" "}
                {notice.createdAt
                  ? new Date(notice.createdAt).toLocaleDateString()
                  : "—"}
              </div>

              <div className="absolute flex gap-2 right-2 top-2">
                <div className="relative group">
                  <FiEye
                    className="text-orange-600 hover:text-orange-800 cursor-pointer"
                    size={18}
                    onClick={() => handleView(notice)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white bg-orange-600 rounded opacity-0 bottom-full left-1/2 transform -translate-x-1/2 group-hover:opacity-100">
                    View
                  </span>
                </div>
                <div className="relative group">
                  <FiEdit
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    size={18}
                    onClick={() => handleEdit(notice)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white bg-blue-600 rounded opacity-0 bottom-full left-1/2 transform -translate-x-1/2 group-hover:opacity-100">
                    Edit
                  </span>
                </div>
                <div className="relative group">
                  <FiTrash
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    size={18}
                    onClick={() => handleDelete(notice.noticeId)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white bg-red-600 rounded opacity-0 bottom-full left-1/2 transform -translate-x-1/2 group-hover:opacity-100">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-6 text-gray-500">
          No notices to display.
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          {pageIndex > 0 && (
            <>
              <button onClick={() => setPageIndex(0)}>
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              >
                <SlArrowLeft />
              </button>
            </>
          )}
        </div>

        <div className="text-sm text-gray-700">
          {notices.length > 0
            ? `Showing ${pageIndex * pageSize + 1} - ${Math.min(
                (pageIndex + 1) * pageSize,
                notices.length
              )} of ${notices.length}`
            : "No notices found."}
        </div>

        <div className="flex items-center gap-2">
          {pageIndex < totalPages - 1 && (
            <>
              <button onClick={() => setPageIndex((prev) => prev + 1)}>
                <SlArrowRight />
              </button>
              <button onClick={() => setPageIndex(totalPages - 1)}>
                <MdKeyboardDoubleArrowRight />
              </button>
            </>
          )}
        </div>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          className="ml-4 px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default NoticeList;
