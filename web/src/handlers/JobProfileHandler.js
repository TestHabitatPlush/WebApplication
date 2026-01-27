"use client";

import toast from "react-hot-toast";
import { getJobProfilesBySocietyService } from "@/services/JobProfileService";

const JobProfileHandler = {
  getStaffBySociety: async ({ societyId, token }) => {
    try {
      if (!societyId) {
        toast.error("Society not selected");
        return [];
      }

      const response = await getJobProfilesBySocietyService(societyId, token);
      return response?.data?.data || [];
    } catch (error) {
      console.error("JobProfile fetch error:", error);
      toast.error(error?.response?.data?.message || "Failed to load staff");
      return [];
    }
  },
};

export default JobProfileHandler;
