// "use client";

// import React, { useEffect, useState } from "react";
// import Dialog from "@/components/ui/Dialog";
// import TextArea from "@/components/ui/TextArea";
// import Button from "@/components/ui/Button";
// import SuperAdminItHandler from "@/handlers/SuperAdminItHandler";
// import { FaHashtag, FaRegCalendarCheck, FaCommentDots } from "react-icons/fa";
// import { useSelector } from "react-redux";

// const TicketListEdit = ({ formData, onClose, onRefresh }) => {
//   const handler = SuperAdminItHandler();
//   const {
//     getRefTicketStatus,
//     updateTicketStatusAndRemarks,
//     getAssignableUsers,
//   } = handler;

//   const userId = useSelector((state) => state.auth.user?.userId);

//   const [statusList, setStatusList] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [assignableUsers, setAssignableUsers] = useState([]);
//   const [assignedTo, setAssignedTo] = useState("");

//   const latestDetail = [...(formData?.Software_Ticket_Details || [])]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

// useEffect(() => {
//   (async () => {
//     const list = await getRefTicketStatus();
//     setStatusList(list || []);

//     // ✅ Use status ID (select value expects ID)
//     setSelectedStatus(latestDetail?.ticket_status_Id || "");

//     setRemarks(latestDetail?.ticket_comment || "");

//     // ✅ Handle both object & ID cases
//     setAssignedTo(
//       latestDetail?.assignedTo?.userId ||
//       latestDetail?.assigned_to ||
//       ""
//     );
//   })();
// }, [formData]);


//   useEffect(() => {
//     if (!formData) return;
//     (async () => {
//       const users = await getAssignableUsers(formData.societyId);
//       setAssignableUsers(users || []);
//     })();
//   }, [formData]);

//   const handleUpdate = async () => {
//     if (!selectedStatus || !remarks) return;

//     const payload = {
//       ticket_status_description: selectedStatus, 
//       ticket_comment: remarks,
//       assigned_to: 17,
//       userId: 17,
//     };

//     await updateTicketStatusAndRemarks(formData.ticket_Id, payload);
//     await onRefresh(); 
//     onClose();
//   };

//   return (
//     <Dialog isOpen={!!formData} onClose={onClose}>
//       <div className="p-6">
//         <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>

//         <div className="space-y-4">
//           <div>
//             <label>Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select</option>
//               {statusList.map((el) => (
//                 <option
//                   key={el.ticket_status_Id}
//                   value={el.ticket_status_description}
//                 >
//                   {el.ticket_status_description}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Assign To</label>
//             <select
//               value={assignedTo}
//               onChange={(e) => setAssignedTo(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select</option>
//               {assignableUsers.map((u) => (
//                 <option key={u.userId} value={u.userId}>
//                   {u.firstName} {u.lastName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Remarks</label>
//             <TextArea
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//             />
//           </div>

//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdate}>Update</Button>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default TicketListEdit;

"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@/components/ui/Dialog";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import SuperAdminItHandler from "@/handlers/SuperAdminItHandler";
import { useSelector } from "react-redux";

const TicketListEdit = ({ formData, onClose, onRefresh }) => {
  const { getRefTicketStatus, updateTicketStatusAndRemarks, getAssignableUsers } = SuperAdminItHandler();
  const userId = useSelector((s) => s.auth.user?.userId);

  const latest = formData?.Software_Ticket_Details?.[0];

  const [statusList, setStatusList] = useState([]);
  const [assignableUsers, setAssignableUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    getRefTicketStatus().then(setStatusList);
    if (latest) {
      setSelectedStatus(latest.ticket_status_Id || "");
      setRemarks(latest.ticket_comment || "");
      setAssignedTo(latest.assignedTo?.userId || "");
    }
  }, [formData]);

  useEffect(() => {
    if (formData?.societyId) {
      getAssignableUsers(formData.societyId).then(setAssignableUsers);
    }
  }, [formData]);

  const handleUpdate = async () => {
    if (!selectedStatus) return;
    await updateTicketStatusAndRemarks(formData.ticket_Id, {
      ticket_status_Id: selectedStatus,
      ticket_comment: remarks,
      assigned_to: assignedTo || null,
      updated_by_user_id: userId,
    });
    onRefresh();
    onClose();
  };

  return (
    <Dialog isOpen={!!formData} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Edit Ticket</h2>

        <select className="w-full border p-2 rounded" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Select Status</option>
          {statusList.map((s) => (
            <option key={s.ticket_status_Id} value={s.ticket_status_Id}>
              {s.ticket_status_description}
            </option>
          ))}
        </select>

        <select className="w-full border p-2 rounded" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Assign To</option>
          {assignableUsers.map((u) => (
            <option key={u.userId} value={u.userId}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>

        <TextArea value={remarks} onChange={(e) => setRemarks(e.target.value)} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TicketListEdit;
