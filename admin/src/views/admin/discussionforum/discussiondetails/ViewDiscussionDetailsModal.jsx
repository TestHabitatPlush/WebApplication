
import React from "react";
import Dialog from "../../../../components/ui/Dialog";
import { FaHeading, FaStickyNote, FaUsers, FaFileAlt, FaImage, FaLock } from "react-icons/fa";

// Helper to resolve full image URL
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  //return `http://localhost:5000/${path}`;
  return `${process.env.REACT_APP_PUBLIC_BASE_URL}/${path}` // Replace with actual server URL
};

const getGroupName = (id) => {
  switch (id) {
    case 1:
      return "Only for Owners";
    case 2:
      return "Only for Tenants";
    case 3:
      return "All Members";
    case 4:
      return "All Primary Contacts";
    default:
      return "N/A";
  }
};

const ViewDiscussionDetailsModal = ({
  isOpen,
  onClose,
  formData,
  onBlockDiscussion,
  OnlyforOwners,
}) => {
  const imageUrl = getImageUrl(formData?.document);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-6"
      overlayClassName="backdrop-blur"
    >
      <div className="p-8 bg-gray-100 border rounded-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Discussion Details</h2>

        <ul className="space-y-6">
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaHeading className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Discussion Heading</h4>
              <p className="font-medium text-gray-800">{formData?.discussionTitle || "—"}</p>
            </div>
          </li>

         

          <li className="flex items-start gap-4 p-4 bg-white border rounded-md shadow-sm">
            <FaStickyNote className="flex-shrink-0 mt-1 text-2xl text-blue-600" />
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-medium text-gray-600">Discussion Description</h4>
              <div className="p-3 overflow-auto text-sm text-gray-800 whitespace-pre-line border border-gray-200 rounded max-h-48 bg-gray-50">
                {formData?.discussionDescription || "—"}
              </div>
            </div>
          </li>


        

          {imageUrl && (
            <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
              <FaImage className="mt-1 text-xl text-blue-600" />
              <div>
                <h4 className="text-sm text-gray-500">Uploaded Image</h4>
                <img
                  src={imageUrl}
                  alt="Uploaded Document"
                  className="w-full max-w-md mt-2 border border-gray-300 rounded-lg"
                />
              </div>
            </li>
          )}

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaUsers className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">User Group</h4>
              <span className="inline-block px-3 py-1 mt-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                {getGroupName(formData?.userGroupId)}
              </span>
            </div>
          </li>

          {formData?.documentUrl && (
            <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
              <FaFileAlt className="mt-1 text-xl text-blue-600" />
              <div>
                <h4 className="text-sm text-gray-500">Attached Document</h4>
                <a
                  href={formData.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-sm text-blue-600 underline hover:text-blue-800"
                >
                  View Document
                </a>
              </div>
            </li>
          )}
        </ul>

        {OnlyforOwners && (
          <div className="pt-8 mt-8 text-right border-t">
            <button
              onClick={() => onBlockDiscussion(formData?.discussionId)}
              className="inline-flex items-center gap-2 px-5 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              <FaLock />
              Block This Discussion
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ViewDiscussionDetailsModal;
