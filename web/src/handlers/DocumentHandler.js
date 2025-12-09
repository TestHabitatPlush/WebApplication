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
// } from "@/services/documentService";

// const DocumentHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const userId = useSelector((state) => state.auth.user?.userId);
//   // const societyId = useSelector((state) => state.auth.user?.Customer?.customerId); 
// const userId = 3;
// //   // //useSelector((state) => state.auth.user?.userId);
// // // const societyId =2;
// //   // //  useSelector((state) => state.auth.user?.Customer?.customerId); 
// // // const token = useSelector((state) => state.auth.token);
// //  const userId = useSelector((state) => state.auth.user?.id);
// // const societyId = useSelector(
// //   (state) => state.auth.user?.societyId || state.auth.user?.Customer?.customerId
// // );

// const user = useSelector((state) => state.auth.user);


// //const userId = user?.Customer?.customerId || user?.id;

// const societyId = user?.societyId || user?.Customer?.customerId;


//   const buildFormData = (data) => {
//     const formData = new FormData();
//     if (data.documentName) formData.append("documentName", data.documentName);
//     if (data.document) formData.append("document", data.document);
//     if (data.picture) formData.append("picture", data.picture);
//     return formData;
//   };

//   const createDocumentBySocietyHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createDocumentBySocietyService(formData, societyId, userId, token);

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
// const getDocumentBySocietyHandler = async () => {
//   try {
//     const res = await getDocumentBySocietyService(societyId, userId, token);
//     return res.data.documents;
//   } catch (err) {
//     console.error("Error fetching society documents:", err);
//     return [];
//   }
// };



//   const createDocumentByUserHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createDocumentByUserService(formData, userId, token);

//       if (res.status === 201) {
//         toast.success("Document created for user.");
//       }

//       return res;
//     } catch (err) {
//       toast.error("Failed to create user document.");
//       console.error(err);
//     }
//   };

//   const getDocumentByUserHandler = async () => {
//     try {
//       const res = await getDocumentByUserService(userId, token);
//       console.log("hjwvwchkgvdkchg", res);

//       if (res.status === 200) {
//         return res.data.documents;
//       }
//     } catch (err) {
//       toast.error("Failed to fetch user documents.");
//       console.error(err);
//     }
//   };

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
// } from "@/services/documentService";

// const DocumentHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const userId = useSelector((state) => state.auth.user?.userId);
//    const societyId = useSelector((state) => state.auth.user?.Customer?.customerId); 
// //const societyId =2;
//   const buildFormData = (data) => {
//     const formData = new FormData();
//     if (data.documentName) formData.append("documentName", data.documentName);
//     if (data.document) formData.append("document", data.document);
//     if (data.picture) formData.append("picture", data.picture);
//     return formData;
//   };

//   const createDocumentBySocietyHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createDocumentBySocietyService(formData, societyId, userId, token);

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

//       if (res.status === 200) {
//         return res.data;
//       }
//     } catch (err) {
//       toast.error("Failed to fetch society documents.");
//       console.error(err);
//     }
//   };

//   const createDocumentByUserHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createDocumentByUserService(formData, userId, token);

//       if (res.status === 201) {
//         toast.success("Document created for user.");
//       }

//       return res;
//     } catch (err) {
//       toast.error("Failed to create user document.");
//       console.error(err);
//     }
//   };

//   const getDocumentByUserHandler = async () => {
//     try {
//       const res = await getDocumentByUserService(userId, token);
//       console.log("hjwvwchkgvdkchg", res);

//       if (res.status === 200) {
//         return res.data.documents;
//       }
//     } catch (err) {
//       toast.error("Failed to fetch user documents.");
//       console.error(err);
//     }
//   };

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
} from "@/services/documentService";

const DocumentHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);
  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  );

  const buildFormData = (data) => {
    const formData = new FormData();
    if (data.documentName) formData.append("documentName", data.documentName);
    if (data.document) formData.append("document", data.document);
    if (data.picture) formData.append("picture", data.picture);
    return formData;
  };

  /* ---------------- Society Documents ---------------- */

  const createDocumentBySocietyHandler = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createDocumentBySocietyService(
        formData,
        societyId,
        userId,
        token
      );
      if (res.status === 201) toast.success("Document created for society.");
      return res;
    } catch (err) {
      toast.error("Failed to create society document.");
      console.error(err);
    }
  };

  const getDocumentBySocietyHandler = async () => {
    try {
      const res = await getDocumentBySocietyService(
        societyId,
        userId,
        token
      );
      if (res.status === 200) return res.data.documents;
    } catch (err) {
      toast.error("Failed to fetch society documents.");
      console.error(err);
    }
  };

  /* ---------------- User Documents ---------------- */

  const createDocumentByUserHandler = async (data) => {
    try {
      const formData = buildFormData(data);
      const res = await createDocumentByUserService(formData, userId, token);
      if (res.status === 201) toast.success("Document created for user.");
      return res;
    } catch (err) {
      toast.error("Failed to create user document.");
      console.error(err);
    }
  };

  const getDocumentByUserHandler = async () => {
    try {
      if (!userId) {
        toast.error("User not authenticated");
        return;
      }

      const res = await getDocumentByUserService(userId, token);
      if (res.status === 200) return res.data.documents;
    } catch (err) {
      toast.error("Failed to fetch user documents.");
      console.error(err);
    }
  };

  /* ---------------- Common ---------------- */

  const updateDocumentHandler = async (
    data,
    documentId,
    isSociety = true
  ) => {
    try {
      const formData = buildFormData(data);
      const res = isSociety
        ? await updateDocumentBySocietyService(formData, documentId, token)
        : await updateDocumentByUserService(formData, documentId, token);

      if (res.status === 200)
        toast.success("Document updated successfully.");
      return res;
    } catch (err) {
      toast.error("Failed to update document.");
      console.error(err);
    }
  };

  const deleteDocumentHandler = async (documentId) => {
    try {
      const res = await deleteDocumentService(documentId, token);
      if (res.status === 200)
        toast.success("Document permanently deleted.");
      return res;
    } catch (err) {
      toast.error("Failed to delete document.");
      console.error(err);
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
