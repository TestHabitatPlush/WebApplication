// import React, { useEffect, useState } from "react";
// import Dialog from "../../../../components/ui/Dialog";
// import TextArea from "../../../../components/ui/TextArea";
// import Button from "../../../../components/ui/Button";
// import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
// import { FaHashtag, FaRegCalendarCheck, FaCommentDots } from "react-icons/fa";

// const TicketListEdit = ({ formData, onClose, onRefresh }) => {
//   const {
//     getRefTicketStatus,
//     updateTicketStatusAndRemarks,
//     getAssignableUsers,
//   } = SoftwareHelpDeskHandler();

//   const [statusList, setStatusList] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [remarks, setRemarks] = useState("");

//   const [assignableUsers, setAssignableUsers] = useState([]);
//   const [assignedTo, setAssignedTo] = useState("");

//   useEffect(() => {
//     (async () => {
//       const list = await getRefTicketStatus();
//       setStatusList(list || []);
//       const currentStatus =
//         formData.Ticket_Details?.[0]?.ref_ticket_status
//           ?.ticket_status_description || "";
//       setSelectedStatus(currentStatus);
//       setRemarks(formData.Ticket_Details?.[0]?.ticket_comment || "");
//     })();
//   }, [formData]);

//   const handleUpdate = async () => {
//     await updateTicketStatusAndRemarks(formData.ticket_Id, {
//       ticket_status_description: selectedStatus,
//       ticket_comment: remarks,
//     });
//     onRefresh();
//     onClose();
//   };

//   useEffect(() => {
//     if (!formData) return;

//     (async () => {
//       const users = await getAssignableUsers(formData.societyId);
//       setAssignableUsers(users || []);
//       setAssignedTo(formData.assigned_to || "");
//     })();
//   }, [formData]);

//   return (
//     <Dialog
//       isOpen={!!formData}
//       onClose={onClose}
//       className="w-full h-full p-10 overflow-auto"
//       contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
//       overlayClassName="backdrop-blur"
//     >
//       <div className="p-10 my-5 bg-gray-100 border rounded-lg">
//         <h2 className="mb-6 text-2xl font-semibold text-gray-800">
//           Edit Ticket
//         </h2>

//         <ul className="space-y-6">
//           {/* Ticket ID */}
//           <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
//             <FaHashtag className="mt-1 text-xl text-blue-600" />
//             <div>
//               <h4 className="text-sm text-gray-500">Ticket ID</h4>
//               <p className="font-medium text-gray-800">
//                 {formData.ticket_Id || "—"}
//               </p>
//             </div>
//           </li>

//           {/* Status Selector */}
//           <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
//             <FaRegCalendarCheck className="mt-1 text-xl text-blue-600" />
//             <div className="w-full">
//               <h4 className="text-sm text-gray-500 mb-1">Status</h4>
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md text-sm"
//               >
//                 <option value="">Select status</option>
//                 {statusList.map((el) => (
//                   <option
//                     key={el.ticket_status_Id}
//                     value={el.ticket_status_description}
//                   >
//                     {el.ticket_status_description}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </li>

//           <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
//             <FaRegCalendarCheck className="mt-1 text-xl text-blue-600" />
//             <div className="w-full">
//               <h4 className="text-sm text-gray-500 mb-1">Assign To</h4>
//               <select
//                 value={assignedTo}
//                 onChange={(e) => setAssignedTo(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md text-sm"
//               >
//                 <option value="">Select user</option>
//                 {assignableUsers.map((user) => (
//                   <option key={user.userId} value={user.userId}>
//                     {user.name} ({user.email})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </li>

//           {/* Remarks */}
//           <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
//             <FaCommentDots className="mt-1 text-xl text-blue-600" />
//             <div className="w-full">
//               <h4 className="text-sm text-gray-500 mb-1">Remarks</h4>
//               <TextArea
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//                 rows={3}
//               />
//             </div>
//           </li>
//         </ul>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3 mt-8">
//           <Button onClick={onClose} variant="outline">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate}>Update</Button>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default TicketListEdit;



import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import TextArea from "../../../../components/ui/TextArea";
import Button from "../../../../components/ui/Button";
import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
import { FaHashtag, FaRegCalendarCheck, FaCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";

const TicketListEdit = ({ formData, onClose, onRefresh }) => {
  const {
    getRefTicketStatus,
    updateTicketStatusAndRemarks,
    getAssignableUsers,
  } = SoftwareHelpDeskHandler();

  const userId = useSelector((state) => state.auth.user?.userId);

  const [statusList, setStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const [assignableUsers, setAssignableUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    (async () => {
      const list = await getRefTicketStatus();
      setStatusList(list || []);
      const currentStatus =
        formData.Ticket_Details?.[0]?.ref_ticket_status
          ?.ticket_status_description || "";
      setSelectedStatus(currentStatus);
      setRemarks(formData.Ticket_Details?.[0]?.ticket_comment || "");
    })();
  }, [formData]);

  useEffect(() => {
    if (!formData) return;

    (async () => {
      const users = await getAssignableUsers(formData.societyId);
      setAssignableUsers(users || []);
      setAssignedTo(formData.assigned_to || "");
    })();
  }, [formData]);



  const handleUpdate = async () => {
  await updateTicketStatusAndRemarks(formData.ticket_Id, {
    ticket_status_description: selectedStatus,
    ticket_comment: remarks,
    assigned_to: assignedTo,
    userId: userId,
  });

  await onRefresh(); 
  onClose();
};

  return (
    <Dialog
      isOpen={!!formData}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Edit Ticket
        </h2>

        <ul className="space-y-6">
          {/* Ticket ID */}
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaHashtag className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Ticket ID</h4>
              <p className="font-medium text-gray-800">
                {formData.ticket_Id || "—"}
              </p>
            </div>
          </li>

          {/* Status Selector */}
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaRegCalendarCheck className="mt-1 text-xl text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500 mb-1">Status</h4>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select status</option>
                {statusList.map((el) => (
                  <option
                    key={el.ticket_status_Id}
                    value={el.ticket_status_description}
                  >
                    {el.ticket_status_description}
                  </option>
                ))}
              </select>
            </div>
          </li>

          {/* Assign To */}
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaRegCalendarCheck className="mt-1 text-xl text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500 mb-1">Assign To</h4>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select user</option>
                {assignableUsers.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
          </li>

          {/* Remarks */}
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaCommentDots className="mt-1 text-xl text-blue-600" />
            <div className="w-full">
              <h4 className="text-sm text-gray-500 mb-1">Remarks</h4>
              <TextArea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
              />
            </div>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TicketListEdit;
