import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";

// Helper to format the date to "YYYY-MM-DD"
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const UpdateSubscriptionDetailsModal = ({
  isOpen,
  onClose,
  formData,
  onEditHandler,
  modules = [],
}) => {
  const [subscriptionForm, setSubscriptionForm] = useState({
    planName: "",
    billingCycle: "",
    startDate: "",
    endDate: "",
    price: "",
    discountPercentage: "",
    selectedModules: [],
  });

  // module mapping (friendly display names)
  const modulesMapping = {
    document: "Document Management",
    emergency_contact: "Emergency Contact",
    gate: "Gate Management",
    notice: "Notice and Announcement",
    users: "User Management",
    vehicle: "Vehicle Management",
    visitor_new_visitentry: "Visitor Management",
  };

  useEffect(() => {
    if (formData) {
      setSubscriptionForm({
        ...formData,
        selectedModules: formData.selectedModules
          ? formData.selectedModules
          : formData.modules?.map((m) => m.moduleId) || [],
      });
    }
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSubscriptionForm((prev) => {
      if (name === "billingCycle" && value !== "custom") {
        return { ...prev, billingCycle: value, endDate: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleModuleToggle = (moduleId) => {
    setSubscriptionForm((prev) => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(moduleId)
        ? prev.selectedModules.filter((m) => m !== moduleId)
        : [...prev.selectedModules, moduleId],
    }));
  };

  const handleSubmit = () => {
    onEditHandler(subscriptionForm);
    onClose();
  };

  // split modules into 2 columns
  const mid = Math.ceil(modules.length / 2);
  const leftModules = modules.slice(0, mid);
  const rightModules = modules.slice(mid);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-8 my-5 bg-gray-100 border rounded-lg">
        <div className="flex flex-col w-full gap-5">
          {/* Plan Name */}
          <label className="text-sm font-medium text-gray-700">Plan Name</label>
          <select
            name="planName"
            value={subscriptionForm.planName}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Plan</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>

          {/* Billing Cycle */}
          <label className="mt-4 text-sm font-medium text-gray-700">
            Billing Cycle
          </label>
          <select
            name="billingCycle"
            value={subscriptionForm.billingCycle}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Billing Cycle</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={formatDate(subscriptionForm.startDate)}
              onChange={handleInput}
            />
            {subscriptionForm.billingCycle === "custom" && (
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formatDate(subscriptionForm.endDate)}
                onChange={handleInput}
              />
            )}
          </div>

          {/* Price + Discount */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Price"
              name="price"
              type="number"
              value={subscriptionForm.price}
              onChange={handleInput}
              placeholder="Enter price"
            />
            <Input
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={subscriptionForm.discountPercentage}
              onChange={handleInput}
              placeholder="Enter discount %"
            />
          </div>

          {/* Module Selection */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Module Names
            </label>
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
                                checked={subscriptionForm.selectedModules.includes(
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
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <Button type="button" onClick={handleSubmit} size="lg">
              Update Plan
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateSubscriptionDetailsModal;
