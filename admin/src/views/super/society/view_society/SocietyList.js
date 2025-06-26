// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import ReusableTable from "../../../../components/shared/ReusableTable";
// import {
//   setPage,
//   setPageSize,
//   setFilters,
// } from "../../../../redux/slices/societySlice";
// import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";
// import ViewSocietyDetailsModal from "./components/ViewSocietyDetailsModal";
// import {
//   resetCustomerFormOperationType,
//   setCustomerId,
//   setFormOperationType,
// } from "../../../../redux/slices/customerSlice";

// import Button from "../../../../components/ui/Button";
// import  Dialog  from "../../../../components/ui/Dialog";
// import UserHandler from "../../../../handlers/UserHandler";

// const ActionData = ({ data, openModal }) => {
//   const dispatch = useDispatch();
//   const [status, setStatus] = useState(data.status);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const { activateModeratorHandler, inactivateModeratorHandler } = UserHandler();

//   const handleActivateClick = async () => {
//     const newStatus = await activateModeratorHandler(data.customerId);
//     if (newStatus) setStatus(newStatus);
//   };

//   const confirmInactivate = async () => {
//     const newStatus = await inactivateModeratorHandler(data.customerId);
//     if (newStatus) setStatus(newStatus);
//     setShowConfirmModal(false);
//   };

//   const openInactivateModal = () => setShowConfirmModal(true);
//   const closeInactivateModal = () => setShowConfirmModal(false);

//   return (
//     <div className="flex gap-2">
//       <button
//         className="px-2 py-1 text-xs text-white rounded-md bg-lime"
//         onClick={() => {
//           dispatch(setCustomerId(data.customerId));
//           dispatch(setFormOperationType("view"));
//           openModal();
//         }}
//       >
//         View
//       </button>

//       <button
//         className="px-2 py-1 text-xs text-white bg-gray-900 rounded-md"
//         onClick={() => {
//           dispatch(setCustomerId(data.customerId));
//           dispatch(setFormOperationType("edit"));
//           openModal();
//         }}
//       >
//         Edit
//       </button>

//       {status !== "active" && (
//           <Button
//             onClick={handleActivateClick}
//             className="px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700 w-fit"

//           >
//             Active
//           </Button>
//         )}

//         {status === "active" && (
//           <Button
//             onClick={openInactivateModal}
//             className="text-xs text-white bg-red-600 rounded-md hover:bg-red-700"
//           >
//             Inactive
//           </Button>
//         )}

//       {/* Confirmation Modal */}
//       <Dialog isOpen={showConfirmModal} onClose={closeInactivateModal}>
//         <div className="p-4 bg-white">
//           <h2 className="mb-2 text-lg font-bold">Confirm Inactivation</h2>
//           <p>Are you sure you want to inactivate this moderator?</p>
//           <div className="flex justify-end gap-2 mt-4">
//             <Button className="bg-gray-400 hover:bg-gray-500" onClick={closeInactivateModal}>
//               Cancel
//             </Button>
//             <Button className="bg-red-600 hover:bg-red-700" onClick={confirmInactivate}>
//               Confirm
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// const SocietyList = () => {
//   const dispatch = useDispatch();
//   const { getCustomerHandler } = CustomerHandler();
//   const { data, page, pageSize, total, totalPages, columns, status, filters } =
//     useSelector((state) => state.society);
//   const [viewModal, setViewModal] = useState(false);

//   const openModal = () => {
//     setViewModal(true);
//   };

//   const closeModal = () => {
//     setViewModal(false);
//     dispatch(resetCustomerFormOperationType());
//   };

//   const fetchSocietiesData = async () => {
//     try {
//       const result = await getCustomerHandler({
//         page,
//         pageSize,
//         ...filters,
//       });

//       const transformedData = {
//         data: result.data.data.map((item) => ({
//           customerId: item.customerId,
//           customerName: item.customerName,
//           customerType: item.customerType,
//           email: item.email,
//           phone: item.phone,
//           establishedYear: item.establishedYear,
//           societyType: item.societyType,
//           status: item.status,
//           actions: <ActionData data={item} openModal={openModal} />,
//         })),
//         total: result.data.total,
//         totalPages: result.data.totalPages,
//       };

