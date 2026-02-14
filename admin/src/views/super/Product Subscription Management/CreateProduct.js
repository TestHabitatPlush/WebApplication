// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import UrlPath from "../../../components/shared/UrlPath";
// import PageHeading from "../../../components/shared/PageHeading";
// import Input from "../../../components/shared/Input";
// import Button from "../../../components/ui/Button";

// import SubscriptionHandler from "../../../handlers/superadmin/SubscriptionHandler";

// const { getAllModulesHandler, createPlanHandler } = SubscriptionHandler();

// const CreateProduct = () => {
//   const token = useSelector((state) => state.auth.token);

//   const [formData, setFormData] = useState({
//     packageType: "Standard",
//     planName: "",
//     billingCycle: "",
//     startDate: "",
//     endDate: "",
//     price: "",
//     discountPercentage: "",
//     searchTerm: "",
//     selectedModules: [], // will store IDs
//   });

//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const paths = ["Product Subscription Management", "Create Product"];
//   const heading = ["Add New Package"];

//   const standardPackages = ["Gold", "Silver", "Platinum"];

//   const modulesMapping = {
//     document: "Document Management",
//     emergency_contact: "Emergency Contact",
//     gate: "Gate Management",
//     notice: "Notice and Announcement",
//     users: "User Management",
//     vehicle: "Vehicle Management",
//     visitor_new_visitentry: "Visitor Management",
//   };

//   // Fetch modules
//   useEffect(() => {
//     const fetchModules = async () => {
//       setLoading(true);
//       const data = await getAllModulesHandler(token);
//       if (data) {
//         setModules(data);
//       }
//       setLoading(false);
//     };
//     if (token) fetchModules();
//   }, [token]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "packageType" ? { planName: "" } : {}),
//     }));
//   };

//   // Toggle module selection by ID
//   const handleModuleToggle = (moduleId) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedModules: prev.selectedModules.includes(moduleId)
//         ? prev.selectedModules.filter((m) => m !== moduleId)
//         : [...prev.selectedModules, moduleId],
//     }));
//   };

//   const filteredModules = modules.filter((m) => {
//     const rawName = m.moduleName || "";
//     const displayName = modulesMapping[rawName] || rawName;
//     return displayName.toLowerCase().includes(formData.searchTerm.toLowerCase());
//   });

//   const mid = Math.ceil(filteredModules.length / 2);
//   const leftModules = filteredModules.slice(0, mid);
//   const rightModules = filteredModules.slice(mid);

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       planName: formData.planName,
//       billingCycle: formData.billingCycle,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       price: formData.price,
//       discountPercentage: formData.discountPercentage,
//       moduleIds: formData.selectedModules, // ✅ send IDs
//     };

//     try {
//       const result = await createPlanHandler({ token, data: payload });

//       if (result) {
//         alert("Package created successfully!");
//         setFormData({
//           packageType: "Standard",
//           planName: "",
//           billingCycle: "",
//           startDate: "",
//           endDate: "",
//           price: "",
//           discountPercentage: "",
//           searchTerm: "",
//           selectedModules: [],
//         });
//       }
//     } catch (err) {
//       console.error("Error creating package:", err);
//       alert("Failed to create package. Please try again.");
//     }
//   };

//   return (
//     <div className="px-5 py-6">
//       <UrlPath paths={paths} />
//       <PageHeading heading={heading} />

//       <div className="p-8 mt-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Package Type + Plan Name */}
//          <div className="grid grid-cols-1 gap-6">
//   <div>
//     <label className="block mb-1 text-sm font-medium text-gray-700">
//       Package Type
//     </label>
//     <select
//       name="packageType"
//       value={formData.packageType}
//       onChange={handleChange}
//       className="w-full px-3 py-2 border rounded-lg"
//     >
//       <option value="Standard">Standard</option>
//       <option value="Custom">Custom</option>
//     </select>
//   </div>

//   <div>
//     <label className="block mb-1 text-sm font-medium text-gray-700">
//       Package Name
//     </label>
//     {formData.packageType === "Standard" ? (
//       <select
//         name="planName"
//         value={formData.planName}
//         onChange={handleChange}
//         className="w-full px-3 py-2 border rounded-lg"
//         required
//       >
//         <option value="">Select Package</option>
//         {standardPackages.map((pkg, i) => (
//           <option key={i} value={pkg}>
//             {pkg}
//           </option>
//         ))}
//       </select>
//     ) : (
//       <Input
//         name="planName"
//         value={formData.planName}
//         onChange={handleChange}
//         placeholder="Enter Package Name"
//         required
//       />
//     )}
//   </div>
// </div>


//           {/* <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Billing Cycle
//             </label>
//             <select
//               name="billingCycle"
//               value={formData.billingCycle}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             >
//               <option value="">Select Billing Cycle</option>
//               <option value="monthly">Monthly</option>
//               <option value="quarterly">Quarterly</option>
//               <option value="half-yearly">Half-Yearly</option>
//               <option value="yearly">Yearly</option>
//               <option value="custom">Custom</option>
//             </select>
//           </div>

         
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <Input
//               label="Start Date"
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//             />
//             <Input
//               label="End Date"
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//             />
//           </div>

         
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <Input
//               label="Price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="Enter price"
//             />
//             <Input
//               label="Discount Percentage"
//               name="discountPercentage"
//               value={formData.discountPercentage}
//               onChange={handleChange}
//               placeholder="Enter discount %"
//             />
//           </div> */}

