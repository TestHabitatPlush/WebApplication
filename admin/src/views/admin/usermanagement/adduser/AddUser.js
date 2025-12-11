import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import UserHandler from "../../../../handlers/UserHandler";
import UserRoleHandler from "../../../../handlers/UserRoleHandler";
import UnitHandler from "../../../../handlers/UnitHandler";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";
import BuildingHandler from "../../../../handlers/BuildingHandler";
import FloorHandler from "../../../../handlers/FloorHandler";
import UnitTypeHandler from "../../../../handlers/building_management/UnitTypeHandler";
import { FaCamera,FaTrashAlt } from "react-icons/fa";
import PhoneCodeSelector from "../../../../components/shared/PhoneCodeSelector";
import CountryStateCitySelector from "../../../../components/shared/CountryStateCitySelector"
import ReusableTable from "../../../../components/shared/ReusableTable";
import { useDispatch, useSelector } from "react-redux";
const AddUser = () => {
  const paths = ["User Management", "Add User"];
  const Heading = ["Add Resident User"];
  const societyId =useSelector((state) => state.auth.user?.Customer?.customerId) || "";
  const unitId = useSelector((state) => state.auth.user?.Unit?.unitId) || "";
  // const countryCodesList =
  //   useSelector((state) => state.countryCode.countryCodes) || [];
  const dispatch = useDispatch();
  const { CreateDefineUnitHandler } = DefineUnitHandler();
  const { getFloorHandler } = FloorHandler();
  const { getUnitTypeHandler } = UnitTypeHandler();
  const { getBuildingshandler } = BuildingHandler();
  const { createSocietyResidentUserHandler } = UserHandler();
  const { getUserRolesHandler } = UserRoleHandler();
  const { deleteUnitHandler ,getAllUnitHandler} = UnitHandler();
   const fileInputRef = useRef(null);

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [unitTypeOptions, setUnitTypeOptions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [unitNoOptions, setUnitNoOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [previewFileName, setPreviewFileName] = useState(null);
  const [defineUnit, setDefineUnit] = useState({
    buildingId: "",
    floorId: "",
    unitTypeId: "",
    unitNumber: "",
    //  unitsize: "",
  });



  const [formData, setFormData] = useState({
    photo: "",
    salutation: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    mobileNumber: "",
    alternateCountryCode: "",
    alternateNumber: "",
    email: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
    liveshere: false,
    primarycontact: false,
    ismaemberofassociationcommite: false,
    membertype: "",
    remark: "",
    societyId: "",
    roleId: "",
    unitId: "",
  });

  const [unitName, setUnitName] = useState({
    buildingId: "",
    floorId: "",
    unitNumber: "",
  });

  const [units, setUnits] = useState([]);
  //const fileInputRef = useRef(null);
  const [photo, setProfilePhoto] = useState("");
  const [photomsg, setPhotomsg] = useState("");
  const selectOption = {
    salutation: [
      { label: "Select Salutation", value: "" },
      { label: "Mr", value: "mr" },
      { label: "Mrs", value: "mrs" },
      { label: "Miss", value: "miss" },
      { label: "Dr", value: "dr" },
      { label: "Prof", value: "prof" },
    ],
  };

  const roleCategoryMapping = {
    society_owner_family: "Owner Family",
    society_owner: "Owner",
    society_tenant: "Tenant",
    society_tenant_family: "Tenant Family",
  };

  useEffect(() => {
    if (societyId) {
      setFormData((prev) => ({ ...prev, societyId }));
    }
  }, [societyId]);

  useEffect(() => {
    if (unitId) {
      setFormData((prev) => ({ ...prev, unitId }));
    }
  }, [unitId]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill all mandatory fields.");
      return false;
    }
    if (!formData.mobileNumber) {
      toast.error("Please fill all mandatory fields.");
      return false;
    }
    return true;
  };

  const fetchRoles = async () => {
    try {
      const result = await getUserRolesHandler();
      if (result?.data) {
        const filteredRoles = result.data
          .filter((el) =>
            [
              "society_owner_family",
              "society_tenant",
              "society_owner",
              "society_tenant_family",
            ].includes(el.roleCategory)
          )
          .map((el) => ({
            label: roleCategoryMapping[el.roleCategory] || el.roleCategory,
            value: el.roleId,
          }));
        setRoles(filteredRoles);
      } else {
        toast.error("Invalid data format received from the server.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to load roles.");
    }
  };

  const getBuildings = async () => {
    try {
      const res = await getBuildingshandler();
      const optionData = res.data.data.map((el) => ({
        label: el.buildingName,
        value: el.buildingId,
      }));
      setBuildingOptions([
        { label: "Select Building", value: "" },
        ...optionData,
      ]);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  const getFloors = async () => {
    try {
      const res = await getFloorHandler();
      const optionData = res.data.data.map((el) => ({
        label: `${el.floorName} (${el.shortForm})`,
        value: el.floorId,
        shortForm: el.shortForm,
      }));
      setFloorOptions([{ label: "Select Floor", value: "" }, ...optionData]);
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  const getUnitTypes = async () => {
    try {
      const res = await getUnitTypeHandler();
      const optionData = res.data.data.map((el) => ({
        label: el.unitTypeName,
        value: el.unitTypeId,
      }));
      setUnitTypeOptions([
        { label: "Select Unit Type", value: "" },
        ...optionData,
      ]);
    } catch (error) {
      console.error("Error fetching unit types:", error);
    }
  };

  const getUnitNumber = async () => {
    try {
      const res = await getAllUnitHandler();
      const optionData = res.data.data.map((el) => ({
        label: el.unitNumber,
        value: el.unitId,
      }));
      setUnitNoOptions([
        { label: "Select Unit Number", value: "" },
        ...optionData,
      ]);
    } catch (error) {
      console.error("Error fetching unit number:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
    getBuildings();
    getFloors();
    getUnitTypes();
    getUnitNumber();
  }, []);

  // const handleRadioChange = (roleId) => setSelectedRoleId(roleId);
  const handleRadioChange = (roleId) => {
    setSelectedRoleId(roleId);

    // const managementCommitteeRole = roles.find(
    //   (role) => role.label.toLowerCase() === "managment committee"
    // );

    // if (managementCommitteeRole && roleId === managementCommitteeRole.value) {
    //   setFormData((prev) => ({
    //     ...prev,
    //     ismaemberofassociationcommite: true,
    //   }));
    // } else {
    //   setFormData((prev) => ({
    //     ...prev,
    //     ismaemberofassociationcommite: false,
    //   }));
    // }
  };

  const handleDeleteUnit = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit?"
    );
    if (!confirmed) return;
    try {
      const res = await deleteUnitHandler(id);
      toast.success("Unit deleted successfully");
      setUnits((prev) => prev.filter((unit) => unit.unitId !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete unit");
    }
  };

  const onBuildingChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit((prev) => ({ ...prev, [name]: value }));
    const label = buildingOptions.find(
      (el) => el.value === parseInt(value)
    )?.label;
    setUnitName((prev) => ({
      ...prev,
      buildingId: label?.toUpperCase() || "",
    }));
  };

  const onFloorChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit((prev) => ({ ...prev, [name]: value }));
    const short = floorOptions.find(
      (el) => el.value === parseInt(value)
    )?.shortForm;
    setUnitName((prev) => ({ ...prev, floorId: short?.toUpperCase() || "" }));
  };

  const onUnitNumberChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit((prev) => ({ ...prev, [name]: value }));
    setUnitName((prev) => ({ ...prev, unitNumber: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormData = () => {
    setDefineUnit({
      buildingId: "",
      floorId: "",
      unitTypeId: "",
      unitNumber: "",
      // unitsize: "",
    });
    setUnitName({
      buildingId: "",
      floorId: "",
      unitNumber: "",
    });
  };

  const submitHandler = async () => {
    const newUnitName = `${unitName.buildingId}${unitName.floorId}${unitName.unitNumber}`;
    const unitPayload = {
      ...defineUnit,
      unitName: newUnitName,
      societyId,
    };

    try {
      const response = await CreateDefineUnitHandler(unitPayload);
      if (response.status === 201) {
        const createdUnitId = response.data?.data?.unitId;
        if (!createdUnitId) {
          toast.error("Unit created, but ID not returned");
          return;
        }

        setFormData((prev) => ({ ...prev, unitId: createdUnitId }));
        setUnits((prev) => [
          ...prev,
          { unitId: createdUnitId, unitName: newUnitName },
        ]);
        toast.success("Unit created successfully");
        resetFormData();
      } else {
        toast.error("Failed to create unit");
      }
    } catch (error) {
      console.error("Error creating unit:", error);
      toast.error("Error creating unit");
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const profileHandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setPhotomsg(
          "The image size is above 1MB. Please choose a smaller file."
        );
        return;
      } else {
        setPhotomsg("");
      }

      setProfilePhoto(URL.createObjectURL(file)); // For preview
      setFormData((prevData) => ({
        ...prevData,
        photo: file, // Set file object directly
      }));
    }
  };
  // const submitProfileUser = async () => {
  //   if (!selectedRoleId) {
  //     toast.error("Please select a role.");
  //     return;
  //   }
  //   if (!validateForm()) return;

  //   const updatedFormData = {
  //     ...formData,
  //     societyId,
  //     roleId: selectedRoleId,
  //   };

  //   try {
  //     await createSocietyResidentUserHandler(societyId, updatedFormData);
  //     toast.success("User profile created successfully.");
  //     setFormData({
  //       salutation: "",
  //       firstName: "",
  //       lastName: "",
  //       countryCode: "",
  //       mobileNumber: "",
  //       alternateCountryCode: "",
  //       alternateNumber: "",
  //       email: "",
  //       address: {
  //         addressLine1: "",
  //         addressLine2: "",
  //         state: "",
  //         city: "",
  //         country: "",
  //         zipCode: "",
  //       },
  //       liveshere: false,
  //       primarycontact: false,
  //       ismaemberofassociationcommite: false,
  //       membertype: "",
  //       remark: "",
  //       societyId,
  //       roleId: "",
  //       unitId: "",
  //       photo:""
  //     });
  //     setSelectedRoleId(null);
  //     setUnits([]);
  //   } catch (error) {
  //     console.error("Error creating resident:", error);
  //     toast.error("Failed to create user profile.");
  //   }
  // };
const [selectedUnits, setSelectedUnits] = useState([]);

  // ✅ Handle checkbox selection
  const handleSelect = (unitId) => {
    setSelectedUnits((prev) =>
      prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId]
    );
  };

  // ✅ Handle delete
  const handleDelete = (unitId) => {
    setUnits((prev) => prev.filter((u) => u.id !== unitId));
    setSelectedUnits((prev) => prev.filter((id) => id !== unitId));
  };
const columns = [
  {
    Header: "Select",
    accessor: "unitId",
    Cell: ({ row }) => (
      <input
        type="checkbox"
        checked={selectedUnits.includes(row.original.unitId)}
        onChange={() => handleSelect(row.original.unitId)}
        className="w-4 h-4 accent-blue-600"
      />
    )
  },
  { Header: "Building", accessor: "buildingName" },
  { Header: "Floor", accessor: "floorName" },
  { Header: "Unit Number", accessor: "unitNumber" },
  { Header: "Unit Name", accessor: "unitName" },
  {
    Header: "Delete",
    Cell: ({ row }) => (
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDeleteUnit(row.original.unitId)}
      >
        <FaTrashAlt />
      </button>
    )
  },
];


const submitProfileUser = async () => {
  if (!selectedRoleId) {
    toast.error("Please select a role.");
    return;
  }
  if (!validateForm()) return;

  const form = new FormData();
  form.append("salutation", formData.salutation);
  form.append("firstName", formData.firstName);
  form.append("lastName", formData.lastName);
  form.append("countryCode", formData.countryCode || "91");
  form.append("mobileNumber", formData.mobileNumber);
  form.append("alternateCountryCode", formData.alternateCountryCode || "91");
  form.append("alternateNumber", formData.alternateNumber || "");
  form.append("email", formData.email);
  form.append("roleId", selectedRoleId);
  form.append("unitId", formData.unitId);
  form.append("address", JSON.stringify(formData.address));

  if (formData.photo) {
    form.append("photo", formData.photo);
  }

  try {
    const response = await createSocietyResidentUserHandler(societyId, form);
    if (response.status === 201) {
      toast.success("User profile created successfully.");

      // Reset form
      setFormData({
        salutation: "",
        firstName: "",
        lastName: "",
        countryCode: "",
        mobileNumber: "",
        alternateCountryCode: "",
        alternateNumber: "",
        email: "",
        address: {
          addressLine1: "",
          addressLine2: "",
          state: "",
          city: "",
          country: "",
          zipCode: "",
        },
        liveshere: false,
        primarycontact: false,
        ismaemberofassociationcommite: false,
        membertype: "",
        remark: "",
        societyId,
        roleId: "",
        unitId: "",
        photo: "",
      });
      setSelectedRoleId(null);
      setUnits([]);
      setProfilePhoto("");
    } else {
      toast.error("Failed to create user profile.");
    }
  } catch (error) {
    console.error("Error creating resident:", error);
    toast.error("Failed to create user profile.");
  }
};

  
  return (
    <div className="px-5 ">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>

      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="font-sans text-xl font-semibold text-lime">
          Profile Details
        </div>

        <div className="flex items-center gap-5">
          <div
            className="relative border-2 rounded-full h-28 w-28 border-lime"
            style={{
              backgroundImage: photo ? `url(${photo})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <FaCamera
              onClick={handleIconClick}
              className="absolute bottom-0 right-0 bg-lime text-white text-[30px] p-2 rounded-full cursor-pointer"
              size={38}
            />
            <input
              name="photo"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                profileHandleFileChange(e);
              }}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h2>Choose profile photo</h2>
            <div className="text-red-700">{photomsg}</div>
          </div>
        </div>

        <div className="grid items-center grid-cols-4 gap-3 py-6">
          <Select
            label={
              <span>
                Salutation<span className="text-red-500">*</span>
              </span>
            }
            options={selectOption.salutation}
            value={formData.salutation}
            onChange={handleInputChange}
            name="salutation"
            color="blue"
            size="md"
            className="py-[14px] "
          />
          <Input
            label={
              <span>
                First Name <span className="text-red-500">*</span>
              </span>
            }
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={"Enter First Name"}
            size={"lg"}
          />
          <Input
            label={
              <span>
                Last Name <span className="text-red-500">*</span>
              </span>
            }
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={"Enter Last Name"}
            size={"lg"}
          />
          {/* <div className="grid items-center grid-cols-3 gap-5"> */}
          <Input
            label={
              <span>
                Email<span className="text-red-500">*</span>
              </span>
            }
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={"Enter Email"}
            size={"lg"}
          />

          {/* </div> */}
        </div>

        {/* mobile and country codes */}
        <div className="grid grid-cols-4 gap-3">
          <PhoneCodeSelector
            label={
              <span>
                Country Code<span className="text-red-500">*</span>
              </span>
            }
            name="countryCode"
            value={formData.countryCode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                countryCode: e.target.value,
              }))
            }
          />

          <Input
            label={
              <span>
                Mobile No. (Primary)<span className="text-red-500">*</span>
              </span>
            }
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number"
            size="lg"
          />

          <PhoneCodeSelector
            label="Alternate Country Code"
            name="alternateCountryCode"
            value={formData.alternateCountryCode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                alternateCountryCode: e.target.value,
              }))
            }
          />

          <Input
            label="Alternate Mobile No."
            type="tel"
            name="alternateNumber"
            value={formData.alternateNumber}
            onChange={handleInputChange}
            placeholder="Enter Alternate Mobile Number"
            size="lg"
          />
        </div>

        <div className="mt-10 font-sans text-xl font-semibold text-lime">
  Address Details
</div>

<div className="grid items-center grid-cols-3 gap-3 py-6">
  <Input
    label={
      <span>
        Address line 1 <span className="text-red-500">*</span>
      </span>
    }
    name="addressLine1"
    value={formData.address.addressLine1}
    onChange={handleInputChange}
    placeholder={"Enter Address"}
    size={"lg"}
  />

  <Input
    label={<span>Address line 2</span>}
    type="text"
    name="addressLine2"
    value={formData.address.addressLine2}
    onChange={handleInputChange}
    placeholder={"Enter Address"}
    size={"lg"}
  />
</div>

<div className="grid items-center grid-cols-4 gap-4">
  <CountryStateCitySelector
    labelComponents={{
      country: (
        <span>
          Country <span className="text-red-500">*</span>
        </span>
      ),
      state: (
        <span>
          State <span className="text-red-500">*</span>
        </span>
      ),
      city: (
        <span>
          City <span className="text-red-500">*</span>
        </span>
      ),
    }}
    address={formData.address}
    setAddress={(updatedFields) =>
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          ...updatedFields,
        },
      }))
    }
  />

  <Input
    label={
      <span>
        Pin <span className="text-red-500">*</span>
      </span>
    }
    type="number"
    name="zipCode"
    value={formData.address.zipCode}
    onChange={handleInputChange}
    placeholder={"Enter Postal Pin"}
    size={"lg"}
  />
</div>

        <div className="mt-10 font-sans text-xl font-semibold text-lime">
          Role Allocation
        </div>
        <div className="mt-2 mb-2 font-sans text-lg font-semibold text-gray-700">
          Role <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 py-2 my-2">
          {roles.length > 0 ? (
            roles.map((role) => (
              <div key={role.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedRoleId === role.value}
                  onChange={() => handleRadioChange(role.value)}
                  className="cursor-pointer"
                />
                <label className="cursor-pointer">{role.label}</label>
              </div>
            ))
          ) : (
            <div>No roles available</div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-row items-center gap-3 ">
            <label>Lives Here?</label>
            <input
              type="checkbox"
              name="liveshere"
              checked={formData.liveshere}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row items-center gap-3 ">
            <label>Primary Contact? </label>
            <input
              type="checkbox"
              name="primarycontact"
              checked={formData.primarycontact}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div>Is Member Of Association Committee?</div>
            <div>
              <input
                type="checkbox"
                name="ismaemberofassociationcommite"
                checked={formData.ismaemberofassociationcommite}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* <div className="flex flex-row items-center gap-3">
            <div>Is Member Of Association Committee?</div>
            <div>
              <input
                type="checkbox"
                name="ismaemberofassociationcommite"
                checked={formData.ismaemberofassociationcommite}
                onChange={handleInputChange}
              />
            </div>
          </div> */}

          <div className="max-w-sm">
            <Input
              label={<div> Member type</div>}
              type="text"
              name="membertype"
              value={formData.membertype}
              onChange={handleInputChange}
              placeholder={"Enter Member type"}
              size={"lg"}
            />
            <Input
              label={<div>Remark </div>}
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
              placeholder={"Give remark"}
              size={"lg"}
            />
          </div>
        </div>
      </div>

      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        {/* <div className="font-sans text-xl font-semibold text-lime">
          Unit Details
        </div> */}
        <div className="grid items-center grid-cols-3 gap-5 py-6">
          {/* <Select
            label={
              <div>
                Tower / Building (Name / No.){" "}
                <span className="text-red-500">*</span>
              </div>
            }
            options={buildingOptions}
            value={defineUnit.buildingId}
            onChange={onBuildingChange}
            name="buildingId"
            color="blue"
            size="md"
            className="py-[14px]"
          />
          <Select
            label={
              <div>
                Select Floor<span className="text-red-500">*</span>
              </div>
            }
            options={floorOptions}
            value={defineUnit.floorId}
            onChange={onFloorChange}
            name="floorId"
            color="blue"
            size="md"
            className="py-[14px]"
          />
          <Select
            label={
              <div>
                Unit Type<span className="text-red-500">*</span>
              </div>
            }
            options={unitTypeOptions}
            value={defineUnit.unitTypeId}
            onChange={handleChange}
            name="unitTypeId"
            color="blue"
            size="md"
            className="py-[14px]"
          />
          <Select
            label={
              <div>
                Unit Number<span className="text-red-500">*</span>
              </div>
            }
            options={unitNoOptions}
            value={defineUnit.unitNumber}
            onChange={onUnitNumberChange}
            name="unitNumber"
            color="blue"
            size="md"
            className="py-[14px]"
          /> */}
          {/* <Input
                  label={
                      <div>
                       Unit Number<span className="text-red-500">*</span>
                      </div>
                    }
                  type="text"
                  name="unitNumber"
                  placeholder="Enter Unit No"
                  size="lg"
                  value={defineUnit.unitNumber}
                  onChange={onUnitNumberChange}
                /> */}
          {/* <Input
                  label= {
                      <div>
                       Unit Size (Sq.feet)<span className="text-red-500">*</span>
                      </div>
                    }
                  type="text"
                  name="unitsize"
                  placeholder="Enter Super Built-up Area"
                  size="lg"
                  value={defineUnit.unitsize}
                  onChange={handleChange}
                />
         */}
          {/* <div>
                  <h3 className="">
                    <strong>Unit Name</strong> :{" "}
                    {`${unitName.buildingId}${unitName.floorId}${unitName.unitNumber}`}{" "}
                  </h3>
                </div>
              </div> */}

          {/* <div className="flex justify-center mt-5">
            <Button
              className="max-w-sm"
              type="submit"
              onClick={submitHandler}
              size="lg"
            >
              Add Unit
            </Button>
          </div>
         */}
         
          {/* <div className="mt-5">
            <h5 className="text-lg font-semibold">
              Unit Names List ({units.length})
            </h5>
            <div className="grid grid-cols-3 gap-3 py-5">
              {units.map((unit, index) => (
                <div
                  key={unit.unitId}
                  className="relative w-full max-w-sm p-6 mx-auto bg-white border shadow rounded-xl"
                >
                  <button
                    onClick={() => handleDeleteUnit(unit.unitId)}
                    className="absolute text-red-500 top-2 right-2 hover:text-red-700"
                    title="Delete Unit"
                    aria-label={`Delete unit ${unit.unitName}`}
                  >
                    <FaTimes />
                  </button>

                  <div className="flex items-center justify-center h-auto text-center">
                    <span className="text-lg font-semibold text-blue-700 break-words">
                      {unit.unitName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>*/}
        </div> 

{/* <div className="mt-10">
  <h5 className="mb-3 text-lg font-semibold">Unit Names List</h5>

  <ReusableTable
    columns={[
      {
        Header: "Select",
        accessor: "select",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedUnits.includes(row.original.unitId)}
            onChange={() => handleSelect(row.original.unitId)}
            className="w-4 h-4 accent-blue-600"
          />
        ),
      },
      { Header: "Tower / Building Name", accessor: "buildingName" },
      { Header: "Floor Name", accessor: "floorName" },
      { Header: "Unit Number", accessor: "unitNumber" },
      { Header: "Unit Name", accessor: "unitName" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            onClick={() => handleDeleteUnit(row.original.unitId)}
            className="text-red-500 hover:text-red-700"
            title="Delete Unit"
          >
            <FaTrashAlt />
          </button>
        ),
      },
    ]}
    data={units.map((u, i) => ({
      ...u,
      id: i + 1,
      buildingName: buildingOptions.find(b => b.value === u.buildingId)?.label || "-",
      floorName: floorOptions.find(f => f.value === u.floorId)?.label || "-",
    }))}
    pageIndex={0}
    pageSize={5}
    totalCount={units.length}
    totalPages={1}
    setPageIndex={() => {}}
    setPageSize={() => {}}
  />

  <div className="mt-4 text-sm text-gray-600">
    <span className="font-semibold">Note:</span> Selected Units can be allocated
    to a single user.
  </div>
</div> */}
{/* ========================= UNIT DETAILS ========================= */}
<div className="p-10 my-5 bg-gray-100 border rounded-lg">
  {/* <div className="font-sans text-xl font-semibold text-lime">
    Unit Details
  </div> */}

{/* 
  <div className="grid items-center grid-cols-3 gap-5 py-6">
    <Select
      label={
        <div>
          Tower / Building (Name / No.){" "}
          <span className="text-red-500">*</span>
        </div>
      }
      options={buildingOptions}
      value={defineUnit.buildingId}
      onChange={onBuildingChange}
      name="buildingId"
      color="blue"
      size="md"
      className="py-[14px]"
    />

    <Select
      label={
        <div>
          Select Floor<span className="text-red-500">*</span>
        </div>
      }
      options={floorOptions}
      value={defineUnit.floorId}
      onChange={onFloorChange}
      name="floorId"
      color="blue"
      size="md"
      className="py-[14px]"
    />

    <Select
      label={
        <div>
          Unit Type<span className="text-red-500">*</span>
        </div>
      }
      options={unitTypeOptions}
      value={defineUnit.unitTypeId}
      onChange={handleChange}
      name="unitTypeId"
      color="blue"
      size="md"
      className="py-[14px]"
    />
  </div> */}

  {/* Search Button */}
  <div className="flex justify-center mt-3">
    {/* <Button
      className="max-w-sm"
      type="button"
      onClick={async () => {
        try {
          // 👇 Filter API call
          const response = await getAllUnitHandler({
            buildingId: defineUnit.buildingId || null,
            floorId: defineUnit.floorId || null,
            unitTypeId: defineUnit.unitTypeId || null,
            societyId,
          });

          if (response?.data?.data) {
            const unitList = response.data.data.map((unit, index) => ({
              id: unit.unitId,
              buildingName: unit.Building?.buildingName || "N/A",
              floorName: unit.Floor?.floorName || "N/A",
              unitNumber: unit.unitNumber,
              unitName: unit.unitName,
            }));
            setUnits(unitList);
            toast.success(`Found ${unitList.length} units.`);
          } else {
            setUnits([]);
            toast.error("No units found for the selected filters.");
          }
        } catch (error) {
          console.error("Error fetching filtered units:", error);
          toast.error("Failed to fetch units.");
        }
      }}
      size="lg"
    >
      Search Units
    </Button> */}
{/* <Button
  className="max-w-sm"
  type="button"
  onClick={async () => {
    try {
      const response = await getAllUnitHandler({
        societyId,
        buildingId: defineUnit.buildingId || null,
        floorId: defineUnit.floorId || null,
        unitTypeId: defineUnit.unitTypeId || null,
      });

      if (response?.data) {
      const unitList = response.data.data.map((unit) => ({
        unitId: unit.unitId,
        buildingName:  unit.Building?.buildingName || "N/A",
        floorName:  unit.Floor?.floorName || "N/A",
        unitNumber: unit.unitNumber,
        unitName: unit.unitName,
     }));

        setUnits(unitList);
        toast.success(`Found ${unitList.length} units.`);
      } else {
        setUnits([]);
        toast.error("No units found for the selected filters.");
      }
    } catch (error) {
      console.error("Error fetching filtered units:", error);
      toast.error("Failed to fetch units.");
    }
  }}
  size="lg"
>
  Search Units
</Button> */}

  {/* </div> */}


  {/* <div className="mt-8">
    <h5 className="text-lg font-semibold">
      Units List ({units.length})
    </h5>

    <ReusableTable
      columns={columns}
      data={units}
      pageIndex={0}
      pageSize={5}
      totalCount={units.length}
      totalPages={1}
      setPageIndex={() => {}}
      setPageSize={() => {}}
    />

    <div className="mt-4 text-sm text-gray-600">
      <span className="font-semibold">Note:</span> Selected Units can be
      allocated for a single user.
    </div>
  </div> */}
</div>


      {/* ✅ Footer note below the table */}
      {/* <div className="mt-4 text-sm text-gray-600">
        <span className="font-semibold">Note:</span> Selected Units can be
        Allocated for a single user.
      </div>
      */}
       </div> 

      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
  <div className="font-sans text-xl font-semibold text-lime">
    Unit Details
  </div>

  {/* Filter Inputs */}
  <div className="grid items-center grid-cols-3 gap-5 py-6">
    <Select
      label={<div> Building <span className="text-red-500">*</span></div>}
      options={buildingOptions}
      value={defineUnit.buildingId}
      onChange={onBuildingChange}
      name="buildingId"
      color="blue"
      size="md"
    />

    <Select
      label={<div>Floor <span className="text-red-500">*</span></div>}
      options={floorOptions}
      value={defineUnit.floorId}
      onChange={onFloorChange}
      name="floorId"
      color="blue"
      size="md"
    />

    <Select
      label={<div>Unit Type<span className="text-red-500">*</span></div>}
      options={unitTypeOptions}
      value={defineUnit.unitTypeId}
      onChange={handleChange}
      name="unitTypeId"
      color="blue"
      size="md"
    />
  </div>

  {/* Search Button */}
  <div className="flex justify-center mt-3">
    <Button
      className="max-w-sm"
      type="button"
      size="lg"
      onClick={async () => {
        try {
          const response = await getAllUnitHandler({
            societyId,
            buildingId: defineUnit.buildingId || null,
            floorId: defineUnit.floorId || null,
            unitTypeId: defineUnit.unitTypeId || null,
          });

          if (response?.data?.data?.length > 0) {
          const unitList = response.data.data.map((unit) => ({
            unitId: unit.unitId,
            buildingName: unit.Building?.buildingName || "N/A",
            floorName: unit.Floor?.floorName || "N/A",
            floorId: unit.floorId,        // optional add
            buildingId: unit.buildingId,  // optional add
            unitNumber: unit.unitNumber,
            unitName: unit.unitName,
          }));


            setUnits(unitList);
            console.log(unitList);
            toast.success(`Found ${unitList.length} units.`);
          } else {
            setUnits([]);
            toast.error("No units found!");
          }
        } catch (error) {
          console.error("Error fetching filtered units:", error);
          toast.error("Failed to fetch units.");
        }
      }}
    >
      Search Units
    </Button>
  </div>

  {/* Table Display */}
  <div className="mt-8">
    <h5 className="text-lg font-semibold">Units List ({units.length})</h5>

    <ReusableTable
      columns={[
        {
          Header: "Select",
          accessor: "unitId",
          Cell: ({ row }) => (
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-600"
              checked={selectedUnits.includes(row.original.unitId)}
              onChange={() => handleSelect(row.original.unitId)}
            />
          )
        },
        { Header: "Building", accessor: "buildingName" },
        { Header: "Floor", accessor: "floorName" },
        { Header: "Unit No", accessor: "unitNumber" },
        { Header: "Unit Name", accessor: "unitName" },
        {
          Header: "Delete",
          Cell: ({ row }) => (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteUnit(row.original.unitId)}
            >
              <FaTrashAlt />
            </button>
          )
        }
      ]}
       data={units.map((u, i) => ({
      ...u,
      id: i + 1,
      buildingName: buildingOptions.find(b => b.value === u.buildingId)?.label || "-",
      floorName: floorOptions.find(f => f.value === u.floorId)?.label || "-",
    }))}
     // data={units}
      pageIndex={0}
      pageSize={5}
      totalCount={units.length}
      totalPages={1}
      setPageIndex={() => {}}
      setPageSize={() => {}}
    />

    <div className="mt-4 text-sm text-gray-600">
      <span className="font-semibold">Note:</span> Selected Units can be allocated for a single user.
    </div>
  </div>
</div>

      <div className="flex justify-center mt-5">
        <Button
          className="max-w-sm"
          type="button"
          onClick={submitProfileUser}
          size="lg"
        >
          Add Profile
        </Button>
      </div>
    </div>
    </div>
  );
};
export default AddUser;

