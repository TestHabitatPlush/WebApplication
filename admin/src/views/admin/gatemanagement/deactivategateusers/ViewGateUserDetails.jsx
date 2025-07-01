import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import ProfileHandler from "../../../../handlers/ProfileHandler";

function ViewGateUserDetails({ isOpen, onClose, formData }) {
  const [gateViewForm, setGateViewForm] = useState(formData);
  const { removeGuardUser } = ProfileHandler();

  useEffect(() => {
    setGateViewForm(formData);
  }, [formData]);

  const formatString = (inputString) => {
    if (!inputString) return "";
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${process.env.REACT_APP_PUBLIC_BASE_URL}/${path}`;
  };

  const imageUrl = getImageUrl(gateViewForm?.profilePhoto);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-6 overflow-auto"
      contentClassName="w-full bg-white lg:max-w-2xl rounded-lg shadow-md overflow-auto scrollbar p-6"
      overlayClassName="backdrop-blur"
    >
      <div className="flex flex-col items-center gap-6 mt-6">
        {/* Profile Image */}
        {imageUrl && (
          <div className="flex flex-col items-center">
            <img
              src={imageUrl}
              alt="Profile"
              className="object-cover mt-2 border border-gray-300 rounded-lg shadow-sm w-80 h-80"
            />
          </div>
        )}

        {/* Details Under Image */}
        <div className="w-full max-w-lg mt-4 space-y-3 text-base text-left text-gray-800">
          <p><span className="font-semibold">Name:</span> {gateViewForm?.firstName} {gateViewForm?.lastName}</p>
          <p><span className="font-semibold">Email:</span> {gateViewForm?.email}</p>
          <p><span className="font-semibold">Mobile Number:</span> {gateViewForm?.mobileNo}</p>
          <p><span className="font-semibold">Status:</span> {gateViewForm?.status}</p>
          <p><span className="font-semibold">Job Role:</span> {formatString(gateViewForm?.roleCategory)}</p>
          <p><span className="font-semibold">Last Working Date:</span> {formatDate(gateViewForm?.updatedAt)}</p>
        </div>
      </div>
    </Dialog>
  );
}

export default ViewGateUserDetails;
