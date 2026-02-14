
"use client"
import React from "react";
import Dialog from "@/components/ui/Dialog";
import TextArea from "@/components/ui/TextArea";
import {
  FaHashtag,
  FaHeading,
  FaRegCalendarCheck,
  FaUserCheck,
  FaUserEdit,
  FaPaperclip,
  FaAlignLeft,
  FaCommentDots,
} from "react-icons/fa";

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${path}`;
};


const TicketListView = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const description =
    ticket.Ticket_Details?.[0]?.ticket_details_description ||
    ticket.ticket_description ||
    "—";

  const status =
    ticket.Ticket_Details?.[0]?.ref_ticket_status?.ticket_status_description ||
    "—";

  const remark = ticket.Ticket_Details?.[0]?.ticket_comment || "—";
  // const assignedTo = ticket.Ticket_Details?.[0]?.assignedUser.firstName .assignedUser.lastName || "—";

// const assignedTo = ticket.Ticket_Details?.[0]?.assignedUser ? `${ticket.Ticket_Details[0].assignedUser.firstName} ${ticket.Ticket_Details[0].assignedUser.lastName}`
//   : "—";

  // console.log("assignedTo:", assignedTo);


// const updatedBy = ticket.Ticket_Details?.[0]?.updatedUser
//   ? `${ticket.Ticket_Details[0].updatedUser.firstName} ${ticket.Ticket_Details[0].updatedUser.lastName}`
//   : "—";
// console.log("updatedBy:", updatedBy);


  // const updatedBy = ticket.Ticket_Details?.[0]?.updated_by_user_id || "—";

  const attachmentPath = ticket.Ticket_Details?.[0]?.ticket_attachment_details;
  const attachment = getImageUrl(attachmentPath);

  // console.log("Attachment path from DB:", attachmentPath);
  // console.log("Final image URL:", attachment);

  return (
    <Dialog
      isOpen={!!ticket}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-8 my-5 bg-gray-100 border rounded-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Ticket Details
        </h2>

        <ul className="space-y-4">
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaHashtag className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Ticket ID</h4>
              <p className="text-gray-800 font-medium">
                {ticket.ticket_Id || "—"}
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaHeading className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Title</h4>
              <p className="text-gray-800 font-medium">
                {ticket.ticket_title || "—"}
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaRegCalendarCheck className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Status</h4>
              <p className="text-gray-800 font-medium">{status}</p>
            </div>
          </li>

          {/* <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaUserCheck className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Assigned To</h4>
              <p className="text-gray-800 font-medium">{assignedTo}</p>
            </div>
          </li> */}
 
           {/* <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaUserEdit className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Updated By</h4>
              <p className="text-gray-800 font-medium">{updatedBy}</p>
            </div>
          </li>  */}

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaPaperclip className="mt-1 text-xl text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500 mb-1">Attachment</h4>
              {attachment ? (
                <img
                  src={attachment}
                  alt="Ticket Attachment"
                  className="max-w-xs border rounded shadow"
                />
              ) : (
                <p className="text-gray-800 font-medium">—</p>
              )}
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaAlignLeft className="mt-1 text-xl text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500 mb-1">Description</h4>
              <TextArea value={description} rows={5} disabled />
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaCommentDots className="mt-1 text-xl text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500 mb-1">Remarks</h4>
              <TextArea value={remark} rows={3} disabled />
            </div>
          </li>
        </ul>
      </div>
    </Dialog>
  );
};

export default TicketListView;
