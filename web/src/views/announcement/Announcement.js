// import { React, useEffect, useState } from "react"; // import Image from "next/image";
// // import Logo from "../../../assets/logo/cocacola2.jpg";
// // import { FaRegCommentDots } from "react-icons/fa";
// import AnnoucementHandler from "@/handlers/AnnoucementHandler";
// import { useSelector } from "react-redux";

// const Announcement = () => {
//   const { getAnnoucementsByBranchIdHandler } = AnnoucementHandler();
//   const user = useSelector((state) => state.auth.user);

//   // console.log(getAnnoucementsByBranchIdHandler);
//   const [announcements, setAnnouncements] = useState([]);
//   const [expanded, setExpanded] = useState(false);
//   console.log("Announcement", announcements);
//   useEffect(() => {
//     if (user) {
//       getAnnoucementsByBranchIdHandler()
//         .then((res) => {
//           setAnnouncements(res.data.data);
//           console.log(res);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const truncatedText = `There are many miracles (leelas) done by Lord Venkateshwara at Tirumala. In the year 1979, there was scarcity of water and no rain...`;

//   const fullText = `There are many miracles (leelas) done by Lord Venkateshwara at Tirumala. In the year 1979, there was scarcity of water and no rain. The water in Gogarbham dam (dam at Tirumala) was almost empty. At that time, EO of TTD, PVRK Prasad talked with the engineers about the situation. They said that water in Gogarbham dam will be sufficient only for a week. Without water, the pilgrims at Tirumala will face many issues. PVRK Prasad then talked with Sri Uppuluri Ganapati Shastri. Sri Ganapathi Shastri smiled and said the golden words, "The problem comes because the solution is there!!". Shastri suggested to do Varuna Japam. But the challenge is to find people who are willing to do Varuna Japam in this age of Kali Yuga. There is a solution for every problem in our life in our scriptures. Prasad believed in it and searched for people who are willing to do Varuna Japam. Many people went back because of some reasons. Some people came forward to perform the Varuna Japam. After finalizing the auspicious days of doing Varuna Japam, some people are selected.`;

//   return (
//     <div>
//       <div className="font-semibold font-sans text-lg mb-3">Announcement</div>
//       <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
//         {announcements.map((item, index) => (
//           <div key={index} className="w-full flex flex-col space-y-3 p-[19px] bg-white-900 shadow-sm shadow-gray-200 border border-gray-300 rounded-lg">
//             {/* <div> */}
//             <div className="font-base text-[25px]">{item.notice_title}</div>
//             <div>{item.notice_description}</div>
//             {/* {expanded ? fullText : truncatedText} */}
//             {/* <button
//    onClick={toggleExpand}
//    className="text-blue-500 hover:underline ml-2"
//  >
//    {expanded ? "Show Less" : "More"}
//  </button> */}
//             {/* </div> */}

//             {/* <div className="text-sm font-sans font-normal text-gray-700 text-right">
//             5hr
//           </div> */}
//           </div>
//         ))}
//         ;<div>Adds dksa sdakm sdmkas</div>
//       </div>
//     </div>
//   );
// };

// export default Announcement;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAnnouncementHandler from "@/handlers/AnnouncementHandler";

const Announcement = () => {
  const { getAnnouncementsByBranchIdHandler } = useAnnouncementHandler();
  const user = useSelector((state) => state.auth.user);

  const [announcements, setAnnouncements] = useState([]);
  const [expanded, setExpanded] = useState(false);

  console.log("Announcement", announcements);

  useEffect(() => {
    if (user) {
      getAnnouncementsByBranchIdHandler()
        .then((res) => {
          if (res?.data?.data) {
            setAnnouncements(res.data.data);
          }
        })
        .catch((err) => console.error("Error fetching announcements:", err));
    }
  }, [user, getAnnouncementsByBranchIdHandler]); // Ensure handler is included in dependency array

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="font-semibold font-sans text-lg mb-3">Announcement</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col space-y-3 p-5 bg-white shadow-sm shadow-gray-200 border border-gray-300 rounded-lg"
          >
            <div className="text-xl font-semibold">{item.notice_title}</div>
            <div>
              {expanded ? item.notice_description : item.notice_description.slice(0, 100) + "..."}
            </div>
            <button onClick={toggleExpand} className="text-blue-500 hover:underline self-start">
              {expanded ? "Show Less" : "More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
