import {
  createVisitorEntryService,
  getVisitorRelationshipService,getVisitorEntriesBySenderService,
  getVisitorByIdService,
  getQRCodeService,
  deleteVisitorService,
} from "@/services/visitorService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const VisitHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const senderId = 5; 
  //useSelector((state) => state.auth.user?.userId);
  const society = useSelector((state) => state.society.selectedSocietyId);

  const societyId = 2;
  //society?.id; // ✅ FIXED

  // FETCH VISITOR TYPES
  const fetchVisitorRelationship = async () => {
    try {
      if (!societyId) throw new Error("societyId missing");

      const response = await getVisitorRelationshipService(
        societyId,
        token
      );

      return response.data?.data || [];
    } catch (error) {
      console.error("Fetch visitor type error:", error);
      throw error;
    }
  };

  // CREATE VISITOR
  const createNewVisitorEntry = async (data) => {
    try {
      const payload = {
        ...data,
        societyId,
        senderId,
      };

      const response = await createVisitorEntryService(payload, token);
      toast.success("Visitor created successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create visitor");
      throw error;
    }
  };

//   // GET VISITOR LIST BY SENDER ID
  const getVisitorListBySenderId = async () => {
    if (!senderId) throw new Error("Invalid senderId");
    try {
      const response = await getVisitorEntriesBySenderService(senderId);
      // backend returns { success, message, data: [...] }
      return response?.data || [];
    } catch (err) {
      console.error("Error fetching visitor list:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch visitor list");
      return [];
    }
  };


  // Fetch visitor by ID
  const getVisitorById = async (visit_entry_Id) => {
    try {
      const data = await getVisitorByIdService(visit_entry_Id);
      return data;
    } catch (err) {
      console.error("Error fetching visitor:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch visitor");
      return null;
    }
  };

  // VIEW QR CODE BY ID
  const handleViewQRCodeById = async (visit_entry_Id) => {
    try {
      const data = await getQRCodeService(visit_entry_Id);
      return data?.data?.qrCode || null;
    } catch (err) {
      console.error("Error fetching QR Code:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch QR Code");
      return null;
    }
  };
  // Delete visitor by ID
  const deleteVisitorById = async (visit_entry_Id) => {
    try {
      const data = await deleteVisitorService(visit_entry_Id);
      toast.success(data?.message || "Visitor deleted successfully");
      return data;
    } catch (err) {
      console.error("Error deleting visitor:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete visitor");
      throw err;
    }
  };

  return {
    fetchVisitorRelationship,
    createNewVisitorEntry,
    getVisitorListBySenderId,
    getVisitorById,
    handleViewQRCodeById,
    deleteVisitorById,
  };
};

export default VisitHandler;
