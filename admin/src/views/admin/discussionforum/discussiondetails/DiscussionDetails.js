import React, { useEffect, useState } from "react";
import { FaComment,FaEye} from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import DisucssionForumHandler from "../../../../handlers/DisucssionForumHandler";
import UserGroupHandler from "../../../../handlers/UseGroupHandler";
import ChatProcessDiscussionForum from "./ChatProcessDiscussionForum";
import ViewDiscussionDetailsModal from "./ViewDiscussionDetailsModal";



const DiscussionDetails = () => {
  const paths = ["Discussion Forum", "Discussion Details"];
  const Heading = ["Discussion Details"];

  const { getDisucssionForumHandler, updateDisucssionHandler, getDisucssionByIdHandler } = DisucssionForumHandler();
  const { getUserGroupHandler } = UserGroupHandler();

  const [discussionForum, setDiscussionForum] = useState([]);
  const [totalDiscussionForum, setTotalDiscussionForum] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [userGroupId, setUserGroupId] = useState("");
  const [disscussionheading, setDisscussionHeading] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const refreshDiscussionList = async () => {
    try {
      const refreshed = await getDisucssionForumHandler({
        page,
        pageSize,
        disscussionheading,
        userGroupId,
      });
      setDiscussionForum(refreshed.data.data);
      setTotalDiscussionForum(refreshed.data.total);
    } catch (err) {
      console.error("Error refreshing discussions:", err);
    }
  };

  useEffect(() => {
    refreshDiscussionList();

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

  const handleSearchChange = (e) => {
    setDisscussionHeading(e.target.value);
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [chatmodal, setChatModal] = useState(false);
  const [showChatFormData, setShowChatFormData] = useState(null);

  const [viewmodal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  const toggleUpdateDiscussionDetailModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const onSubmitReplay = async (formData) => {
    try {
      if (!formData.societyId || !formData.discussionId) {
        console.error("Missing societyId or discussionId in formData");
        return;
      }
  
      await updateDisucssionHandler(formData);
      toggleUpdateDiscussionDetailModal();
      refreshDiscussionList();
    } catch (err) {
      console.error("Error updating discussion:", err);
    }
  };
  

  const toggleViewDiscussionDetailModal = () => {
    setViewModal((prev) => !prev);
  };



  const toggleChatDiscussionDetailModal = () => {
    setChatModal((prev) => !prev);
  };

  const onChatHandler = async (discussionId) => {
    try {
      const fetchedDiscussion = await getDisucssionByIdHandler(discussionId);
      setShowChatFormData(fetchedDiscussion);
      setChatModal(true);
    } catch (err) {
      console.error("Failed to fetch discussion by ID:", err);
    }
  };


  const onViewHandler = async (discussionId) => {
    try {
const fetchedData = await getDisucssionByIdHandler(discussionId);
    setShowViewFormData(fetchedData);
     setViewModal(true);
    } catch (err) {
      console.error("Failed to fetch discussion by ID:", err);
    }
  };
  return (
    <div className="relative">
      <UrlPath paths={paths} />
      <PageHeading heading={Heading} />

      <div className="flex flex-row mt-2 font-sans text-lg font-medium text-gray-700">
        TOTAL {totalDiscussionForum} DISCUSSIONS
      </div>

      <div className="flex flex-row justify-end mt-4">
        <select
          name="userGroupId"
          onChange={(e) => setUserGroupId(e.target.value)}
          className="px-4 py-2 uppercase border border-gray-300 rounded-md"
        >
          <option value="">All Groups</option>
          {selectedOption &&
            selectedOption.length > 0 &&
            [...selectedOption]
              .sort((a, b) => a.userGroupName.localeCompare(b.userGroupName))
              .map((item) => (
                <option key={item.userGroupId} value={item.userGroupId}>
                  {item.userGroupName}
                </option>
              ))}
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

      <div className="flex flex-col mt-4 space-y-4">
        {discussionForum && discussionForum.length > 0 ? (
          discussionForum.map((discussion) => (
            <div
              key={discussion.discussionId}
              className="relative flex flex-col p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="text-xl font-semibold text-gray-800">
                {discussion.discussionTitle}
              </div>
              <div className="absolute flex flex-row gap-2 right-2 top-2">
              <div className="relative group">
                <FaEye
                    className="text-lg text-orange-600 cursor-pointer hover:text-orange-700"
                    onClick={() => onViewHandler(discussion.discussionId)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 rounded opacity-0 bg-blue-700-600 bottom-full left-1/2 group-hover:opacity-100">
                    View
                  </span>
                </div>
                <div className="relative group">
                  <FaComment
                    className="text-lg text-blue-600 cursor-pointer hover:text-blue-700"
                    onClick={() => onChatHandler(discussion.discussionId)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 rounded opacity-0 bg-blue-700-600 bottom-full left-1/2 group-hover:opacity-100">
                    Chat
                  </span>
                </div>
                
              </div>
              <div className="mt-2 text-gray-600">
                {discussion.discussionDescription}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No discussions found.</div>
        )}
      </div>

      {chatmodal && (
        <ChatProcessDiscussionForum
          isOpen={chatmodal}
          onClose={toggleChatDiscussionDetailModal}
          formData={showChatFormData}
          onChatHandler={onSubmitReplay}
          onRefresh={refreshDiscussionList}
        />
      )}


      {viewmodal && (
        <ViewDiscussionDetailsModal
          isOpen={viewmodal}
          onClose={toggleViewDiscussionDetailModal}
          formData={showViewFormData}
        />
      )}
    </div>
  );
};

export default DiscussionDetails;
