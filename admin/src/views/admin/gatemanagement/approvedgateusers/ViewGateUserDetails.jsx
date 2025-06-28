import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import ProfileHandler from "../../../../handlers/ProfileHandler";
import { GoAlertFill } from "react-icons/go";

function ViewGateUserDetails({ deleteButton, isOpen, onClose, formData }) {
  const [noticeViewForm, setNoticeViewForm] = useState(formData);
  const { removeGuardUser } = ProfileHandler();

  useEffect(() => {
    setNoticeViewForm(formData);
  }, [formData]);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${process.env.REACT_APP_PUBLIC_BASE_URL}/${path}`;
  };

  const imageUrl = getImageUrl(noticeViewForm?.profilePhoto);

  const formatString = (inputString) => {
    if (!inputString) return "";
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const removeGateUser = (profileId) => {
    removeGuardUser(profileId);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      {/* Delete Confirmation Section */}
      {deleteButton && (
        <div className="flex justify-center gap-4 mt-10">
          <GoAlertFill className="mt-3 text-3xl text-red-500" />
          <button
            className="p-3 bg-yellow-500 rounded-lg"
            onClick={() => removeGateUser(noticeViewForm?.id)}
          >
            <h3 className="text-2xl text-black">Are you sure?</h3>
          </button>
          <GoAlertFill className="mt-3 text-3xl text-red-500" />
        </div>
      )}

      {/* Profile Image + Details Side by Side */}
      <div className="flex flex-col items-center justify-center gap-10 mt-20 lg:flex-row">
        {/* Profile Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt="Profile"
              className="object-cover border border-gray-300 rounded-lg shadow-md w-80 h-80"
            />
          </div>
        )}

        {/* Profile Details */}
        <div className="w-full max-w-md space-y-4 text-base text-justify text-gray-800">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {noticeViewForm?.firstName} {noticeViewForm?.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {noticeViewForm?.email}
          </p>
          <p>
            <span className="font-semibold">Mobile Number:</span>{" "}
            {noticeViewForm?.mobileNo}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {noticeViewForm?.status}
          </p>
          <p>
            <span className="font-semibold">Job Role:</span>{" "}
            {formatString(noticeViewForm?.roleCategory)}
          </p>
          <p>
            <span className="font-semibold">Last Working Date:</span>{" "}
            {formatDate(noticeViewForm?.updatedAt)}
          </p>
        </div>
      </div>
    </Dialog>
  );
}

export default ViewGateUserDetails;
