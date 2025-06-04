import React, { useEffect, useState } from "react";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import UserHandler from "../../../../handlers/UserHandler";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ViewUserAllDetailsModal from "../deactivateuser/ViewUserAllDetailsModal";

const UnapprovedUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isUnApprovedModalOpen, setUnApprovedModal] = useState(false);

  const { getResidentBySocietyIdHandler, updateUserForApprovedAndRejectHandler } = UserHandler();

  const paths = ["User Management", "Unapproved Users"];
  const Heading = ["Unapproved Users"];

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);



  const fetchAllUserList = async () => {
    try {
      if (!societyId || !token) {
        console.error("Missing societyId or token");
        return;
      }

      const result = await getResidentBySocietyIdHandler(societyId, token, { page, pageSize });
      if (result?.residents) {
        setTransformedData(result.residents);
        setTotal(result.residents.length);
        setTotalPages(Math.ceil(result.residents.length / pageSize));
      } else {
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      console.error("Error fetching unapproved users:", err);
    }
  };
  useEffect(() => {
    if (societyId) {
      fetchAllUserList();
    } else {
      console.error("Society ID not found. Please check authentication state.");
    }
  }, [societyId, page, pageSize]);



  const handleDeactive = async (userId) => {
     try {
         if (!societyId || !token) {
           console.error("Society ID or token is missing.");
           return;
         }
     
         const updatedUser = {
           userId,  // Ensure only userId is passed
           status: "inactive",
           societyId,
         };
     
         console.log("Activating user:", updatedUser);
     
         const response = await updateUserForApprovedAndRejectHandler(updatedUser);
         
         if (response && response.status === 200) { // Ensure response is successful
           toast.success("User deactivated successfully!");
           fetchAllUserList(); // Refresh list
         } else {
           console.error("Activation failed:", response);
           toast.error("Failed to deactivate user.");
         }
       } catch (error) {
         console.error("Error deactivating user:", error);
         toast.error("Error deactivating user: " + (error.response?.data?.message || error.message));
       }
     };
  
  

  const handleActivate = async (userId) => {
     try {
        if (!societyId || !token) {
          console.error("Society ID or token is missing.");
          return;
        }
    
        const updatedUser = {
          userId,  // Ensure only userId is passed
          status: "active",
          societyId,
        };
    
        console.log("Activating user:", updatedUser);
    
        const response = await updateUserForApprovedAndRejectHandler(updatedUser);
        
        if (response && response.status === 200) { // Ensure response is successful
          toast.success("User activated successfully!");
          fetchAllUserList(); // Refresh list
        } else {
          console.error("Activation failed:", response);
          toast.error("Failed to activate user.");
        }
      } catch (error) {
        console.error("Error activating user:", error);
        toast.error("Error activating user: " + (error.response?.data?.message || error.message));
      }
    };
    

  const viewUnapprovedData = (type, user) => {
    setUnApprovedModal(type);
    setSelectedUser(user);
  };

  const closeViewModal = () => {
    setUnApprovedModal(false);
    setSelectedUser(null);
  };



  const columns = [
    {
      Header: "Sl. No",
      accessor: "serialNumber",
      Cell: ({ row }) => page * pageSize + row.index + 1,
    },
    { Header: "User Id", accessor: "userId" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Role", accessor: "roleId" },
    { Header: "Mobile No.", accessor: "mobileNumber" },
    { Header: "Email", accessor: "email" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-4">
       <button
  className="text-green-600 hover:text-green-700"
  onClick={() => handleActivate(row.original.userId)}
>
  <FaCheck className="text-lg" />
</button>

          <button
            className="text-yellow-500 hover:text-yellow-700"
            onClick={() => viewUnapprovedData("view", row.original)}
          >
            <FaEye className="text-lg" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeactive(row.original.userId)}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <UrlPath paths={paths} />
      <div className="flex">
        <div className="w-full">
          <PageHeading heading={Heading} />
          <div className="flex flex-row font-sans text-lg font-medium text-gray-700">
            TOTAL {total} USERS
          </div>

         

          <ReusableTable
            columns={columns}
            data={transformedData}
            pageIndex={page}
            pageSize={pageSize}
            totalCount={total}
            totalPages={totalPages}
            setPageIndex={setPage}
            setPageSize={setPageSize}
          />

          {/* View Unapproved User Details Modal */}
          {isUnApprovedModalOpen && (
            <ViewUserAllDetailsModal
              isOpen={isUnApprovedModalOpen}
              onClose={closeViewModal}
              formData={selectedUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnapprovedUser;
