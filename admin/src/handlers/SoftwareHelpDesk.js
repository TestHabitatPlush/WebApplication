import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  createRefTicketStatusService,
  getRefTicketStatusService,
  createTicketPurposeService,
  getTicketPurposeService,
  updateTicketPurposeService,
  getTicketPurposeDropdownService,
  createTicketService,
  getTicketTableService,
  updateTicketStatusAndRemarksService,
  getAssignableUsersService,
} from "../services/softwarehelpdeskService";

const SoftwareHelpDeskHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  );
  const userId = useSelector((state) => state.auth.user?.userId);

  const createRefTicketStatus = async (data) => {
    try {
      const response = await createRefTicketStatusService(data, token);
      if (response.status === 201) {
        toast.success("Ticket status created successfully.");
      }
      return response.data;
    } catch (err) {
      console.error("Error creating ticket status:", err);
      toast.error(err.response?.data?.message || "Failed to create status.");
    }
  };

  const getRefTicketStatus = async () => {
    try {
      const response = await getRefTicketStatusService(token);
      return response.data?.data || [];
    } catch (err) {
      console.error("Error fetching ticket statuses:", err);
      toast.error("Unable to fetch ticket statuses.");
      return [];
    }
  };

  const createTicketPurpose = async (data) => {
    try {
      const response = await createTicketPurposeService(
        societyId,
        userId,
        data,
        token
      );
      if (response.status === 201) {
        toast.success("Ticket purpose created.");
      }
      return response.data;
    } catch (err) {
      console.error("Error creating ticket purpose:", err);
      toast.error("Failed to create ticket purpose.");
    }
  };

  const getTicketPurposeList = async (params = {}) => {
    try {
      const response = await getTicketPurposeService(societyId, token, params);
      return response.data;
    } catch (err) {
      console.error("Error fetching ticket purpose list:", err);
      toast.error("Failed to fetch ticket purpose list.");
    }
  };

  const updateTicketPurpose = async (ticket_purpose_Id, data) => {
    try {
      const response = await updateTicketPurposeService(
        ticket_purpose_Id,
        data,
        token
      );
      toast.success("Ticket purpose updated.");
      return response.data;
    } catch (err) {
      console.error("Error updating ticket purpose:", err);
      toast.error("Failed to update ticket purpose.");
    }
  };

  const getTicketDropdown = async () => {
    try {
      const response = await getTicketPurposeDropdownService(societyId, token);
      // console.log("getTicketDropdown",response)
      return response.data?.data || [];
    } catch (err) {
      console.error("Error fetching ticket dropdown:", err);
      toast.error("Failed to fetch dropdown values.");
      return [];
    }
  };

  const createTicket = async (formData) => {
    try {
      const result = await createTicketService(
        userId,
        societyId,
        formData,
        token
      );
      console.log("createTicket result", result);
      toast.success("Ticket created successfully");
      return result;
    } catch (err) {
      toast.error("Error creating ticket");
      console.error(err);
    }
  };

  const getTicketTable = async (params = {}) => {
    try {
      const res = await getTicketTableService(userId, societyId, token, params);
      // console.log("getTicketTable res", res);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      toast.error("Failed to fetch ticket table.");
    }
  };

  const updateTicketStatusAndRemarks = async (ticket_Id, data) => {
    try {
      const res = await updateTicketStatusAndRemarksService(
        ticket_Id,
        data,
        token
      );
      if (res.status === 200) {
        toast.success("Ticket updated.");
        return res.data;
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
      toast.error("Failed to update ticket.");
    }
  };

  const getAssignableUsers = async (societyId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await getAssignableUsersService(societyId, token);
      return response?.data?.data || []; 
    } catch (error) {
      console.error("Error fetching assignable users:", error);
      return [];
    }
  };


  return {
    createRefTicketStatus,
    getRefTicketStatus,
    createTicketPurpose,
    getTicketPurposeList,
    updateTicketPurpose,
    getTicketDropdown,
    createTicket,
    getTicketTable,
    updateTicketStatusAndRemarks,
    getAssignableUsers,
  };
};

export default SoftwareHelpDeskHandler;
