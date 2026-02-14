

import axios from "axios";

export const createSocietyModeratorService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/admin/create-society-user`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ do NOT set Content-Type for FormData
    },
  });
};

//adminRouter.put("/moderator/:userId", updateSocietyModerator);
//adminRouter.get("/moderator/:societyId", getSocietyModerator);

//get status 
export const getAllSuperAdminItAndModeratorService = (token, data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/admin/superadmin/moderator`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};


//userRouter.get("/superadmin/moderator",checkAuth,checkAdmin,userController.getAllSuper_admin_itAndModrerator);