// PricingSection.jsx
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const plans = [
  { title: "Silver", price: 39, description: "Small businesses" },
  { title: "Gold", price: 39, description: "Small businesses" },
  { title: "Platinum", price: 39, description: "Small businesses" },
];

function PricingSection() {
  return (
    <div className="mx-auto my-10 text-center max-w-7xl">
      <h2 className="mb-10 text-3xl font-bold">Pricing</h2>
      <div className="flex justify-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-lg w-72 h-[400px] shadow-lg flex flex-col items-center"
          >
            <div className="flex flex-col items-center justify-center w-full h-32 text-white bg-black">
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="mt-2 text-xl">{plan.description}</p>
            </div>
            <p className="mt-6 text-3xl font-bold">${plan.price}</p>
            <p className="mb-6 text-gray-500">Monthly</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  {" "}
                  <FaRegCircleCheck size={20} />
                </span>
                <span>Society Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  {" "}
                  <FaRegCircleCheck size={20} />
                </span>
                <span>Society Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  {" "}
                  <FaRegCircleCheck size={20} />
                </span>
                <span>Society Management</span>
              </li>
            </ul>
            <button className="px-6 py-2 text-white bg-blue-500">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
