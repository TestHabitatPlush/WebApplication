import { useEffect } from "react";
import CommunityDirectories from "./components/directories/CommunityDirectories";
import PostPreview from "./components/post/PostPreview";
import Cookies from "js-cookie";
import { AnnoucementPreview } from "../announcement";
import { FaCar, FaUserTie , FaUsers , FaUserPlus } from "react-icons/fa6";
const Dashboard = () => {
  useEffect(() => {
    console.log(Cookies.get("auth"));
    console.log(document.cookie);

  }, []);
  
  
  const Info = () => {
    return (
      <div className="p-5 rounded-lg">
        <h1 className="text-xl font-semibold text-center  text-turquoise">
       
        </h1>
  
        <div className="grid grid-cols-2 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:gap-5 lg:gap-6">
          <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-lg font-semibold text-white rounded-full bg-turquoise">
              10 
            </div>
            <span className="p-3 border rounded-full border-turquoise">
              <FaUsers className="text-3xl text-turquoise" />
            </span>
            <h3 className="mt-2 font-semibold text-center text-md">Add Members</h3>
          </div>
  
         
          <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-lg font-semibold text-white rounded-full bg-turquoise">
              5 
            </div>
            <span className="p-3 border rounded-full border-turquoise">
              <FaCar className="text-3xl text-turquoise" />
            </span>
            <h3 className="mt-2 font-semibold text-center text-md">Add Vehicles</h3>
          </div>
  
          
          <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-lg font-semibold text-white rounded-full bg-turquoise">
              7 
            </div>
            <span className="p-3 border rounded-full border-turquoise">
              <FaUserPlus className="text-3xl text-turquoise" />
            </span>
            <h3 className="mt-2 font-semibold text-center text-md">Add Tenants</h3>
          </div>
  
       
          <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-5 rounded-xl cursor-pointer hover:scale-[102%] flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-lg font-semibold text-white rounded-full bg-turquoise">
              3
            </div>
            <span className="p-3 border rounded-full border-turquoise">
              <FaUserTie className="text-3xl text-turquoise" />
            </span>
            <h3 className="mt-2 font-semibold text-center text-md">Add Staffs</h3>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-10">
      {/* <PaymentDueReminder
        amountDue={4000}
        dueDate={new Date().toLocaleDateString()}
      /> */}
       <section className="space-y-10">
          <Info />
       </section>
      <AnnoucementPreview/>
      <CommunityDirectories />
      <PostPreview/>
    </div>
  );
};

export default Dashboard;
