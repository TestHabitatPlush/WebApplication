// import SectionHeading from "@/components/shared/SectionHeading";
// import { TabContent, Tabs } from "@/components/shared/Tabs";
// import React, { useState } from "react";

// const TableTabs = () => {
//   const tabData = [
//     { name: "Neighbours", label: "Neighbours" },
//     { name: "Management", label: "Management", extra: "Committee" },
//     { name: "Emergency", label: "Emergency", extra: "Contact" },
//   ];

//   const [activeTab, setActiveTab] = useState(tabData[0].name);

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <Tabs className="z-0 overflow-x-scroll text-gray-700 no-scrollbar">
//       {tabData.map((tab) => (
//         <TabContent
//           key={tab.name}
//           className="flex gap-1"
//           onClick={() => handleTabClick(tab.name)}
//           active={activeTab === tab.name}
//         >
//           {tab.label}
//           {tab.extra && <span className="hidden lg:block">{tab.extra}</span>}
//         </TabContent>
//       ))}
//     </Tabs>
//   );
// };

// const Tablecontent = () => {
//   return (
//     <div>
//       <div className="relative overflow-x-auto shadow-md">
//         <table className="w-full text-sm text-left text-black rtl:text-right">
//           <thead className="text-xs text-white uppercase bg-turquoise">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0"
//               >
//                 Unit No
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Name
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr class="odd:bg-white even:bg-blue-100">
//               <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
//                 001
//               </td>
//               <td class="px-6 py-4">Andrew</td>
//             </tr>
//             <tr class="odd:bg-white even:bg-blue-100">
//               <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
//                 002
//               </td>
//               <td class="px-6 py-4 ">Alfred</td>
//             </tr>
//             <tr class="odd:bg-white even:bg-blue-100">
//               <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
//                 003
//               </td>
//               <td class="px-6 py-4 ">Robert </td>
//             </tr>
//             <tr class="odd:bg-white even:bg-blue-100">
//               <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
//                 004
//               </td>
//               <td class="px-6 py-4 ">Houston</td>
//             </tr>
//             <tr class="odd:bg-white even:bg-blue-100">
//               <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
//                 005
//               </td>
//               <td class="px-6 py-4 ">Tom </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const CommunityDirectories = () => {
//   return (
//     <div className="space-y-5">
//       <SectionHeading>Community Directories</SectionHeading>
//       <div className="space-y-5">
//         <TableTabs />
//         <Tablecontent />
//       </div>
//     </div>
//   );
// };

// export default CommunityDirectories;




import SectionHeading from "@/components/shared/SectionHeading";
import { TabContent, Tabs } from "@/components/shared/Tabs";
import React, { useState } from "react";
import { FaEye} from "react-icons/fa6";

const tabData = [
  { name: "Neighbours", label: "Neighbours", color: "bg-blue-500", content: [
    { unit: "001", name: "Andrew",remarks:"xx"},
    { unit: "002", name: "Alfred" ,remarks:"yy"},
    { unit: "003", name: "Robert" ,remarks:"aasss"},
    { unit: "004", name: "Houston",remarks:"uuu" },
    
  ] },
  { name: "Management", label: "Management", extra: "Committee", color: "bg-green-500", content: [
    { unit: "M01", name: "John Doe" },
    { unit: "M02", name: "Jane Smith" },
    { unit: "M03", name: "Richard Roe" },
  ] },
  { name: "Service", label: "Management", extra: "Vendors", color: "bg-yellow-500", content: [
    { unit: "S01", name: "Plumbing Co." },
    { unit: "S02", name: "Electrician Inc." },
    { unit: "S03", name: "Cleaning Services" },
  ] },
  { name: "Emergency", label: "Emergency", extra: "Contact", color: "bg-red-500", content: [
    { unit: "E01", name: "Fire Department" },
    { unit: "E02", name: "Police Station" },
    { unit: "E03", name: "Hospital" },
  ] },
];


const TableTabs = ({ activeTab, setActiveTab }) => (
  <Tabs className="z-0 overflow-x-scroll text-gray-700 no-scrollbar">
    {tabData.map((tab) => (
      <TabContent
        key={tab.name}
        className="flex gap-1 cursor-pointer"
        onClick={() => setActiveTab(tab.name)}
        active={activeTab === tab.name}
      >
        {tab.label} {tab.extra && <span className="hidden lg:block">{tab.extra}</span>}
      </TabContent>
    ))}
  </Tabs>
);

const TableContent = ({ activeTab, onOpenModal }) => {
  const activeTabData = tabData.find((tab) => tab.name === activeTab);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-black">
        <thead className="text-xs text-white uppercase bg-turquoise">
          <tr>
            <th className="px-6 py-3 border-r">Unit No</th>
            <th className="px-6 py-3 border-r">Name</th>
            <th className="px-6 py-3 border-r">Remark</th>
            <th className="px-6 py-3 border-r">Action</th>
          </tr>
        </thead>
        <tbody>
          {activeTabData.content.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-6 py-4 border-r">{item.unit}</td>
              <td className="px-6 py-4 border-r">{item.name}</td>
              <td className="px-6 py-4 border-r">{item.remarks || "N/A"}</td>
              <td className="px-6 py-4 border-r">
                <FaEye className="text-blue-500 cursor-pointer" onClick={() => onOpenModal(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-xl font-semibold">Details</h2>
        <div className="space-y-3">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Service Type:</strong> {data.serviceType || "N/A"}</p>
          <p><strong>Remarks:</strong> {data.remarks || "N/A"}</p>
          <p><strong>Mobile No:</strong> {data.mobile || "N/A"}</p>
          <p><strong>Email ID:</strong> {data.email || "N/A"}</p>
        </div>
        <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const CommunityDirectories = () => {
  const [activeTab, setActiveTab] = useState(tabData[0].name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-5">
      <SectionHeading>Community Directories</SectionHeading>
      <TableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TableContent activeTab={activeTab} onOpenModal={handleOpenModal} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedData} />
    </div>
  );
};

export default CommunityDirectories;