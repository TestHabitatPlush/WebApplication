import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/shared/Input";
import Button from "../../../components/ui/Button";
import UrlPath from "../../../components/shared/UrlPath";
import PageHeading from "../../../components/shared/PageHeading";
import EmergencyContactHandler from "../../../handlers/EmergencyContactHandler";

const ContactDetails = () => {
  const { createEmergencyContactHandler } = EmergencyContactHandler();

  const paths = ["Emergency Contact", "Contact Details"];
  const Heading = ["Add Contact Information"];

  const [formData, setFormData] = useState({
    name: "",
    econtactNo1: "",
    econtactNo2: "",
    emergencyContactType: "hospital",
    address: "",
    state: "",
    city: "",
    pin: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmergencyContactHandler(formData);

    // Reset form
    setFormData({
      name: "",
      econtactNo1: "",
      econtactNo2: "",
      emergencyContactType: "hospital",
      address: "",
      state: "",
      city: "",
      pin: ""
    });
  };

  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
          <Input
            label="Primary Contact No"
            type="text"
            name="econtactNo1"
            value={formData.econtactNo1}
            onChange={handleInputChange}
            placeholder="Enter primary contact number"
          />
          <Input
            label="Alternate Contact No"
            type="text"
            name="econtactNo2"
            value={formData.econtactNo2}
            onChange={handleInputChange}
            placeholder="Enter alternate contact number"
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Emergency Contact Type</label>
            <select
              name="emergencyContactType"
              value={formData.emergencyContactType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="hospital">Hospital</option>
              <option value="police">Police</option>
              <option value="fire">Fire</option>
              <option value="ambulance">Ambulance</option>
              <option value="others">Others</option>
            </select>
          </div>
          <Input
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Input
              label="State"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter state"
            />
            <Input
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
            />
            <Input
              label="PIN Code"
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleInputChange}
              placeholder="Enter PIN code"
            />
          </div>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
