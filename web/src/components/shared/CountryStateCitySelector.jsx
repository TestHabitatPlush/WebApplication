import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "../ui/Select";

const CountryStateCitySelector = ({ address, setAddress }) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  // Load countries
  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (!countryCode) return;
    const states = State.getStatesOfCountry(countryCode);
    setStateList(states);
    setCityList([]);
    setAddress((prev) => ({
      ...prev,
      state: "",
      city: "",
    }));
  }, [countryCode]);

  // Load cities when state changes
  useEffect(() => {
    if (!countryCode || !stateCode) return;
    const cities = City.getCitiesOfState(countryCode, stateCode);
    setCityList(cities);
    setAddress((prev) => ({
      ...prev,
      city: "",
    }));
  }, [stateCode]);

  // When country selected
  const handleCountryChange = (e) => {
    const selectedName = e.target.value;
    const country = countryList.find((c) => c.name === selectedName);
    setCountryCode(country?.isoCode || "");
    setAddress((prev) => ({ ...prev, country: selectedName }));
  };

  // When state selected
  const handleStateChange = (e) => {
    const selectedName = e.target.value;
    const state = stateList.find((s) => s.name === selectedName);
    setStateCode(state?.isoCode || "");
    setAddress((prev) => ({ ...prev, state: selectedName }));
  };

  // When city selected
  const handleCityChange = (e) => {
    setAddress((prev) => ({ ...prev, city: e.target.value }));
  };

  return (
    <>
      <Select
        label="Country"
        name="country"
        value={address.country}
        onChange={handleCountryChange}
        options={[
          { label: "Select Country", value: "" },
          ...countryList.map((c) => ({ label: c.name, value: c.name })),
        ]}
        className="py-[14px]"
      />

      <Select
        label="State"
        name="state"
        value={address.state}
        onChange={handleStateChange}
        options={[
          { label: "Select State", value: "" },
          ...stateList.map((s) => ({ label: s.name, value: s.name })),
        ]}
        className="py-[14px]"
      />

      <Select
        label="City"
        name="city"
        value={address.city}
        onChange={handleCityChange}
        options={[
          { label: "Select City", value: "" },
          ...cityList.map((c) => ({ label: c.name, value: c.name })),
        ]}
        className="py-[14px]"
      />
    </>
  );
};

export default CountryStateCitySelector;


