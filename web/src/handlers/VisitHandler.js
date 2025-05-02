// import { createvisitorEntryService } from "@/services/visitorService";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// const VisitHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//  const societyId = useSelector((state) => state.auth.user.Customer);
//  // console.log(societyId);
//   const senderId = useSelector((state) => state.auth.user.userId);

//   const createNewVisitorEntry = async (data) => {
//     return await createvisitorEntryService({ ...data, societyId, senderId }, token)
//       .then((res) => {
//         if (res.status === 201) {
//           toast.success("Visitor created successfully.");
//         }
//       })
//       .catch((error) => {
//         toast.error("Error creating visitor entry: " + error.message);
//       });
//   };

//   return { createNewVisitorEntry };
// };

// export default VisitHandler;



// import { createvisitorEntryService } from "@/services/visitorService";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// const VisitHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   // const societyId = useSelector((state) => state.auth.user?.Customer);  
//   const societyId = useSelector((state) => state.auth.user?.Customer) || 1; 

//   const senderId = useSelector((state) => state.auth.user?.userId);


//   // console.log("Redux state:", useSelector((state) => state.auth));  // Debugging log

//   const createNewVisitorEntry = async (data) => {
//     if (!societyId) {
//       toast.error("Society ID is missing. Please log in again.");
//       return;
//     }

//     return await createvisitorEntryService({ ...data, societyId, senderId }, token)
//       .then((res) => {
//         if (res.status === 201) {
//           toast.success("Visitor created successfully.");
//         }
//       })
//       .catch((error) => {
//         toast.error("Error creating visitor entry: " + error.message);
//       });
//   };

//   return { createNewVisitorEntry };
// };

// export default VisitHandler;


import {
  createVisitorEntryService,
  getVisitorRelationshipService,
  getVisitorListForResidentService,
  getQrCodeByIdService,
  deleteVisitorService,
  getVisitorEntryByIdService,
  getVisitorEntryTableService ,
} from "@/services/visitorService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
// import { useState } from "react";

const VisitHandler = () => {
  // const [qrCodeData, setQrCodeData] = useState(null); // Define state for QR Code data

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
  console.log(societyId);
 

const senderId = useSelector((state) => state.auth.user.userId);
console.log(senderId);
  // const societyId = 2;
  // Fetch visitor relationships

  const fetchVisitorRelationship = async () => {
    try {
      const response = await getVisitorRelationshipService({ societyId }, token);
      if (response.status === 200) {
        return response.data;
      }
      console.error("Unexpected response status:", response.status);
      return [];
    } catch (err) {
      console.error("Error fetching visitor relationships:", err.message);
      return [];
    }
  };

  

  // Create new visitor entry
  const createNewVisitorEntry = async (data) => {
    try {
      const response = await createVisitorEntryService({...data, societyId, senderId}, token);
     if (response.status === 201) {
        toast.success("Visitor created successfully.");
        return response.data;
      }
    } catch (error) {
      toast.error("Failed to create visitor.");
      throw error;
    }
  };
 
  
  // const createNewVisitorEntry = async (data) => {
  //   try {
  //     console.log("Sending visitor data:", { ...data, societyId, senderId });
  
  //     if (!societyId) {
  //       console.error("societyId is missing in VisitHandler!");
  //       toast.error("Society ID is missing. Please log in again.");
  //       return;
  //     }
  
  //     const response = await createVisitorEntryService(
  //       { ...data, societyId, senderId },
  //       token
  //     );
  
  //     if (response.status === 201) {
  //       toast.success("Visitor created successfully.");
  //       return response.data;
  //     }
  //   } catch (error) {
  //     toast.error("Failed to create visitor.");
  //     console.error("Error creating visitor:", error);
  //     throw error;
  //   }
  // };
  

  // Delete visitor by ID
  const deleteVisitorById = async (id) => {
    try {
      const response = await deleteVisitorService(id, token);
      if (response.status === 200) {
        toast.success("Visitor deleted successfully");
        return response.data;
      } else {
        toast.error("Failed to delete the visitor");
      }
    } catch (err) {
      console.error("Error deleting visitor:", err);
      toast.error("An error occurred while deleting the visitor.");
    }
  };

  // Get visitor details by ID
  const getVisitorById = async (id) => {
    try {
      const response = await getVisitorEntryByIdService(id, token);
      return response.data;
    } catch (err) {
      console.error("Error fetching visitor by ID:", err);
      toast.error("Error fetching visitor details.");
    }
  };

  // Get QR Code by ID
  const handleViewQRCodeById = async (visitEntryId) => {
    try {
      const response = await getQrCodeByIdService(visitEntryId, token);
      if (response?.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch QR Code.");
      }
    } catch (err) {
      console.error("Error fetching QR Code:", err.message);
      throw err;
    }
  };

  // Get visitor list for resident
  const getVisitorListBySenderId = async (data) => {
    try {
      const response = await getVisitorListForResidentService(
        { ...data, senderId },
        token
      );
      return response;
    } catch (err) {
      console.error("Error fetching visitor list:", err);
      throw err;
    }
  };

  // Get visitor entry table
  const getNewVisitorEntryTable = async (data) => {
    try {
      const response = await getVisitorEntryTableService(
        { ...data, societyId },
        token
      );
      return response;
    } catch (err) {
      console.error("Error fetching visitor entry table:", err);
    }
  };

  return {
    fetchVisitorRelationship,
    createNewVisitorEntry,
    deleteVisitorById,
    getVisitorById,
    handleViewQRCodeById,
    getVisitorListBySenderId,
    getNewVisitorEntryTable,
  };
};

export default VisitHandler;


