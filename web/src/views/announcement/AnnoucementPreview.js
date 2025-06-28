// import SectionHeading from "@/components/shared/SectionHeading";
// import ViewAllButton from "@/components/shared/ViewAllButton";
// import AnnoucementHandler from "@/handlers/AnnoucementHandler";
// import React, { useEffect, useState } from "react";

// const Card = ({ data }) => {
//   return (
//     <div className="max-w-[280px] w-[280px] h-[200px] p-4 rounded-3xl bg-gradient-to-r from-indigo-100 to-blue-200 cursor-pointer border-2 border-gray-200 hover:border-indigo-200 transition-all duration-500">
//       <div className="flex flex-col gap-1 overflow-hidden text-gray-900">
//         <div className="w-full">
//           <h5 className="font-semibold text-md ">{data.notice_title}</h5>
//         </div>
//         <div className="w-full">
//           <p className="max-w-full text-sm font-normal text-gray-600 line-clamp-4">
//             {data.notice_description}
//           </p>
//         </div>
//         <div className="flex items-center justify-end gap-3 mt-1 text-xs">
//           {/* <MdOutlineAttachment className="text-xl"/> */}
//           <p className="text-gray-600">{data.time}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnnoucementPreview = () => {
//   const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eos
//   cum corporis ipsum fugiat eaque temporibus repellat quae eum dolor
//   pariatur natus ad a, quasi quis dicta corrupti possimus reiciendis?`;

//   const data = [
//     {
//       heading: "First heading",
//       text: text,
//       time: "2 hours ago",
//     },
//     {
//       heading: "Second heading",
//       text: text,
//       time: "2 hours ago",
//     },
//     {
//       heading: "Third heading",
//       text: text,
//       time: "2 hours ago",
//     },
//     {
//       heading: "Third heading",
//       text: text,
//       time: "2 hours ago",
//     },
//     {
//       heading: "Third heading",
//       text: text,
//       time: "2 hours ago",
//     },
//   ];

//   const { getAnnoucementsByBranchIdHandler } = AnnoucementHandler();
//   const [annuncements, setAnnoucements] = useState([]);
//   // console.log(announcements);

//   useEffect(() => {
//     getAnnoucementsByBranchIdHandler()
//       .then((res) => {
//         setAnnoucements(res.data.data);
//         console.log(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="w-full space-y-5">
//       <SectionHeading size="md" className={"flex gap-3 items-center"}>
//         Announcements
//       </SectionHeading>
//       <div className="">
//         <div className="flex gap-5 h-[200px] max-w-full overflow-auto no-scrollbar">
//           {annuncements.map((el, index) => (
//             <Card key={index} data={el} />
//           ))}
//         </div>
//       </div>
//       <ViewAllButton />
//     </div>
//   );
// };

// export default AnnoucementPreview;
// import SectionHeading from "@/components/shared/SectionHeading";
// import ViewAllButton from "@/components/shared/ViewAllButton";
// import AnnouncementHandler from "@/handlers/AnnouncementHandler";
// import React, { useEffect, useState, useMemo } from "react";

// const Card = ({ data }) => {
//   return (
//     <div className="max-w-[280px] w-[280px] h-[200px] p-4 rounded-3xl bg-gradient-to-r from-indigo-100 to-blue-200 cursor-pointer border-2 border-gray-200 hover:border-indigo-200 transition-all duration-500">
//       <div className="flex flex-col gap-1 overflow-hidden text-gray-900">
//         <div className="w-full">
//           <h5 className="font-semibold text-md">{data.notice_title}</h5>
//         </div>
//         <div className="w-full">
//           <p className="max-w-full text-sm font-normal text-gray-600 line-clamp-4">
//             {data.notice_description}
//           </p>
//         </div>
//         <div className="flex items-center justify-end gap-3 mt-1 text-xs">
//           <p className="text-gray-600">{data.time}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnnouncementPreview = () => {
//   // Mock Data for fallback
//   const mockData = [
//     {
//       notice_title: "First Announcement",
//       notice_description: "This is the first announcement description.",
//       time: "2 hours ago",
//     },
//     {
//       notice_title: "Second Announcement",
//       notice_description: "This is the second announcement description.",
//       time: "2 hours ago",
//     },
//     {
//       notice_title: "Third Announcement",
//       notice_description: "This is the third announcement description.",
//       time: "2 hours ago",
//     },
//   ];

