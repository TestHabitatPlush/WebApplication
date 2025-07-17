import {
  createvisitorEntryService,
  getVisitorRelationshipService,
  getVisitorListForResidentService,
  getQrCodeByIdService,
  deleteVisitorService,
  getvisitorEntryByIdService,
  getVisitorEntryTableService,
} from "@/services/visitorService";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const VisitHandler = () => {
  const authState = useSelector((state) => state.auth);
  const societyState = useSelector((state) => state.society);
  const customerState = useSelector((state) => state.customer); // ⬅️ added

  // Log full redux state for debugging
  console.log("Auth State:", authState);
  console.log("Society State:", societyState);
  console.log("Customer State:", customerState); // ⬅️ added
 // Get sender and society IDs
  const senderId =
    authState?.user?._id || authState?.user?.userId || null;


  // const societyId = societyState?.society?.id
  // ||customerState?.customer?.customerId
  //  ||authState?.user?.Customer?.customerId 
  //  ||authState?.user?.customerId||
  //  null;

 


  const societyId =3;
  const token = authState.token;

  if (!senderId || !societyId) {
    console.warn("Missing senderId or societyId", { senderId, societyId });
  }

  // Fetch visitor relationships
  const fetchVisitorRelationship = async () => {
    try {
      const response = await getVisitorRelationshipService({ societyId }, token);
      if (response.status === 200 && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        console.warn("Invalid response or empty data.");
        return [];
      }
    } catch (err) {
      console.error("Error fetching visitor relationships:", err.message);
      return [];
    }
  };

  // Create new visitor entry
  const createNewVisitorEntry = async (data) => {
    try {
      const response = await createvisitorEntryService(
        { ...data, societyId, senderId },
        token
      );
      if (response.status === 201) {
        toast.success("Visitor created successfully.");
        return response.data;
      }
    } catch (error) {
      toast.error("Failed to create visitor.");
      throw error;
    }
  };

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
      const response = await getvisitorEntryByIdService(id, token);
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
      console.log("Fetching visitor list with senderId:", senderId);
      const response = await getVisitorListForResidentService(senderId, token, data);
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
