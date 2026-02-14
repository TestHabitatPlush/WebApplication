

import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
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

  const {
    getNoticesByUserHandler,
    getNoticesBySocietyHandler,
    updateNoticeHandler,
    deleteNoticeHandler,
  } = NoticeHandler();

  const toggleViewModal = () => setViewModal((prev) => !prev);
useEffect(() => {
  const fetchAllNotices = async () => {
    setLoading(true);
    try {
      const userRes = await getNoticesByUserHandler();
      const societyRes = await getNoticesBySocietyHandler();

      const userNotices = Array.isArray(userRes?.data?.data)
          ? userRes.data.data
          : Array.isArray(userRes?.data?.data?.notices)
          ? userRes.data.data.notices
          : [];


      const societyNotices = Array.isArray(societyRes?.data?.data)
        ? societyRes.data.data
        : Array.isArray(societyRes?.data?.data?.notices)
        ? societyRes.data.data.notices
        : [];

      let allNotices = [...userNotices, ...societyNotices];

      if (visibilityFilter && visibilityMap[visibilityFilter]) {
        const filterCategories = visibilityMap[visibilityFilter];

        allNotices = allNotices.filter((notice) => {
          const roles =
            notice.roleCategories ||
            notice.roles ||
            notice.visibleFor ||
            [];

          return Array.isArray(roles)
            ? roles.some((role) => filterCategories.includes(role))
            : true;
        });
      }

      const uniqueNotices = Array.from(
        new Map(allNotices.map((n) => [n.noticeId, n])).values()
      );

      setNotices(uniqueNotices);
      setPageIndex(0);
    } catch (err) {
      toast.error("Failed to fetch notices");
      console.error("Notice fetch error:", err);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAllNotices();
}, [
  visibilityFilter,
  pageSize,
  
]);



  const pagedNotices = useMemo(() => {
    const reversed = [...notices].reverse();
    const start = pageIndex * pageSize;
    return reversed.slice(start, start + pageSize);
  }, [notices, pageIndex, pageSize]);

  const totalPages = Math.ceil(notices.length / pageSize);

  const handleDelete = async (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const res = await deleteNoticeHandler(noticeId);
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
      <div className="mt-4 text-2xl font-semibold text-lime">Notice List</div>
      <div className="mt-2 font-sans text-lg text-gray-700">
        TOTAL {notices.length} NOTICES
      </div>

      <div className="flex flex-col items-center justify-end gap-2 mt-4 md:flex-row">
        <select
          value={visibilityFilter}
          onChange={(e) => {
            setPageIndex(0);
            setVisibilityFilter(e.target.value);
          }}
          className="px-3 py-2 text-sm uppercase border border-gray-300 rounded-md"
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
        <div className="mt-6 text-center text-gray-500">Loading notices...</div>
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
                  <FaEye
                    className="text-lg text-orange-600 cursor-poiner hover:text-orange-700"
                    size={18}
                    onClick={() => handleView(notice)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-orange-600 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
                    View
                  </span>
                </div>
                <div className="relative group">
                  <FaEdit
                    className="text-lg text-green-600 cursor-pointer hover:text-blue-700"
                    
                    onClick={() => handleEdit(notice)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-green-600 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
                    Edit
                  </span>
                </div>
                <div className="relative group">
                  <FaTrashAlt
                    className="text-lg text-red-600 cursor-pointer hover:text-red-700"
                   
                    onClick={() => handleDelete(notice.noticeId)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-red-600 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-500">
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
          className="px-2 py-1 ml-4 text-sm border border-gray-300 rounded-md"
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
