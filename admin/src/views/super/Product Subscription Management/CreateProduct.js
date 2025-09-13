// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import UrlPath from "../../../components/shared/UrlPath";
// import PageHeading from "../../../components/shared/PageHeading";
// import Input from "../../../components/shared/Input";
// import Button from "../../../components/ui/Button";
// import SubscriptionHandler from "../../../handlers/superadmin/SubscriptionHandler";

// const CreateProduct = () => {
//   const token = useSelector((state) => state.auth.token);

//   const [formData, setFormData] = useState({
//     planName: "",
//     billingCycle: "",
//     price: "",
//     discountPercentage: "",
//     startDate: "",
//     endDate: "", // used only if billingCycle === "custom"
//   });

//   const paths = ["Subscription Plan", "Plan Details"];
//   const Heading = ["Add Subscription Plan"];
//   const { createPlanHandler } = SubscriptionHandler();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       // 🔑 clear endDate if billing cycle != custom
//       if (name === "billingCycle" && value !== "custom") {
//         return {
//           ...prev,
//           [name]: value,
//           endDate: "",
//         };
//       }
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Submitted: ", formData);

//     // ✅ send only what backend expects
//     const payload = {
//       planName: formData.planName,
//       billingCycle: formData.billingCycle,
//       price: formData.price,
//       discountPercentage: formData.discountPercentage,
//       startDate: formData.startDate,
//     };

//     if (formData.billingCycle === "custom") {
//       payload.endDate = formData.endDate;
//     }

//     const result = await createPlanHandler({ token, data: payload });

//     if (result) {
//       setFormData({
//         planName: "",
//         billingCycle: "",
//         price: "",
//         discountPercentage: "",
//         startDate: "",
//         endDate: "",
//       });
//     }
//   };

//   return (
//     <div className="px-5 py-6">
//       <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500">
//         <UrlPath paths={paths} />
//       </div>

//       <PageHeading heading={Heading} />

//       <div className="p-8 mt-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Plan Name
//             </label>
//             <select
//               name="planName"
//               value={formData.planName}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Plan</option>
//               <option value="Gold">Gold</option>
//               <option value="Silver">Silver</option>
//               <option value="Platinum">Platinum</option>
//             </select>

//             <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
//               Billing Cycle
//             </label>
//             <select
//               name="billingCycle"
//               value={formData.billingCycle}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
//               label={
//                 <div>
//                   Start Date <span className="text-red-500">*</span>
//                 </div>
//               }
//               type="date"
//               size="lg"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//             />

//             {formData.billingCycle === "custom" && (
//               <Input
//                 label={
//                   <div>
//                     End Date <span className="text-red-500">*</span>
//                   </div>
//                 }
//                 type="date"
//                 size="lg"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleInputChange}
//               />
//             )}
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <Input
//               label="Price"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               placeholder="Enter price"
//             />
//             <Input
//               label="Discount Percentage"
//               name="discountPercentage"
//               value={formData.discountPercentage}
//               onChange={handleInputChange}
//               placeholder="Enter discount %"
//             />
//           </div>

//           <div className="flex justify-center pt-4">
//             <Button type="submit" variant="primary" className="w-full sm:w-auto">
//               Submit Plan
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UrlPath from "../../../components/shared/UrlPath";
import PageHeading from "../../../components/shared/PageHeading";
import Input from "../../../components/shared/Input";
import Button from "../../../components/ui/Button";

const modules = [
  "Building Management",
  "User Management",
  "Notice And Announcement",
  "Discussion Forum",
  "Visitor Management",
  "Gate Management",
  "Facility Management",
  "Vendor Management",
];

const CreateProduct = () => {
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    packageType: "Standard",
    packageName: "",
    searchTerm: "",
    selectedModules: [],
  });

  const paths = ["Product Subscription Management", "Create Product"];
  const Heading = ["Add New Package"];

  // Standard options
  const standardPackages = ["Gold", "Silver", "Platinum"];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "packageType" ? { packageName: "" } : {}), // reset packageName when type changes
    }));
  };

  // Handle module selection
  const handleModuleToggle = (module) => {
    setFormData((prev) => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(module)
        ? prev.selectedModules.filter((m) => m !== module)
        : [...prev.selectedModules, module],
    }));
  };

  // Filter modules by search
  const filteredModules = modules.filter((m) =>
    m.toLowerCase().includes(formData.searchTerm.toLowerCase())
  );

  // Split into two columns
  const mid = Math.ceil(filteredModules.length / 2);
  const leftModules = filteredModules.slice(0, mid);
  const rightModules = filteredModules.slice(mid);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      packageType: formData.packageType,
      packageName: formData.packageName,
      modules: formData.selectedModules,
    };

    console.log("Payload to submit:", payload);
    alert("Package created successfully!");
    // 👉 Call your handler here with token + payload
  };

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500">
        <UrlPath paths={paths} />
      </div>

      <PageHeading heading={Heading} />

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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                placeholder="Enter Package Name"
              />
            )}
          </div>

          {/* Search Module */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Module Names
            </label>
            <input
              type="text"
              name="searchTerm"
              value={formData.searchTerm}
              onChange={handleChange}
              placeholder="Search by Module Name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Module Selection Table (2-column layout) */}
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 border">Select</th>
                    <th className="px-2 py-1 border">Module Name</th>
                  </tr>
                </thead>
                <tbody>
                  {leftModules.map((m, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1 text-center border">
                        <input
                          type="checkbox"
                          checked={formData.selectedModules.includes(m)}
                          onChange={() => handleModuleToggle(m)}
                        />
                      </td>
                      <td className="px-2 py-1 border">{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 border">Select</th>
                    <th className="px-2 py-1 border">Module Name</th>
                  </tr>
                </thead>
                <tbody>
                  {rightModules.map((m, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1 text-center border">
                        <input
                          type="checkbox"
                          checked={formData.selectedModules.includes(m)}
                          onChange={() => handleModuleToggle(m)}
                        />
                      </td>
                      <td className="px-2 py-1 border">{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
