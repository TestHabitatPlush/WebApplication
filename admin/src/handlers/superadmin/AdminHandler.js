import toast from "react-hot-toast";
import {
  createSocietyModeratorService,
  getAllSuperAdminItAndModeratorService,
} from "../../services/superadmin/adminService";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const AdminHandler = () => {
  const token = useSelector((state) => state.auth.token);

const createSocietyModeratorHandler = useCallback(
  async (data) => {
    try {
      const fd = new FormData();

      fd.append("salutation", data.salutation || "");
      fd.append("firstName", data.firstName || "");
      fd.append("lastName", data.lastName || "");
      fd.append("mobileNumber", data.mobileNumber || "");
      fd.append("alternateNumber", data.alternateNumber || "");
      fd.append("email", data.email || "");
      fd.append("countryCode", data.countryCode || "");
      fd.append("alternateCountryCode", data.alternateCountryCode || "");
      fd.append("roleId", data.roleId || "");
      fd.append("remark", data.remark || "");
      fd.append("societyId", data.societyId || "");

      fd.append("address", JSON.stringify(data.address));

      if (data.profilePhoto instanceof File) {
        fd.append("photo", data.profilePhoto);
      }

      const response = await createSocietyModeratorService(fd, token);

      // ❌ remove toast from handler
      return response;

    } catch (error) {

      // ❌ do NOT toast here
      // just forward error to UI layer
      throw error;
    }
  },
  [token]
);


  const getAllSuperAdminItAndModeratorHandler = useCallback(
    async (params = {}) => {
      try {
        const safeParams =
          params && typeof params === "object" ? params : {};

        const response =
          await getAllSuperAdminItAndModeratorService(token, safeParams);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching Super Admin, IT and Moderator list:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    [token]
  );

  return {
    createSocietyModeratorHandler,
    getAllSuperAdminItAndModeratorHandler,
  };
};

export default AdminHandler;
