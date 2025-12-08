


// import React, { useEffect, useState } from "react";
// import { Country, State, City } from "country-state-city";
// import Select from "../ui/Select";

// const CountryStateCitySelector = ({ address, setAddress }) => {
//   const [countryList, setCountryList] = useState([]);
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);

//   useEffect(() => {
//     const countries = Country.getAllCountries();
//     setCountryList(countries);
//   }, []);

//   useEffect(() => {
//     if (address?.countryCode) {
//       const states = State.getStatesOfCountry(address.countryCode);
//       setStateList(states);
//     } else {
//       setStateList([]);
//     }
//     setAddress({ stateCode: "", stateName: "", city: "" });
//   }, [address?.countryCode]);

//   useEffect(() => {
//     if (address?.stateCode && address?.countryCode) {
//       const cities = City.getCitiesOfState(address.countryCode, address.stateCode);
//       setCityList(cities);
//     } else {
//       setCityList([]);
//     }
//     setAddress({ city: "" });
//   }, [address?.stateCode]);

//   const handleCountryChange = (e) => {
//     const selected = Country.getCountryByCode(e.target.value);
//     setAddress({
//       countryCode: selected.isoCode,
//       countryName: selected.name,
//     });
//   };

//   const handleStateChange = (e) => {
//     const selected = State.getStateByCodeAndCountry(e.target.value, address.countryCode);
//     setAddress({
//       stateCode: selected.isoCode,
//       stateName: selected.name,
//     });
//   };

//   const handleCityChange = (e) => {
//     setAddress({ city: e.target.value });
//   };

//   return (
//     <>
//       <Select
//         label="Country"
//         options={countryList.map((c) => ({
//           label: c.name,
//           value: c.isoCode,
//         }))}
//         value={address?.countryCode || ""}
//         onChange={handleCountryChange}
//         name="country"
//       />
//       <Select
//         label="State"
//         options={stateList.map((s) => ({
//           label: s.name,
//           value: s.isoCode,
//         }))}
//         value={address?.stateCode || ""}
//         onChange={handleStateChange}
//         name="state"
//       />
//       <Select
//         label="City"
//         options={cityList.map((c) => ({
//           label: c.name,
//           value: c.name,
//         }))}
//         value={address?.city || ""}
//         onChange={handleCityChange}
//         name="city"
//       />
//     </>
//   );
// };

// export default CountryStateCitySelector;

import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "../ui/Select";

const CountryStateCitySelector = ({ address, setAddress }) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const states = State.getStatesOfCountry(selectedCountry.isoCode);
    setStateList(states);
    setCityList([]);
    setSelectedState(null);

    setAddress({
      country: selectedCountry.name,
      state: "",
      city: "",
    });
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;
    const cities = City.getCitiesOfState(
      selectedCountry.isoCode,
      selectedState.isoCode
    );
    setCityList(cities);

    setAddress({
      ...address,
      state: selectedState.name,
      city: "",
    });
  }, [selectedState]);

  const handleCountryChange = (e) => {
    const selectedName = e.target.value;
    const country = countryList.find((c) => c.name === selectedName);
    if (country) setSelectedCountry(country);
  };

  const handleStateChange = (e) => {
    const selectedName = e.target.value;
    const state = stateList.find((s) => s.name === selectedName);
    if (state) setSelectedState(state);
  };

  const handleCityChange = (e) => {
    const selectedName = e.target.value;
    setAddress({
      ...address,
      city: selectedName,
    });
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
        className="py-[10px]"
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
        className="py-[10px]"
        disabled={!selectedCountry}
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
        className="py-[10px]"
        disabled={!selectedState}
      />
    </>
  );
};

export default CountryStateCitySelector;
