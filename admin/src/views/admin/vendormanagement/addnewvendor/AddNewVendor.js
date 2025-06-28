import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import { FaCamera } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import Button from "../../../../components/ui/Button";
import { MdOutlineCancel } from "react-icons/md";

const AddNewVendor = () => {
  const paths = ["User", "Add new vendor"];
  const Heading = ["Add new vendor"];
  return (
    <div className="px-5 ">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="text-xl font-sans font-semibold text-lime">
          Vendor Details
        </div>
        <div className="flex flex-row pt-[45px] items-center gap-4">
          <div>Make Vendor Active :</div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-3 px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked className="text-lg" />

              <label className="text-lg">Active</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>Inactive</label>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 py-4">
          <div>Vendor Legal Type :</div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked className="text-lg" />

              <label className="text-lg">Company</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>Individual</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>Professional</label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 items-center py-4">
          <Input
            label={<div>Vendor Legal Name</div>}
            type="text"
            placeholder={"Enter Vendor Name"}
            size={"lg"}
          />
          <Input
            label={<div>Vendor Billing Address</div>}
            type="text"
            placeholder={"Vendor Billing Address"}
            size={"lg"}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 items-center py-4">
          <Input
            label={<div>Vendor Contact Name</div>}
            type="text"
            placeholder={"Enter Vendor Contact Name"}
            size={"lg"}
          />
          <Input
            label={<div>Vendor Phone/Mobile Number</div>}
            type="number"
            placeholder={"Vendor Phone/Mobile Number"}
            size={"lg"}
          />
          <Input
            label={<div>Vendor e-mail ID</div>}
            type="email"
            placeholder={"Vendor e-mail ID"}
            size={"lg"}
          />
          <Input
            label={<div>Payee Name</div>}
            type="email"
            placeholder={"Payee Name"}
            size={"lg"}
          />
        </div>
      </div>
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="text-xl font-sans font-semibold text-lime">
          Vendor Payment Details
        </div>
        <div className="flex flex-row items-center gap-4 mt-[40px] pb-[20px]">
          <div>TDS Applicability :</div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked className="text-lg" />

              <label className="text-lg">Yes</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>No</label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 items-center">
          <Input
            label={<div>TDS Rate</div>}
            type="text"
            placeholder={"Enter TDS Rate in %"}
            size={"lg"}
          />
          <Input
            label={<div>GSTIN</div>}
            type="text"
            placeholder={"Enter Your GSTIN"}
            size={"lg"}
          />
          <Input
            label={<div>PAN</div>}
            type="text"
            placeholder={"Enter Your PAN"}
            size={"lg"}
          />
          <Input
            label={<div>TDS Section Code</div>}
            type="text"
            placeholder={"Enter TDS Section Code"}
            size={"lg"}
          />
        </div>
        {/* <div className="grid grid-cols-3 gap-5 items-center">
          <Input
            label={<div>City</div>}
            type="text"
            placeholder={"Enter Your City"}
            size={"lg"}
          />
          <Input
            label={<div>Pin</div>}
            type="number"
            placeholder={"Enter Your Pin"}
            size={"lg"}
          />
          <Input
            label="Country"
            type="text"
            placeholder={"Enter Your Country"}
            size={"lg"}
          />
        </div> */}
      </div>
      <div className="p-10 bg-gray-100 border border rounded-2xl">
        <h3 className="font-semibold text-lime">Society Location / Address</h3>
        <div className="mt-3 grid grid-cols-3 gap-5 items-center">
          <Input
            label="Address Line 1"
            type="text"
            placeholder="Enter address line 1"
            size="lg"
            name="address1"
            // value={formData.address.address1}
            // onChange={handleInputChange}
          />
          <Input
            label="Address line 2"
            type="text"
            placeholder="Enter your address"
            size="lg"
            name="street"
            // value={formData.address.street}
            // onChange={handleInputChange}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-5 items-center">
          <Input
            label="City"
            type="text"
            placeholder="Enter your city"
            size="lg"
            name="city"
            // value={formData.address.city}
            // onChange={handleInputChange}
          />
          <Input
            label="State"
            type="text"
            placeholder="Enter your state"
            size="lg"
            name="state"
            // value={formData.address.state}
            // onChange={handleInputChange}
          />
          <Input
            label="Pin"
            type="text"
            placeholder="Enter your pin"
            size="lg"
            name="zipCode"
            // value={formData.address.zipCode}
            // onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="text-xl font-sans font-semibold text-lime">
          Vendor Bank Details
        </div>

        <div className="grid grid-cols-5 gap-5 items-center">
          <Input
            label={<div>Bank Account Number</div>}
            type="text"
            // value={tower}
            // onChange={(e) => setTower(e.target.value)}
            placeholder={"Select Your Tower No."}
            size={"lg"}
          />
          <Input
            label={<div>Bank Account Name</div>}
            type="text"
            // value={floor}
            // onChange={(e) => setFloor(e.target.value)}
            placeholder={"Select Your Floor No."}
            size={"lg"}
          />
          <Input
            label={<div>Bank IFSC Code</div>}
            type="text"
            // value={unit}
            // onChange={(e) => setUnit(e.target.value)}
            placeholder={"Select Your Unit No."}
            size={"lg"}
          />
        </div>
      </div>
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="text-xl font-sans font-semibold text-lime">
          Documents
        </div>
        <div className="flex flex-row w-full items-center gap-3">
          <Input
            label={<div>Vendor Cheque Image</div>}
            type="file"
            // value={unit}
            // onChange={(e) => setUnit(e.target.value)}
            placeholder={
              "Upload Cheque Image in .JPEG, .PDF File size should be within 3 MB."
            }
            size={"lg"}
          />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button className="max-w-sm" type="submit" size="lg">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddNewVendor;
