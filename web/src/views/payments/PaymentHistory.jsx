import SectionHeading from "@/components/shared/SectionHeading";

const PaymentHistory = () => {
  const data = [
    {
      billNo: "1001",
      date: "2024-07-01",
      due: "₹150",
      paid: "₹50",
    },
    {
      billNo: "1002",
      date: "2024-07-02",
      due: "₹200",
      paid: "₹150",
    },
    {
      billNo: "1003",
      date: "2024-07-03",
      due: "₹300",
      paid: "₹200",
    },
    {
      billNo: "1004",
      date: "2024-07-04",
      due: "₹400",
      paid: "₹350",
    },
  ];

  return (
    <div>
      <SectionHeading size="">Payment History</SectionHeading>
      <div className="">
        <div className="">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-black">
              <thead class="text-xs text-white uppercase bg-turquoise">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Bill No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Due
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Paid
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr key={index} class="odd:bg-white even:bg-blue-100">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.billNo}
                    </th>
                    <td class="px-6 py-4">{data.date}</td>
                    <td class="px-6 py-4">{data.due}</td>
                    <td class="px-6 py-4">{data.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentHistory;