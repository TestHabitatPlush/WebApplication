const { addMonths, addYears } = require("date-fns");
const determineStatus = (startDate, endDate) => {
  const now = new Date();
  if (!startDate || !endDate) return "pending";
  if (now < new Date(startDate)) return "pending";
  if (now > new Date(endDate)) return "expired";
  return "active";
};

const computeFinalPrice = (price, discountPercentage) => {
  const result = price - (price * discountPercentage / 100);
  return parseFloat(result.toFixed(2));
};

const computeEndDate = (startDate, billingCycle) => {
  const start = new Date(startDate);

  switch (billingCycle){
    case "monthly":
      return addMonths(start, 1);
      case "quarterly":
      return addMonths(start, 3);
    case "half-yearly":
      return addMonths(start, 6);
    case "yearly":
      return addMonths(start, 12);
    case "custom":
      return null;
    default:
      throw new Error("Invalid billing cycle");
  }
};

module.exports = {
  determineStatus,
  computeFinalPrice,
  computeEndDate,
};
