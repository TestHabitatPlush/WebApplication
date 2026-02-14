import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Dialog from "../ui/Dialog";
import CustomerHandler from "../../handlers/superadmin/CustomerHandler";
import {
  setCustomerId,
  setFormOperationType,
} from "../../redux/slices/customerSlice";

const ActionData = ({ data, openModal, refreshList }) => {
  const dispatch = useDispatch();
  const { updateCustomerStatusHandler } = CustomerHandler();
  const token = useSelector((state) => state.auth.token);

  const [confirmAction, setConfirmAction] = useState(null); // "activate" | "inactive"
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!confirmAction) return;

    setIsLoading(true);

    const status = await updateCustomerStatusHandler(
      data.customerId,
      confirmAction === "activate" ? "active" : "inactive",
      token
    );

    if (status) refreshList();

    setIsLoading(false);
    setConfirmAction(null);
  };

  return (
    <>
      {/* ACTION ICONS */}
      <div className="flex items-center gap-3">
        {/* View */}
        <FaEye
          title="View"
          size={16}
          className="text-green-600 cursor-pointer hover:scale-110"
          onClick={() => {
            dispatch(setCustomerId(data.customerId));
            dispatch(setFormOperationType("view"));
            openModal();
          }}
        />

        {/* Edit */}
        <FaEdit
          title="Edit"
          size={16}
          className="text-orange-600 cursor-pointer hover:scale-110"
          onClick={() => {
            dispatch(setCustomerId(data.customerId));
            dispatch(setFormOperationType("edit"));
            openModal();
          }}
        />

        {/* Activate */}
        {data.status !== "active" && (
          <FaCheck
            title="Activate"
            size={16}
            className={`text-green-600 cursor-pointer hover:scale-110 ${
              isLoading && "opacity-50 pointer-events-none"
            }`}
            onClick={() => setConfirmAction("activate")}
          />
        )}

        {/* Inactivate */}
        {data.status === "active" && (
          <FaTimes
            title="Inactivate"
            size={16}
            className={`text-red-600 cursor-pointer hover:scale-110 ${
              isLoading && "opacity-50 pointer-events-none"
            }`}
            onClick={() => setConfirmAction("inactive")}
          />
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      <Dialog
        isOpen={!!confirmAction}
        onClose={() => !isLoading && setConfirmAction(null)}
      >
        <div className="p-4 bg-white rounded">
          <h2 className="text-lg font-bold">
            Confirm {confirmAction === "activate" ? "Activation" : "Inactivation"}
          </h2>

          <p className="mt-2 text-sm">
            Are you sure you want to{" "}
            <b>
              {confirmAction === "activate" ? "activate" : "inactivate"}
            </b>{" "}
            this customer?
          </p>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 text-white bg-gray-400 rounded"
              disabled={isLoading}
              onClick={() => setConfirmAction(null)}
            >
              Cancel
            </button>

            <button
              className={`px-3 py-1 text-white rounded ${
                confirmAction === "activate"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
              disabled={isLoading}
              onClick={handleConfirm}
            >
              {isLoading ? "Please wait..." : "Confirm"}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ActionData;
// import React, { useState } from "react";
// import { FaEye, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
// import Dialog from "../ui/Dialog";

// const ActionData = ({ data, onView, onEdit, onStatusChange }) => {
//   const [confirmAction, setConfirmAction] = useState(null); // "activate" | "inactive"
//   const [isLoading, setIsLoading] = useState(false);

//   const handleConfirm = async () => {
//     if (!confirmAction) return;
//     setIsLoading(true);

//     if (onStatusChange) {
//       await onStatusChange(data, confirmAction); // pass the data and action
//     }

//     setIsLoading(false);
//     setConfirmAction(null);
//   };

//   return (
//     <>
//       <div className="flex items-center gap-3">
//         {/* VIEW */}
//         <FaEye
//           title="View"
//           size={16}
//           className="text-green-600 cursor-pointer hover:scale-110"
//           onClick={() => onView && onView(data)}
//         />

//         {/* EDIT */}
//         <FaEdit
//           title="Edit"
//           size={16}
//           className="text-orange-600 cursor-pointer hover:scale-110"
//           onClick={() => onEdit && onEdit(data)}
//         />

//         {/* ACTIVATE */}
//         {data.status !== "active" && (
//           <FaCheck
//             title="Activate"
//             size={16}
//             className={`text-green-600 cursor-pointer hover:scale-110 ${
//               isLoading && "opacity-50 pointer-events-none"
//             }`}
//             onClick={() => setConfirmAction("activate")}
//           />
//         )}

//         {/* INACTIVATE */}
//         {data.status === "active" && (
//           <FaTimes
//             title="Inactivate"
//             size={16}
//             className={`text-red-600 cursor-pointer hover:scale-110 ${
//               isLoading && "opacity-50 pointer-events-none"
//             }`}
//             onClick={() => setConfirmAction("inactive")}
//           />
//         )}
//       </div>

//       {/* CONFIRMATION MODAL */}
//       <Dialog
//         isOpen={!!confirmAction}
//         onClose={() => !isLoading && setConfirmAction(null)}
//       >
//         <div className="p-4 bg-white rounded">
//           <h2 className="text-lg font-bold">
//             Confirm {confirmAction === "activate" ? "Activation" : "Inactivation"}
//           </h2>
//           <p className="mt-2 text-sm">
//             Are you sure you want to{" "}
//             <b>{confirmAction === "activate" ? "activate" : "inactivate"}</b> this user?
//           </p>
//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               className="px-3 py-1 text-white bg-gray-400 rounded"
//               disabled={isLoading}
//               onClick={() => setConfirmAction(null)}
//             >
//               Cancel
//             </button>
//             <button
//               className={`px-3 py-1 text-white rounded ${
//                 confirmAction === "activate" ? "bg-green-600" : "bg-red-600"
//               }`}
//               disabled={isLoading}
//               onClick={handleConfirm}
//             >
//               {isLoading ? "Please wait..." : "Confirm"}
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default ActionData;
