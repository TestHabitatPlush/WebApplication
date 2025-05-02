const PaymentDueReminder = ({ amountDue = 100, dueDate = new Date() }) => {
  return (
    <div className="relative mt-10 p-4 rounded-xl bg-red-100">
      <div className="w-full flex gap-1 lg:gap-2">
        <div className="w-full">
          <div className="flex flex-col gap-1 md:flex-row justify-center lg:justify-between items-start text-xl font-medium text-gray-600">
            <span>
              Payment is Due for{" "}
              <strong className="text-red-500">₹{amountDue}</strong>
            </span>
            <span className="text-gray-800 text-sm">
              Due Date: <strong>7/28/2024</strong>
            </span>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-start text-xs">
            <div className="">
              <p className="text-gray-700 mt-2">
                Please ensure your payment is made by the due date to avoid any
                late fees.
              </p>
            </div>
            <div className="">
              <button className="text-sm px-5 py-2 rounded-lg bg-green-500 hover:bg-opacity-90 transition-all text-white">
                Make Payment Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentDueReminder;
