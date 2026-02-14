import {
  React,
  useDispatch,
  useSelector,
  Input,
  Select,
  Button,
  CountryStateCitySelector,
  setCustomerFormField,
} from "../../../../components/common/imports";

const RequiredLabel = ({ text }) => (
  <>
    {text} <span className="text-red-500">*</span>
  </>
);

const SocietyCreateForm = ({ onSubmit, onEditHandler }) => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.customer.customerForm);
  const societyTypeOptions = useSelector(
    (state) => state.customer.societyTypeOptions
  );
  const subscriptionPlans = useSelector(
    (state) => state.customer.subscriptionPlans
  );
  const customerTypeOptions = useSelector(
    (state) => state.customer.customerTypeOptions
  );
  const formMode = useSelector((state) => state.customer.formOperationType);

  // ✅ FIXED HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const addressFields = ["address1", "address2", "street", "zipCode"];

    if (addressFields.includes(name)) {
      dispatch(
        setCustomerFormField({
          name: "address",
          value: {
            ...formData.address,
            [name]: value,
          },
        })
      );
    } else {
      dispatch(setCustomerFormField({ name, value }));
    }
  };

  const currentYear = new Date().getFullYear();
  // const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => {
  //   const year = currentYear - i;
  //   return { label: year.toString(), value: year };
  // });
 const yearOptions = [
  { label: "Choose a Year", value: null }, // first option
  ...Array.from({ length: currentYear - 1899 }, (_, i)  => {
    const year = currentYear - i;
    return { label: year.toString(), value: year };
  }),
];
  return (
    <div className="flex">
      <div className="w-full space-y-5">
        {/* Customer Info */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">Customer Info</h3>

          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
                label={<RequiredLabel text="Customer Name" />}
                type="text"
                placeholder="Enter customer name"
                size="lg"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                readOnly={formMode === "view"} // editable in create & edit
              />

            <Select
              label={<RequiredLabel text="Select Customer Type" />}
              options={customerTypeOptions}
              value={formData.customerType}
              onChange={handleInputChange}
              name="customerType"
              className="py-[14px]"
              readOnly={formMode === "view"}
            />

            <Select
              label={<RequiredLabel text="Select Subscription Plan" />}
              options={subscriptionPlans}
              value={formData.subscriptionId}
              onChange={handleInputChange}
              name="subscriptionId"
              className="py-[14px]"
              readOnly={formMode === "view"}
            />

            <Select
              label={<RequiredLabel text="Establishment Year" />}
              options={yearOptions}
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />

            {formData.customerType === "society" && (
              <Select
                label={<RequiredLabel text="Select Society Type" />}
                options={societyTypeOptions}
                value={formData.societyType}
                onChange={handleInputChange}
                name="societyType"
                className="py-[14px]"
                readOnly={formMode === "view"}
              />
            )}
          </div>
        </div>

        {/* Builder Info */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">Builder Info</h3>

          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label="Builder Name"
              type="text"
              placeholder="Enter Builder name"
              size="lg"
              name="builderName"
              value={formData.builderName}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />

            <Input
              label="Builder Details"
              type="text"
              placeholder="Enter Builder Social Link"
              size="lg"
              name="builderSocialLink"
              value={formData.builderSocialLink}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">
            Society Location / Address
          </h3>

          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={<RequiredLabel text="Address Line 1" />}
              type="text"
              placeholder="Enter address line 1"
              size="lg"
              name="address1"
              value={formData.address.address1}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />

            <Input
              label={<RequiredLabel text="Address Line 2" />}
              type="text"
              placeholder="Enter address line 2"
              size="lg"
              name="address2"
              value={formData.address.address2}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />

            <Input
              label={<RequiredLabel text="Street" />}
              type="text"
              placeholder="Enter Street"
              size="lg"
              name="street"
              value={formData.address.street}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>

          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <CountryStateCitySelector
                  address={formData.address}
                 setAddress={(updatedFields) =>
  dispatch(
    setCustomerFormField({
      name: "address",
      value: {
        ...formData.address,
        ...updatedFields,
      },
    })
  )
}


                  
                />


            <Input
              label={<RequiredLabel text="Pin" />}
              type="text"
              placeholder="Enter pin"
              size="lg"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">
            Society Contact Details
          </h3>

          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={<RequiredLabel text="Mobile Number" />}
              type="text"
              placeholder="Enter mobile number"
              size="lg"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />

           <Input
              label={<RequiredLabel text="Email" />}
              type="text"
              placeholder="Enter email"
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={formMode !== "create"} // editable only in create
            />

          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center py-5">
          {formMode === "create" && (
            <Button onClick={onSubmit} className="w-full max-w-lg">
              Submit
            </Button>
          )}

          {formMode === "edit" && (
            <Button
              onClick={() => onEditHandler()}
              className="w-full max-w-lg"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocietyCreateForm;
