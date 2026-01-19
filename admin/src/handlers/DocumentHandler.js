// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import {
//   createDocumentBySocietyService,
//   createDocumentByUserService,
//   getDocumentBySocietyService,
//   getDocumentByUserService,
//   updateDocumentBySocietyService,
//   updateDocumentByUserService,
//   deleteDocumentService,
// } from ".//../services/documentService";

// const DocumentHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const societyId = useSelector(
//     (state) => state.auth.user?.Customer?.customerId
//   );
//   const userId = useSelector((state) => state.auth.user?.userId);

//   const buildFormData = (data) => {
//     const formData = new FormData();
//     if (data.documentName) formData.append("documentName", data.documentName);
//     if (data.visibilityOption)
//       formData.append("visibility", data.visibilityOption);

//     if (data.societyId) formData.append("societyId", data.societyId);
//     if (data.document) formData.append("document", data.document);
//     // if (data.picture) formData.append("picture", data.picture);
//     return formData;
//   };

//   // ===== SOCIETY =====
//   const createDocumentBySocietyHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createDocumentBySocietyService(
//         formData,
//         societyId,
//         userId,
//         token
//       );

//       if (res.status === 201) {
//         toast.success("Document created for society.");
//       }

//       return res;
//     } catch (err) {
//       toast.error("Failed to create society document.");
//       console.error(err);
//     }
//   };

//   const getDocumentBySocietyHandler = async () => {
//     try {
//       const res = await getDocumentBySocietyService(societyId, userId, token);
//       if (res.status === 200) return res;
//     } catch (err) {
//       toast.error("Failed to fetch society documents.");
//       console.error(err);
//     }
//   };
//   // const getDocumentBySocietyHandler = async (societyId, userId, params = { page: 0, pageSize: 1000 }) => {
//   //   try {
//   //     const res = await getDocumentBySocietyService(societyId, userId, token, params);
//   //     if (res.status === 200) return res;
//   //   } catch (err) {
//   //     toast.error("Failed to fetch society documents.");
//   //     console.error(err);
//   //   }
//   // };

//   // ===== USER =====
//   const createDocumentByUserHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createDocumentByUserService(formData, userId, token);
//       return res;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const getDocumentByUserHandler = async () => {
//     try {
//       const res = await getDocumentByUserService(userId, token);
//       if (res.status === 200) return res.data;
//     } catch (err) {
//       toast.error("Failed to fetch user documents.");
//       console.error(err);
//     }
//   };

//   // ===== COMMON =====
//   const updateDocumentHandler = async (data, documentId, isSociety = true) => {
//     try {
//       const formData = buildFormData(data);
//       const res = isSociety
//         ? await updateDocumentBySocietyService(formData, documentId, token)
//         : await updateDocumentByUserService(formData, documentId, token);

//       if (res.status === 200) {
//         toast.success("Document updated successfully.");
//       }

//       return res;
//     } catch (err) {
//       toast.error("Failed to update document.");
//       console.error(err);
//     }
//   };

//   const deleteDocumentHandler = async (documentId) => {
//     try {
//       const res = await deleteDocumentService(documentId, token);
//       if (res.status === 200) {
//         toast.success("Document Permanently Deleted.");
//       }
//       return res;
//     } catch (err) {
//       toast.error("Failed to delete document.");
//       console.error(err);
//     }
//   };

//   return {
//     createDocumentBySocietyHandler,
//     getDocumentBySocietyHandler,
//     createDocumentByUserHandler,
//     getDocumentByUserHandler,
//     updateDocumentHandler,
//     deleteDocumentHandler,
//   };
// };

// export default DocumentHandler;



import { useSelector } from "react-redux";
import {
  createDocumentBySocietyService,
  createDocumentByUserService,
  getDocumentBySocietyService,
  getDocumentByUserService,
  updateDocumentBySocietyService,
  updateDocumentByUserService,
  deleteDocumentService,
} from ".//../services/documentService";

const DocumentHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  );
  const userId = useSelector((state) => state.auth.user?.userId);

  const buildFormData = (data) => {
    const formData = new FormData();
    if (data.documentName) formData.append("documentName", data.documentName);
    if (data.visibilityOption)
      formData.append("visibility", data.visibilityOption);
    if (data.societyId) formData.append("societyId", data.societyId);
    if (data.document) formData.append("document", data.document);
    return formData;
  };

  // ===== SOCIETY =====
  const createDocumentBySocietyHandler = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createDocumentBySocietyService(
        formData,
        societyId,
        userId,
        token
      );
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getDocumentBySocietyHandler = async () => {
    try {
      const res = await getDocumentBySocietyService(societyId, userId, token);
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ===== USER =====
  const createDocumentByUserHandler = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createDocumentByUserService(formData, userId, token);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getDocumentByUserHandler = async () => {
    try {
      const res = await getDocumentByUserService(userId, token);
      if (res.status === 200) return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ===== COMMON =====
  const updateDocumentHandler = async (data, documentId, isSociety = true) => {
    try {
      const formData = buildFormData(data);
      return isSociety
        ? await updateDocumentBySocietyService(formData, documentId, token)
        : await updateDocumentByUserService(formData, documentId, token);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteDocumentHandler = async (documentId) => {
    try {
      return await deleteDocumentService(documentId, token);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    createDocumentBySocietyHandler,
    getDocumentBySocietyHandler,
    createDocumentByUserHandler,
    getDocumentByUserHandler,
    updateDocumentHandler,
    deleteDocumentHandler,
  };
};

export default DocumentHandler;
