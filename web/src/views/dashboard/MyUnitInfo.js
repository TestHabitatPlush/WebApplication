// import { FaCar, FaFolderOpen, FaUser, FaUserPlus } from "react-icons/fa6";
// import PaymentDueReminder from "./components/payment/PaymentDueReminder";
// import Document from "./components/document/Document";
// import CreatePost from "./components/post/CreatePost";
// import Visitor from "./components/visitor/Visitor";
// import Tenant from "./components/tenant/Tenant";
// import { useSelector } from "react-redux";
// import PaymentHistory from "../payments/PaymentHistory";

// const Info = () => {
//   return (
//     <div className="grid grid-cols-1 gap-2 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3 lg:gap-4">
//       <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%]">
//         <div className="flex items-center gap-4">
//           <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
//             <FaUser className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
//           </span>
//           <div className="">
//             <h3 className="text-sm font-semibold md:text-md lg:text-lg">
//               Number of Members
//             </h3>
//           </div>
//         </div>
//       </div>

//       <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] group">
//         <div className="flex items-center gap-4">
//           <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
//             <FaCar className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
//           </span>
//           <div className="">
//             <h3 className="text-sm font-semibold md:text-md lg:text-lg">
//               Number of Vehicles
//             </h3>
//           </div>
//         </div>
//       </div>

//       <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] ">
//         <div className="flex items-center gap-4">
//           <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
//             <FaUserPlus className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
//           </span>
//           <div className="">
//             <h3 className="text-sm font-semibold md:text-md lg:text-lg">
//               Add tenant
//             </h3>
//           </div>
//         </div>
//       </div>

//       <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] ">
//         <div className="flex items-center gap-4">
//           <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
//             <FaFolderOpen className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
//           </span>
//           <div className="">
//             <h3 className="text-sm font-semibold md:text-md lg:text-lg">
//               Documents
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UnitInfo = ({ user }) => {
//   return (
//     <div className="p-5 rounded-lg">
//       <h1 className="text-xl font-semibold text-center text-turquoise">
//         UNIT NUMBER : - {user?.unitDetail?.unit_no}
//       </h1>
//     </div>
//   );
// };

// const MyUnitInfo = () => {
//   const user = useSelector((state) => state.auth.user);
//   console.log(user);
//   return (
//     <section className="space-y-10">
//       <UnitInfo user={user} />
//       <Info />
//       <PaymentDueReminder
//         amountDue={4000}
//         dueDate={new Date().toLocaleDateString()}
//       />
//       <PaymentHistory />
//       <Document />
//       <Visitor />
//       <CreatePost />
//       <Tenant />
//     </section>
//   );
// };

// export default MyUnitInfo;

import { FaCar, FaUserTie , FaUsers , FaUserPlus } from "react-icons/fa6";
import PaymentDueReminder from "./components/payment/PaymentDueReminder";
import Document from "./components/document/Document";
import CreatePost from "./components/post/CreatePost";
import Visitor from "./components/visitor/Visitor";
import Tenant from "./components/tenant/Tenant";
import { useSelector } from "react-redux";
import PaymentHistory from "../payments/PaymentHistory";

const Info = () => {
  return (
   
    <div className="grid grid-cols-1 gap-2 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3 lg:gap-4">
    <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%]">
      <div className="flex items-center gap-4">
        <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
          <FaUsers className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
        </span>
        <div className="">
          <h3 className="text-sm font-semibold md:text-md lg:text-lg">
            Add Members
          </h3>
        </div>
      </div>
    </div>

    <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] group">
      <div className="flex items-center gap-4">
        <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
          <FaCar className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
        </span>
        <div className="">
          <h3 className="text-sm font-semibold md:text-md lg:text-lg">
          Add Vehicles
          </h3>
        </div>
      </div>
    </div>

    <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] ">
      <div className="flex items-center gap-4">
        <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
          <FaUserPlus className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
        </span>
        <div className="">
          <h3 className="text-sm font-semibold md:text-md lg:text-lg">
            Add Tenants
          </h3>
        </div>
      </div>
    </div>

    <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] ">
      <div className="flex items-center gap-4">
        <span className="p-2 border rounded-full md:p-3 lg:p-4 border-turquoise">
          <FaUserTie  className="text-lg md:text-2xl lg:text-3xl text-turquoise" />
        </span>
        <div className="">
          <h3 className="text-sm font-semibold md:text-md lg:text-lg">
            Add Staffs
          </h3>
        </div>
      </div>
    </div>
  </div>
  );
};

const UnitInfo = ({ user }) => {
  return (
    <div className="p-5 rounded-lg">
      <h1 className="text-xl font-semibold text-center text-turquoise">
        UNIT NAME : - {user?.unitDetail?.unit_no}
      </h1>
    </div>
  );
};

const MyUnitInfo = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <section className="space-y-10">
      <UnitInfo user={user} />
      <Info />
      {/* <PaymentDueReminder
        amountDue={4000}
        dueDate={new Date().toLocaleDateString()}
      /> */}
      {/* <PaymentHistory /> */}
      {/* <Document /> */}
      <Visitor />
      {/* <CreatePost /> */}
      {/* <Tenant /> */}
    </section>
  );
};

export default MyUnitInfo;

