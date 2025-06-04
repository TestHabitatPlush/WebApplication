import { useState } from "react";  // Import useState hook
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createvisitorEntryService,
  getvisitorEntryService,
  getVisitorEntryTableService,
  getvisitorEntryByIdService,
  deleteVisitorService,
  getQrCodeByIdService,
} from "../services/visitorEntryService";
import { getVisitorRelationshipService } from "../services/visitorRelationshipService"; 

const VisitEntryHandler = () => {
  const [qrCodeData, setQrCodeData] = useState(null); // Define state for QR Code data

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const senderId = useSelector((state) => state.auth.user.userId);

  // Function to fetch visitor relationships
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

  // Function to create a new visitor entry
  const createNewVisitorEntry = async (data) => {
    console.log("create visitor entry");
    return await createvisitorEntryService(
      { ...data, societyId, senderId },
      token
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Visitor created successfully.");
      }
    });
  };

  // Function to get visitor entry table
  const getNewVisitorEntryTable = async (data) => {
    console.log("visitor list table", data);
    return await getVisitorEntryTableService({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to get types of visitors
  const getTypeofVisitor = async () => {
    console.log("get type of visitor ");

    return await getvisitorEntryService(token)
      .then((res) => {
        console.log("res visitor entry handler", res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to delete visitor by ID
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

  // Function to fetch visitor details by ID
  const getVisitorById = async (id) => {
    try {
      const response = await getvisitorEntryByIdService(id, token);
      return response.data;  
    } catch (err) {
      console.error("Error fetching visitor by ID:", err);
      toast.error("Error fetching visitor details.");
    }
  };

const handleViewQRCodeById = async (visitEntryId) => {
  try {
    const response = await getQrCodeByIdService(visitEntryId); // Call API
    if (response && response.status === 200) {
      console.log("Valid API response:", response.data);
      return response.data; // Return the expected data object
    } else {
      console.error("Unexpected response status:", response?.status);
      throw new Error("Failed to fetch QR Code. Invalid server response.");
    }
  } catch (err) {
    console.error("Error in handleViewQRCodeById:", err.message);
    throw err; // Propagate the error to the caller
  }
};


  // Function to download QR Code
  const handleDownloadQRCode = () => {
    if (qrCodeData && qrCodeData.qrCode) {
      const a = document.createElement("a");
      a.href = qrCodeData.qrCode;
      a.download = `Visitor_QR_${qrCodeData.id}.png`;
      a.click();
    }
  };

  // Function to fetch visitor entry by ID
  // const getVisiterEntry = async (visitEntryId) => {
  //   try {
  //     const response = await getVisiterEntryService(visitEntryId, token);
  //     return response.data;
  //   } catch (err) {
  //     console.error("Error fetching visitor entry:", err);
  //     toast.error("Error fetching visitor entry.");
  //   }
  // };
 
  
  return {
    getTypeofVisitor,
    fetchVisitorRelationship,
    createNewVisitorEntry,
    getNewVisitorEntryTable,
    deleteVisitorById,
    getVisitorById,
    handleViewQRCodeById,
    handleDownloadQRCode,
  };
};

export default VisitEntryHandler;