import React, { useState } from "react";
import { useSelector } from "react-redux";
import UrlPath from "../../../components/shared/UrlPath";
import PageHeading from "../../../components/shared/PageHeading";
import Input from "../../../components/shared/Input";
import Button from "../../../components/ui/Button";

const PlanDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.userId);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  const [formData, setFormData] = useState({
    planName: "",
    duration: "",
    planDetails: "",
    price: "",
    discount: "",
    discountPercent: "",
    bookingFrom: "",
    bookingTo: "",
  });

  const paths = ["Subscription Plan", "Plan Details"];
  const Heading = ["Add Subscription Plan"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submitted: ", formData);

    // TODO: Replace with actual API handler
    // const result = await createPlanHandler({ societyId, userId, token, data: formData });

    const result = true; // mock response

    if (result) {
      setFormData({
        planName: "",
        duration: "",
        planDetails: "",
        price: "",
        discount: "",
        discountPercent: "",
        bookingFrom: "",
        bookingTo: "",
      });
    }
  };

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500">
        <UrlPath paths={paths} />
      </div>

      <PageHeading heading={Heading} />

      <div className="p-8 mt-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Plan Name</label>
            <select
              name="planName"
              value={formData.planName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Plan</option>
              <option value="Gold">Gold</option>
              <option value="Sliver">Sliver</option>
              <option value="Platinum">Platinum</option>
            </select>

            <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Duration</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Input
                label={<div>Booking From <span className="text-red-500">*</span></div>}
                type="date"
                size="lg"
                name="bookingFrom"
                value={formData.bookingFrom}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label={<div>Booking To <span className="text-red-500">*</span></div>}
                type="date"
                size="lg"
                name="bookingTo"
                value={formData.bookingTo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />

            <Input
              label="Discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="Enter discount amount"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Input
              label="Discount Percent"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleInputChange}
              placeholder="Enter discount %"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Submit Plan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanDetails;
