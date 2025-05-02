// import React from "react";
// import UrlPath from "../../../../components/shared/UrlPath";
// import PageHeading from "../../../../components/shared/PageHeading";
// import Input from "../../../../components/shared/Input";
// import Button from "../../../../components/ui/Button";

// const AddVechicleDetails = () => {
//   const paths = ["User", "Add Vechicle"];
//   const Heading = ["Add Vechicle"];
//   return (
//     <div className="px-5">
//       <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
//         <UrlPath paths={paths} />
//       </div>
//       <PageHeading heading={Heading} />

//       <AddVechicle />
//     </div>
//   );
// };

// export default AddVechicleDetails;

// const AddVechicle = () => {
//   return (
//     <div className="p-10 my-5 bg-gray-100 border rounded-lg">
//       <div className="font-sans text-xl font-semibold text-lime">
//         Add Vechicle Details
//       </div>
//       <div className="grid items-center grid-cols-3 gap-3 py-4">
//         <Input
//           label={<div>Vechicle Number: </div>}
//           type="text"
//           placeholder={"Enter Vechicle Number"}
//           size={"lg"}
//         />
//         <Input
//           label={<div>Vechicle Type :</div>}
//           type="text"
//           placeholder={"Enter Vechicle Type"}
//           size={"lg"}
//         />
//         <Input
//           label={<div>Add Vechicle Model Type :</div>}
//           type="text"
//           placeholder={"Enter Parking Slot Allocation"}
//           size={"lg"}
//         />
//         <Input
//           label={<div>Add Engine Type :</div>}
//           type="text"
//           placeholder={"Enter Parking Slot Allocation"}
//           size={"lg"}
//         />
//         <Input
//           label={<div>Add Tchechis No :</div>}
//           type="text"
//           placeholder={"Enter Tchechis No"}
//           size={"lg"}
//         />
//         <div className="flex flex-row pt-[10px] items-center gap-4">
//           <div>FASTag Enable:</div>
//           <div className="flex flex-row items-center gap-3">
//             <div className="flex flex-row items-center gap-3 px-4 py-1 bg-white border rounded-lg">
//               <input type="radio" name="drone" checked className="text-lg" />

//               <label className="text-lg">Yes</label>
//             </div>
//             <div className="flex flex-row items-center gap-3 px-4 py-1 bg-white border rounded-lg ">
//               <input type="radio" name="drone" checked />
//               <label>No</label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center mt-5">
//         <Button className="max-w-sm" type="submit" size="lg">
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import ParkingHandler from "../../../../handlers/ParkingHandler";


const AddVehicleDetails = ({ societyId, token }) => {
  const paths = ["User", "Add Vehicle"];
  const Heading = ["Add Vehicle"];

  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <AddVehicleForm societyId={societyId} token={token} />
    </div>
  );
};

export default AddVehicleDetails;

const AddVehicleForm = ({ societyId, token }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    vehicleModelType: "",
    engineType: "",
    chassisNo: "",
    fastagEnabled: "Yes",
    ownerName: "",
    ownerContact: "",
    fastagNumber:""

  

   
  


  });
  const { createNewVehicleHandler} = ParkingHandler();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      fastagEnabled: formData.fastagEnabled === "Yes" ? true : false,
    };

    await createNewVehicleHandler(societyId, token, data);
  };

  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="font-sans text-xl font-semibold text-lime">
        Add Vehicle Details
      </div>
      <form onSubmit={handleSubmit} className="grid items-center grid-cols-3 gap-3 py-4">
        <Input
          label="Vehicle Number:"
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          placeholder="Enter Vehicle Number"
          size="lg"
        />
        <Input
          label="Vehicle Type:"
          type="text"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          placeholder="Enter Vehicle Type"
          size="lg"
        />
        <Input
          label="Vehicle Model Type:"
          type="text"
          name="vehicleModelType"
          value={formData.vehicleModelType}
          onChange={handleChange}
          placeholder="Enter Vehicle Model Type"
          size="lg"
        />
        <Input
          label="Engine Type:"
          type="text"
          name="engineType"
          value={formData.engineType}
          onChange={handleChange}
          placeholder="Enter Engine Type"
          size="lg"
        />
        <Input
          label="Chassis No:"
          type="text"
          name="chassisNo"
          value={formData.chassisNo}
          onChange={handleChange}
          placeholder="Enter Chassis No"
          size="lg"
        />
        <Input
          label="Owner Name:"
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Enter Owner Name"
          size="lg"
        />
        <Input
          label="Owner Contact:"
          type="text"
          name="ownerContact"
          value={formData.ownerContact}
          onChange={handleChange}
          placeholder="Enter Owner Contact"
          size="lg"
        />
        <Input
          label="Fastag no:"
          type="text"
          name="fastagNumber"
          value={formData.fastagNumber}
          onChange={handleChange}
          placeholder="Enter Owner Contact"
          size="lg"
        />
        
        <div className="flex flex-row pt-[10px] items-center gap-4 col-span-3">
          <div>FASTag Enabled:</div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-3 px-4 py-1 bg-white border rounded-lg">
              <input
                type="radio"
                name="fastagEnabled"
                value="Yes"
                checked={formData.fastagEnabled === "Yes"}
                onChange={handleChange}
              />
              <label>Yes</label>
            </div>
            <div className="flex flex-row items-center gap-3 px-4 py-1 bg-white border rounded-lg">
              <input
                type="radio"
                name="fastagEnabled"
                value="No"
                checked={formData.fastagEnabled === "No"}
                onChange={handleChange}
              />
              <label>No</label>
            </div>
          </div>
        </div>
        <div className="flex justify-center col-span-3 mt-5">
          <Button className="max-w-sm" type="submit" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
