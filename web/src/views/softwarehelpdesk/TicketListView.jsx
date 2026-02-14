


// "use client";
// import React from "react";
// import Dialog from "@/components/ui/Dialog";
// import TextArea from "@/components/ui/TextArea";
// import {
//   FaHashtag,
//   FaHeading,
//   FaRegCalendarCheck,
//   FaUserCheck,
//   FaUserEdit,
//   FaPaperclip,
//   FaAlignLeft,
//   FaCommentDots,
// } from "react-icons/fa";

// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${path}`;
// };

// const TicketListView = ({ ticket, onClose }) => {
//   if (!ticket) return null;

//   const latestDetail = ticket?.Software_Ticket_Details?.[0];

//   const description =
//     latestDetail?.ticket_details_description ||
//     ticket.ticket_description ||
//     "—";
// console.log("description",description)
//   const status =
//     latestDetail?.software_ref_ticket_status?.ticket_status_description || "—";
//     console.log(status);

//   const remark = latestDetail?.ticket_comment || "—";
//   console.log("remark",remark)

//   const assignedTo = latestDetail?.assignedTo
//     ? `${latestDetail.assignedTo.firstName} ${latestDetail.assignedTo.lastName}`
//     : "—";
// console.log("asssignedTo",assignedTo)
//   const updatedBy = latestDetail?.updatedBy
//     ? `${latestDetail.updatedBy.firstName} ${latestDetail.updatedBy.lastName}`
//     : "—";
// console.log("updatedBy",updatedBy)
//   const createdBy = latestDetail?.createdBy
//     ? `${latestDetail.createdBy.firstName} ${latestDetail.createdBy.lastName}`
//     : "—";
//     console.log("createdBy",createdBy)

//   // ✅ FIX 2: attachment fallback (DETAIL → SUMMARY)
//   const attachment = getImageUrl(
//     latestDetail?.ticket_attachment_details ||
//       ticket?.ticket_attachment_details
//   );

//   console.log("attachment",attachment)

//   return (
//     <Dialog
//       isOpen={!!ticket}
//       onClose={onClose}
//       className="w-full h-full p-10 overflow-auto"
//       contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
//       overlayClassName="backdrop-blur"
//     >
//       <div className="p-8 my-5 bg-gray-100 border rounded-lg">
//         <h2 className="mb-6 text-2xl font-semibold text-gray-800">
//           Ticket Details
//         </h2>

//         <ul className="space-y-4">
//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaHashtag className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Ticket ID</h4>
//               <p className="font-medium">{ticket.ticket_Id}</p>
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaHeading className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Title</h4>
//               <p className="font-medium">{ticket.ticket_title}</p>
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaRegCalendarCheck className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Status</h4>
//               <p className="font-medium">{status}</p>
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaUserCheck className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Assigned To</h4>
//               <p className="font-medium">{assignedTo}</p>
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaUserEdit className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Updated By</h4>
//               <p className="font-medium">{updatedBy}</p>
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaUserCheck className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Created By</h4>
//               <p className="font-medium">{createdBy}</p>
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaPaperclip className="mt-1 text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500 mb-1">Attachment</h4>
//               {attachment ? (
//                 <img
//                   src={attachment}
//                   alt="Attachment"
//                   className="max-w-xs rounded border"
//                 />
//               ) : (
//                 "—"
//               )}
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaAlignLeft className="mt-1 text-blue-600" />
//             <div className="w-full">
//               <h4 className="text-sm text-gray-500">Description</h4>
//               <TextArea value={description} rows={5} disabled />
//             </div>
//           </li>

//           <li className="flex gap-4 p-4 bg-white rounded shadow">
//             <FaCommentDots className="mt-1 text-blue-600" />
//             <div className="w-full">
//               <h4 className="text-sm text-gray-500">Remarks</h4>
//               <TextArea value={remark} rows={3} disabled />
//             </div>
//           </li>
//         </ul>
//       </div>
//     </Dialog>
//   );
// };

// export default TicketListView;

"use client";

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


// const getImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${path}`;
// };


const getImageUrl = (path) => {
  if (!path) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

  return `${baseUrl}/uploads/${path}`;
};


console.log("TicketListView",getImageUrl)
const TicketListView = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const latestDetail = [...(ticket.Software_Ticket_Details || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const description =
    latestDetail?.ticket_details_description ||
    ticket.ticket_description ||
    "—";

const STATUS_MAP = {
  1: "Open",
  5: "In Progress",
};

const status =
  latestDetail?.ref_ticket_status?.ticket_status_description ||
  STATUS_MAP[latestDetail?.ticket_status_Id] ||
  "—";

const remark = latestDetail?.ticket_comment || "—";

const attachment = getImageUrl(
  latestDetail?.ticket_attachment_details
);



  const assignedUser =
    latestDetail?.assignedUser || latestDetail?.assignedTo || null;
console.log("assignedUSer:",assignedUser)
  const assignedTo = assignedUser
    ? `${assignedUser.firstName} ${assignedUser.lastName}`
    : "—";

    console.log("assignedTo",assignedTo)

  const updatedBy = latestDetail?.updatedBy
    ? `${latestDetail.updatedBy.firstName} ${latestDetail.updatedBy.lastName}`
    : "—";

  const createdBy = latestDetail?.createdBy
    ? `${latestDetail.createdBy.firstName} ${latestDetail.createdBy.lastName}`
    : "—";




  console.log("attachment",attachment)

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
          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaHashtag className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Ticket ID</h4>
              <p className="font-medium">{ticket.ticket_Id || "—"}</p>
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaHeading className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Title</h4>
              <p className="font-medium">{ticket.ticket_title || "—"}</p>
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaRegCalendarCheck className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Status</h4>
              <p className="font-medium">{status}</p>
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaUserCheck className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Assigned To</h4>
              <p className="font-medium">{assignedTo}</p>
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaUserEdit className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Updated By</h4>
              <p className="font-medium">{updatedBy}</p>
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaUserCheck className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Created By</h4>
              <p className="font-medium">{createdBy}</p>
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaPaperclip className="mt-1 text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Attachment</h4>
              {attachment ? (
                <img src={attachment} alt="Attachment" className="max-w-xs rounded border" />
              ) : (
                "—"
              )}
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaAlignLeft className="mt-1 text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500">Description</h4>
              <TextArea value={description} rows={5} disabled />
            </div>
          </li>

          <li className="flex gap-4 p-4 bg-white rounded shadow">
            <FaCommentDots className="mt-1 text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500">Remarks</h4>
              <TextArea value={remark} rows={3} disabled />
            </div>
          </li>
        </ul>
      </div>
    </Dialog>
  );
};

export default TicketListView;

