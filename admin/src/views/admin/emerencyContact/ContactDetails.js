import React, { useState } from "react";
import { useSelector } from "react-redux";
import UrlPath from "../../../components/shared/UrlPath";
import PageHeading from "../../../components/shared/PageHeading";
import Input from "../../../components/shared/Input";
import Button from "../../../components/ui/Button";
import EmergencyContactHandler from "../../../handlers/EmergencyContactHandler";

const ContactDetails = () => {
  const { createEmergencyContactBySocietyAdminHandler } = EmergencyContactHandler();

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.userId);
  const societyId = useSelector((state) => state.auth.user?.societyId);

  const paths = ["Emergency Contact", "Contact Details"];
  const Heading = ["Add Contact Information"];

  const [formData, setFormData] = useState({
    name: "",
    econtactNo1: "",
    econtactNo2: "",
    emergencyContactType: "hospital",
    customContactType: "", // used only when "others" selected
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

    const preparedData = {
      ...formData,
      emergencyContactType:
        formData.emergencyContactType === "others"
          ? formData.customContactType
          : formData.emergencyContactType,
    };

    delete preparedData.customContactType; // remove temporary field before submission

    const result = await createEmergencyContactBySocietyAdminHandler({
      societyId,
      userId,
      token,
      data: preparedData,
    });

    if (result) {
      setFormData({
        name: "",
        econtactNo1: "",
        econtactNo2: "",
        emergencyContactType: "hospital",
        customContactType: "",
        address: "",
        state: "",
        city: "",
        pin: ""
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter contact name"
            />

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Emergency Contact Type
              </label>
              <select
                name="emergencyContactType"
                value={formData.emergencyContactType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hospital">Hospital</option>
                <option value="police">Police</option>
                <option value="fire">Fire</option>
                <option value="ambulance">Ambulance</option>
                <option value="others">Others</option>
              </select>

              {formData.emergencyContactType === "others" && (
                <Input
                  label="Specify Contact Type"
                  name="customContactType"
                  value={formData.customContactType}
                  onChange={handleInputChange}
                  placeholder="e.g. Blood Bank, Disaster Response"
                  className="mt-3"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Primary Contact No"
              name="econtactNo1"
              value={formData.econtactNo1}
              onChange={handleInputChange}
              placeholder="Enter primary contact"
            />
            <Input
              label="Alternate Contact No"
              name="econtactNo2"
              value={formData.econtactNo2}
              onChange={handleInputChange}
              placeholder="Enter alternate contact"
            />
          </div>

          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter state"
            />
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
            />
            <Input
              label="PIN Code"
              name="pin"
              value={formData.pin}
              onChange={handleInputChange}
              placeholder="Enter PIN code"
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Submit Contact
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
