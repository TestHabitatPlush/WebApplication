import React, { useEffect, useState } from "react";
import { Country } from "country-state-city";
import Select from "../ui/Select"; 

const PhoneCodeSelector = ({ label, value, onChange, name = "countryCode" }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries();
    const codes = countries.map((country) => ({
      label: `${country.name} (+${country.phonecode}) ${country.flag || ""}`,
      value: `+${country.phonecode}`,
    }));

    setOptions([{ label: "Select Country Code", value: "" }, ...codes]);
  }, []);

  return (
    <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      className="py-[14px]"
    />
  );
};

export default PhoneCodeSelector;
