// import { getAnnoucementsByBranchIdService } from "@/services/annoucementServices";
// import { useSelector } from "react-redux";

// const AnnoucementHandler = () => {
//   const user = useSelector((state) => state.auth.user);

//   const getAnnoucementsByBranchIdHandler = async (page = 1, limit = 10) => {
//     try {
//       const result = await getAnnoucementsByBranchIdService({
//         branchId: user.branch_id,
//         page,
//         limit,
//       });
//       if (result) {
//         return result;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return {
//     getAnnoucementsByBranchIdHandler,
//   };
// };

// export default AnnoucementHandler;

import { getAnnouncementsByBranchIdService } from "@/services/announcementService";
import { useSelector } from "react-redux";

//const useAnnouncementHandler = () => {
  

  // const getAnnouncementsByBranchIdHandler = async (page = 1, limit = 10) => {
  //   try {
  //     const result = await getAnnouncementsByBranchIdService({
  //       branchId: user?.branch_id, // Optional chaining to prevent undefined errors
  //       page,
  //       limit,
  //     });
  //     return result;
  //   } catch (err) {
  //     console.error("Error fetching announcements:", err);
  //     return null;
  //   }
  // };
  const AnnouncementHandler = () => {
    const user = useSelector((state) => state.auth.user);
    const getAnnouncementsByBranchIdHandler = async () => {
      try {
        const response = await fetch("/api/announcements"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        return { data };
      } catch (err) {
        console.error("Error fetching announcements:", err);
        return { data: { data: [] } }; // Fallback on error
      }
    };
  
    return {
      getAnnouncementsByBranchIdHandler,
    };
  };
  
  export default AnnouncementHandler;
  
//   return { getAnnouncementsByBranchIdHandler };
// };

// export default useAnnouncementHandler;
