
// import { useSelector } from "react-redux";
// import {
//   createBuildingService,
//   getBuildingsBySocietyIdService,deleteBuildingService,updateBuidingService
// } from "../services/buildingService";
// import toast from "react-hot-toast";

// const BuildingHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);


//   const createBuildingHandler = async (buildingName) => {
//     if (!buildingName) {
//       toast.error("Building name is required !");
//       return;
//     }
//     return await createBuildingService({ buildingName, societyId }, token)
//       .then((res) => {
//         if (res.status === 201) {
//           toast.success("Building created");
//         }
//         return res;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getBuildingshandler = async () => {
//     return await getBuildingsBySocietyIdService(societyId, token) // Pass societyId
//       .then((res) => res)
//       .catch((err) => {
//         console.error("Error fetching buildings:", err);
//       });
//   };
//   const deleteBuildingHandler = async (buildingId) => {
//     try {
//       const res = await deleteBuildingService(buildingId, token);
//       return res;
//     } catch (err) {
//       console.error("Delete building failed", err);
//       throw err;
//     }
//   };

// const updateBuildingHandler = async (data) => {
//   if (!data.buildingId) {
//     console.error("Error: Missing buildingId in update data", data);
//     return;
//   }

//   try {
//     const res = await updateBuidingService(data, token);
//     if (res.status === 200 && res.data?.data) {
//       toast.success("Building updated successfully.");
//       return res.data.data; // ✅ updated building
//     } else {
//       toast.error("Unexpected response status while updating.");
//     }
//   } catch (err) {
//     console.error("Update failed:", err.response?.data || err.message);
//     toast.error("Failed to update building.");
//   }
// };


//   return { createBuildingHandler, getBuildingshandler ,deleteBuildingHandler,updateBuildingHandler};
// };

// export default BuildingHandler;

import { useSelector } from "react-redux";
import {
  createBuildingService,
  getBuildingsBySocietyIdService,
  deleteBuildingService,
  updateBuidingService, // keep name if service file uses this
} from "../services/buildingService";
import toast from "react-hot-toast";

const BuildingHandler = () => {
  // ✅ FIX 1: Safe selectors (optional chaining)
  const token = useSelector((state) => state.auth?.token);
  const societyId = useSelector(
    (state) => state.auth?.user?.Customer?.customerId
  );

  // ================= Create Building =================
  const createBuildingHandler = async (buildingName) => {
    if (!buildingName || !token || !societyId) return; // ✅ FIX 2: guard

    try {
      const res = await createBuildingService(
        { buildingName, societyId },
        token
      );

      if (res?.status === 201) {
        toast.success("Building created");
      }

      return res;
    } catch (err) {
      console.error(err);
    }
  };

  // ================= Get Buildings =================
  const getBuildingshandler = async () => {
    if (!token || !societyId) return; // ✅ FIX 2: guard

    try {
      return await getBuildingsBySocietyIdService(societyId, token);
    } catch (err) {
      console.error("Error fetching buildings:", err);
    }
  };

  // ================= Delete Building =================
  const deleteBuildingHandler = async (buildingId) => {
    if (!token) return; // ✅ FIX 2: guard

    try {
      return await deleteBuildingService(buildingId, token);
    } catch (err) {
      console.error("Delete building failed", err);
      throw err;
    }
  };

  // ================= Update Building =================
  const updateBuildingHandler = async (data) => {
    if (!token || !data?.buildingId) return; // ✅ FIX 2: guard

    try {
      const res = await updateBuidingService(data, token);

      if (res?.status === 200 && res.data?.data) {
        toast.success("Building updated successfully.");
        return res.data.data;
      }

      toast.error("Unexpected response status while updating.");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update building.");
    }
  };

  return {
    createBuildingHandler,
    getBuildingshandler,
    deleteBuildingHandler,
    updateBuildingHandler,
  };
};

export default BuildingHandler;