//       dispatch({
//         type: "society/updateData",
//         payload: transformedData,
//       });
//     } catch (error) {
//       console.error("Failed to fetch societies data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSocietiesData();
//   }, [dispatch, page, pageSize, filters]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Customer List</h1>

//       <ReusableTable
//         columns={columns}
//         data={data}
//         pageIndex={page}
//         pageSize={pageSize}
//         totalCount={total}
//         totalPages={totalPages}
//         setPageIndex={(index) => dispatch(setPage(index))}
//         setPageSize={(size) => dispatch(setPageSize(size))}
//       />

//       {viewModal && (
//         <ViewSocietyDetailsModal isOpen={viewModal} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default SocietyList;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReusableTable from "../../../../components/shared/ReusableTable";
import {
  setPage,
  setPageSize,
  setFilters,
} from "../../../../redux/slices/societySlice";
import {
  resetCustomerFormOperationType,
  setCustomerId,
  setFormOperationType,
} from "../../../../redux/slices/customerSlice";
import ViewSocietyDetailsModal from "../view_society/components/ViewSocietyDetailsModal";
import Dialog from "../../../../components/ui/Dialog";
import Button from "../../../../components/ui/Button";
import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";

const ActionData = ({ data, openModal, refreshList }) => {
  const dispatch = useDispatch();
  const { updateCustomerStatusHandler } = CustomerHandler();
  const token = useSelector((state) => state.auth.token); // ✅ get token from Redux

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActivateClick = async () => {
    setIsLoading(true);
    const newStatus = await updateCustomerStatusHandler(data.customerId, "active", token); // ✅ pass token
    if (newStatus === "active") refreshList();
    setIsLoading(false);
  };

  const confirmInactivate = async () => {
    setIsLoading(true);
    const newStatus = await updateCustomerStatusHandler(data.customerId, "inactive", token); // ✅ pass token
    if (newStatus === "inactive") refreshList();
    setShowConfirmModal(false);
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2">
      {/* View and Edit buttons unchanged */}
      {data.status !== "active" && (
        <Button
          onClick={handleActivateClick}
          className="px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          Activate
        </Button>
      )}

      {data.status === "active" && (
        <>
          <Button
            onClick={() => setShowConfirmModal(true)}
            className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
            disabled={isLoading}
          >
            Inactivate
          </Button>

          <Dialog isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
            <div className="p-4 bg-white">
              <h2 className="mb-2 text-lg font-bold">Confirm Inactivation</h2>
              <p>Are you sure you want to inactivate this customer?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  className="bg-gray-400 hover:bg-gray-500"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmInactivate}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

const SocietyList = () => {
  const dispatch = useDispatch();
  const { getCustomerHandler } = CustomerHandler();
  const { data, page, pageSize, total, totalPages, columns, status, filters } =
    useSelector((state) => state.society);
  const [viewModal, setViewModal] = useState(false);

  const openModal = () => setViewModal(true);

  const closeModal = () => {
    setViewModal(false);
    dispatch(resetCustomerFormOperationType());
  };

  const fetchUserList = async () => {
  try {
    const result = await getCustomerHandler({
      page,
      pageSize,
      ...filters,
    });

    if (!result?.data?.data) {
      console.error("Invalid response shape:", result);
      return;
    }

    const transformedData = {
      data: result.data.data.map((item) => ({
        customerId: item.customerId,
        customerName: item.customerName,
        customerType: item.customerType,
        email: item.email,
        phone: item.phone,
        establishedYear: item.establishedYear,
        societyType: item.societyType,
        status: item.status,
        actions: (
          <ActionData
            data={item}
            openModal={openModal}
            refreshList={fetchUserList}
          />
        ),
      })),
      total: result.data.total,
      totalPages: result.data.totalPages,
    };

    dispatch({
      type: "society/updateData",
      payload: transformedData,
    });

  } catch (error) {
    console.error("Failed to fetch user list:", error);
  }
};


  useEffect(() => {
    fetchUserList();
  }, [dispatch, page, pageSize, filters]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h1>User List</h1>

      <ReusableTable
        columns={columns}
        data={data}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={(index) => dispatch(setPage(index))}
        setPageSize={(size) => dispatch(setPageSize(size))}
      />

      {viewModal && (
        <ViewSocietyDetailsModal isOpen={viewModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default SocietyList;