//           {/* Search Module */}
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Module Names
//             </label>
//             <input
//               type="text"
//               name="searchTerm"
//               value={formData.searchTerm}
//               onChange={handleChange}
//               placeholder="Search by Module Name..."
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Module Selection */}
//           {loading ? (
//             <p>Loading modules...</p>
//           ) : (
//             <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
//               {[leftModules, rightModules].map((column, idx) => (
//                 <div key={idx}>
//                   <table className="w-full border-collapse">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="px-2 py-1 border">Select</th>
//                         <th className="px-2 py-1 border">Module Name</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {column.map((m) => {
//                         const rawName = m.moduleName;
//                         const displayName = modulesMapping[rawName] || rawName;
//                         return (
//                           <tr key={m.moduleId}>
//                             <td className="px-2 py-1 text-center border">
//                               <input
//                                 type="checkbox"
//                                 checked={formData.selectedModules.includes(m.moduleId)}
//                                 onChange={() => handleModuleToggle(m.moduleId)}
//                               />
//                             </td>
//                             <td className="px-2 py-1 border">{displayName}</td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Submit */}
//           <div className="flex justify-center pt-4">
//             <Button type="submit" variant="primary" className="w-full sm:w-auto">
//               Submit
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


// export default CreateProduct;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UrlPath from "../../../components/shared/UrlPath";
import PageHeading from "../../../components/shared/PageHeading";
import Input from "../../../components/shared/Input";
import Button from "../../../components/ui/Button";
import SubscriptionHandler from "../../../handlers/superadmin/SubscriptionHandler";

const { getAllModulesHandler, createPlanHandler } = SubscriptionHandler();

const CreateProduct = () => {
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    packageType: "Standard",
    planName: "",
    searchTerm: "",
    price: "",
    selectedModules: [],
  });

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  const paths = ["Product Package Subscription", "Define Package"];
  const heading = ["Define a New Package by selecting multiple Modules"];

  const standardPackages = ["Gold", "Silver", "Platinum"];

  const modulesMapping = {
    building: "Building Management",
    users: "User Management",
    notice: "Notice and Announcement",
    discussion: "Discussion Forum",
    visitor: "Visitor Management",
    gate: "Gate Management",
    facility: "Facility Management",
    vendor: "Vendor Management",
  };

  // Fetch modules
  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      const data = await getAllModulesHandler(token);
      if (data) setModules(data);
      setLoading(false);
    };
    if (token) fetchModules();
  }, [token]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "packageType" ? { planName: "" } : {}),
    }));
  };

  // Toggle module selection
  const handleModuleToggle = (moduleId) => {
    setFormData((prev) => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(moduleId)
        ? prev.selectedModules.filter((id) => id !== moduleId)
        : [...prev.selectedModules, moduleId],
    }));
  };

  // Filter modules by search
  const filteredModules = modules.filter((m) => {
    const rawName = m.moduleName || "";
    const displayName = modulesMapping[rawName] || rawName;
    return displayName
      .toLowerCase()
      .includes(formData.searchTerm.toLowerCase());
  });

  const mid = Math.ceil(filteredModules.length / 2);
  const leftModules = filteredModules.slice(0, mid);
  const rightModules = filteredModules.slice(mid);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      planName: formData.planName,
      packageType: formData.packageType,
      price: formData.price,
      moduleIds: formData.selectedModules,
    };

    try {
      const result = await createPlanHandler({ token, data: payload });
      if (result) {
        alert("Package created successfully!");
        setFormData({
          packageType: "Standard",
          planName: "",
          searchTerm: "",
          price: "",
          selectedModules: [],
        });
      }
    } catch (error) {
      console.error("Error creating package:", error);
      alert("Failed to create package. Please try again.");
    }
  };

  return (
    <div className="px-5 py-6">
      <UrlPath paths={paths} />
      <PageHeading heading={heading} />

      <div className="p-8 mt-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Package Type
            </label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Standard">Standard</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {/* Package Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Package Name
            </label>
            {formData.packageType === "Standard" ? (
              <select
                name="planName"
                value={formData.planName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Package</option>
                {standardPackages.map((pkg, i) => (
                  <option key={i} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                name="planName"
                value={formData.planName}
                onChange={handleChange}
                placeholder="Enter Package Name"
                required
              />
            )}
          </div>

          {/* Search Module */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Search Modules
            </label>
            <input
              type="text"
              name="searchTerm"
              value={formData.searchTerm}
              onChange={handleChange}
              placeholder="Search by Module Name..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Module Selection */}
          {loading ? (
            <p>Loading modules...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              {[leftModules, rightModules].map((column, idx) => (
                <div key={idx}>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-1 border">Select</th>
                        <th className="px-2 py-1 border">Module Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {column.map((m) => {
                        const rawName = m.moduleName;
                        const displayName = modulesMapping[rawName] || rawName;
                        return (
                          <tr key={m.moduleId}>
                            <td className="px-2 py-1 text-center border">
                              <input
                                type="checkbox"
                                checked={formData.selectedModules.includes(
                                  m.moduleId
                                )}
                                onChange={() => handleModuleToggle(m.moduleId)}
                              />
                            </td>
                            <td className="px-2 py-1 border">{displayName}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {/* Package Cost */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Package Cost (₹)
            </label>
            <Input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter package cost"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
