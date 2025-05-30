import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import NoticeHandler from "../../../../handlers/NoticeHandler";
import UpdateNoticeDetailsModal from "./UpdateNoticeDetailsModal";
import UserGroupHandler from "../../../../handlers/UseGroupHandler";
import ViewNoticeDetailsModal from "./ViewNoticeDetailsModal";

const NoticeList = () => {
  const paths = ["Notice Announcement", "Notice List"];
  const Heading = ["Notice List"];
  const [notices, setNotices] = useState([]);
  const { getNoticeHandler, deleteNoticeByIdHandler, updateNoticeHandler } =
    NoticeHandler();
  const { getUserGroupHandler } = UserGroupHandler();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalNotices, setTotalNotices] = useState(0);
  const [disscussionheading, setDisscussionheading] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [userGroupId, setUserGroupId] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const result = await getNoticeHandler({
          page,
          pageSize,
          disscussionheading,
          userGroupId,
        });
        setNotices(result.data.data);
        setTotalNotices(result.data.total);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchNotices();

    const getUserGroup = async () => {
      try {
        const result = await getUserGroupHandler();
        setSelectedOption(result.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserGroup();
  }, [page, pageSize, disscussionheading, userGroupId]);

  const totalPages = Math.ceil(totalNotices / pageSize);

  const handleSearchChange = (e) => {
    setDisscussionheading(e.target.value);
  };

  const handleDelete = (id) => {
    deleteNoticeByIdHandler(id)
      .then((res) => {
        if (res.status === 200) {
          setNotices((prev) => prev.filter((el) => el.noticeId !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);

  const toggleUpdateNoticeDetailModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const onEditHandler = (noticeId) => {
    const findNoticeData = notices.find(
      (element) => element.noticeId === noticeId
    );
    setUpdateFormData(findNoticeData);
    toggleUpdateNoticeDetailModal();
  };

  const onSubmitEdit = (formData) => {
    updateNoticeHandler(formData);
    toggleUpdateNoticeDetailModal();
  };

  const [viewmodal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  const toggleViewNoticeDetailModal = () => {
    setViewModal((prev) => !prev);
  };

  const onViewHandler = (noticeId) => {
    const viewNoticeData = notices.find(
      (element) => element.noticeId === noticeId
    );
    setShowViewFormData(viewNoticeData);
    setViewModal(true);
  };

  return (
    <div className="relative">
      <UrlPath paths={paths} />
      <PageHeading heading={Heading} />
      <div className="flex flex-row font-sans text-lg font-medium text-gray-700">
        TOTAL {totalNotices} NOTICES
      </div>

      <div className="flex flex-row justify-end mt-4">
      <select
  name="userGroupId"
  onChange={(e) => setUserGroupId(e.target.value)}
  className="py-2 uppercase border border-gray-300 rounded-md"
>
  {selectedOption && selectedOption.length > 0 &&
    [...selectedOption]
      .sort((a, b) => a.userGroupName.localeCompare(b.userGroupName))
      .map((item) => (
        <option key={item.userGroupId} value={item.userGroupId}>
          {item.userGroupName}
        </option>
      ))
  }
</select>

</div>


      <div className="flex flex-row mt-4">
        <div className="relative w-full">
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search by Discussion Heading..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {notices.map((el) => (
        <div key={el.noticeId} className="flex flex-col mt-4 space-y-2">
          <div className="relative flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="text-xl font-semibold text-gray-800">
              {el.noticeHeading}
            </div>
            <div className="absolute flex flex-row gap-2 right-2 top-2">
              <div className="relative group">
                <FaEye
                  className="text-lg text-yellow-600 cursor-pointer hover:text-yellow-700"
                  onClick={() => onViewHandler(el.noticeId)}
                />
                <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 bg-yellow-600 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
                  View
                </span>
              </div>
              <div className="relative group">
                <FaEdit
                  className="text-lg text-green-500 cursor-pointer hover:text-green-700"
                  onClick={() => onEditHandler(el.noticeId)}
                />
                <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 bg-green-500 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
                  Edit
                </span>
              </div>
              <div className="relative group">
                <FaTrashAlt
                  className="text-lg text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(el.noticeId)}
                />
                <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 bg-red-500 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
                  Delete
                </span>
              </div>
            </div>
            <div className="mt-2 text-gray-600">{el.noticeDescription}</div>
            <div className="absolute text-gray-500 right-2 bottom-2">
              Expired Date {new Date(el.noticeExpireDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between mt-4">
        <div>
          {page > 1 && (
            <>
              <button onClick={() => setPage(1)}>
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button onClick={() => setPage((prev) => prev - 1)}>
                <SlArrowLeft />
              </button>
            </>
          )}
        </div>
        <div>
          Showing {(page - 1) * pageSize + 1} -{" "}
          {Math.min(page * pageSize, totalNotices)} of {totalNotices}
        </div>
        <div>
          {page < totalPages && (
            <>
              <button onClick={() => setPage((prev) => prev + 1)}>
                <SlArrowRight />
              </button>
              <button onClick={() => setPage(totalPages)}>
                <MdKeyboardDoubleArrowRight />
              </button>
            </>
          )}
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {showUpdateModal && (
        <UpdateNoticeDetailsModal
          isOpen={showUpdateModal}
          onClose={toggleUpdateNoticeDetailModal}
          formData={updateFormData}
          onEditHandler={onSubmitEdit}
        />
      )}

      {viewmodal && (
        <ViewNoticeDetailsModal
          isOpen={viewmodal}
          onClose={toggleViewNoticeDetailModal}
          formData={showViewFormData}
        />
      )}
    </div>
  );
};

export default NoticeList;
