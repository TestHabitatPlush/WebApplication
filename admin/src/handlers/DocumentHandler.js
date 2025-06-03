import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createDocumentBySocietyService,
  createDocumentByUserService,
  getDocumentBySocietyService,
  getDocumentByUserService,
  updateDocumentBySocietyService,
  updateDocumentByUserService,
  deleteDocumentService,
  getDocumentByIdService
} from "../services/documentService";

const DocumentHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
  console.log("societyId hdevk", useSelector((state) => state.auth.user?.Customer?.customerId));

  const userId = useSelector((state) => state.auth.user?.userId);



  const buildFormData = (data) => {
    const formData = new FormData();
    if (data.documentName) formData.append("documentName", data.documentName);
    if (data.userGroupId) formData.append("userGroupId", data.userGroupId);
    if (data.document) formData.append("document", data.document);
    return formData;
  };

  // ===== SOCIETY =====
  const createDocumentBySocietyHandler = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createDocumentBySocietyService(formData, societyId, token);

      if (res.status === 201) {
        toast.success("Document created for society.");
      }

      return res;
    } catch (err) {
      toast.error("Failed to create society document.");
      console.error(err);
    }
  };

  const getDocumentBySocietyHandler = async () => {
    try {
      const res = await getDocumentBySocietyService(societyId, token);

      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      toast.error("Failed to fetch society documents.");
      console.error(err);
    }
  };

  // ===== USER =====
  const createDocumentByUserHandler = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createDocumentByUserService(formData, userId, token);

      if (res.status === 201) {
        toast.success("Document created for user.");
      }

      return res;
    } catch (err) {
      toast.error("Failed to create user document.");
      console.error(err);
    }
  };

  const getDocumentByUserHandler = async () => {
    try {
      const res = await getDocumentByUserService(userId, token);

      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      toast.error("Failed to fetch user documents.");
      console.error(err);
    }
  };

  // ===== COMMON =====
  const updateDocumentHandler = async (data, documentId, isSociety = true) => {
    try {
      const formData = buildFormData(data);

      const res = isSociety
        ? await updateDocumentBySocietyService(formData, documentId, token)
        : await updateDocumentByUserService(formData, documentId, token);

      if (res.status === 200) {
        toast.success("Document updated successfully.");
      }

      return res;
    } catch (err) {
      toast.error("Failed to update document.");
      console.error(err);
    }
  };

  const deleteDocumentHandler = async (documentId) => {
    try {
      const res = await deleteDocumentService(documentId, token);

      if (res.status === 200) {
        toast.success("Document Permanently Deleted.");
      }

      return res;
    } catch (err) {
      toast.error("Failed to delete document.");
      console.error(err);
    }
  };

  const getDocumentByIdHandler = async (id) => {
      try {
        const response = await getDocumentByIdService(id, token);
        console.log(response);
        return response.data;  
      } catch (err) {
        console.error("Error Document by ID:", err);
        toast.error("Error Document details.");
      }
    };

  return {
    createDocumentBySocietyHandler,
    getDocumentBySocietyHandler,
    createDocumentByUserHandler,
    getDocumentByUserHandler,
    updateDocumentHandler,
    deleteDocumentHandler,
    getDocumentByIdHandler
  };
};

export default DocumentHandler;