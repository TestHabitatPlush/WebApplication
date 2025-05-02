// import axios from "axios";

// export const getAnnoucementsByBranchIdService = ({ branchId, page = 1 }) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/announcement/${branchId}`;
//   return axios.get(url, {
//     params: {
//       page: page, // Use `params` to send query parameters
//     },
//   });
// };


import axios from "axios";

export const getAnnouncementsByBranchIdService = ({ branchId, page = 1 }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/announcement/${branchId}`;
  return axios.get(url, {
    params: {
      page: page, // Use `params` to send query parameters
    },
  });
};