//   // Memoize the handler function to prevent unnecessary re-renders
//   const { getAnnouncementsByBranchIdHandler } = useMemo(
//     () => AnnouncementHandler(),
//     []
//   );

//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     getAnnouncementsByBranchIdHandler()
//       .then((res) => {
//         console.log("API Response:", res); // Debugging
//         setAnnouncements(res.data?.data || mockData); // Use API data or fallback to mock data
//       })
//       .catch((err) => {
//         console.error("Error fetching announcements:", err);
//         setAnnouncements(mockData); // Fallback on error
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Runs only once when the component mounts

//   return (
//     <div className="w-full space-y-5">
//       <SectionHeading size="md" className={"flex gap-3 items-center"}>
//         Announcements
//       </SectionHeading>
//       <div>
//         <div className="flex gap-5 h-[200px] max-w-full overflow-auto no-scrollbar">
//           {announcements.map((el, index) => (
//             <Card key={index} data={el} />
//           ))}
//         </div>
//       </div>
//       <ViewAllButton />
//     </div>
//   );
// };

// export default AnnouncementPreview;


import SectionHeading from "@/components/shared/SectionHeading";
import ViewAllButton from "@/components/shared/ViewAllButton";
import AnnouncementHandler from "@/handlers/AnnouncementHandler";
import React, { useEffect, useState } from "react";

const Card = ({ data }) => {
  return (
    <div className="max-w-[280px] w-[280px] h-[200px] p-4 rounded-3xl bg-gradient-to-r from-indigo-100 to-blue-200 cursor-pointer border-2 border-gray-200 hover:border-indigo-200 transition-all duration-500">
      <div className="flex flex-col gap-1 overflow-hidden text-gray-900">
        <div className="w-full">
          <h5 className="font-semibold text-md">{data.notice_title}</h5>
        </div>
        <div className="w-full">
          <p className="max-w-full text-sm font-normal text-gray-600 line-clamp-4">
            {data.notice_description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 mt-1 text-xs">
          <p className="text-gray-600">{data.time}</p>
        </div>
      </div>
    </div>
  );
};

const AnnouncementPreview = () => {
  // ✅ Mock Data for fallback
  const mockData = [
    {
      notice_title: "First Announcement",
      notice_description: "This is the first announcement description.",
      time: "2 hours ago",
    },
    {
      notice_title: "Second Announcement",
      notice_description: "This is the second announcement description.",
      time: "3 hours ago",
    },
    {
      notice_title: "Third Announcement",
      notice_description: "This is the third announcement description.",
      time: "5 hours ago",
    },
  ];

  // ✅ Call AnnouncementHandler directly without useMemo
  const { getAnnouncementsByBranchIdHandler } = AnnouncementHandler();

  // ✅ State to hold announcements
  const [announcements, setAnnouncements] = useState([]);

  // ✅ Fetch announcements on component load
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAnnouncementsByBranchIdHandler();
        console.log("API Response:", res);
        setAnnouncements(res?.data?.data || mockData); // Fallback to mock data if no API data
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setAnnouncements(mockData); // Fallback on error
      }
    };

    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-5">
      <SectionHeading size="md" className={"flex gap-3 items-center"}>
        Announcements
      </SectionHeading>
      <div>
        <div className="flex gap-5 h-[200px] max-w-full overflow-auto no-scrollbar">
          {announcements.map((el, index) => (
            <Card key={index} data={el} />
          ))}
        </div>
      </div>
      <ViewAllButton />
    </div>
  );
};

export default AnnouncementPreview;

