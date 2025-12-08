


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

    setAddress((prev) => ({
      ...prev,
      country: selectedCountry.name,
      state: "",
      city: "",
    }));
  }, [selectedCountry, setAddress]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    const cities = City.getCitiesOfState(
      selectedCountry.isoCode,
      selectedState.isoCode
    );
    setCityList(cities);

    setAddress((prev) => ({
      ...prev,
      state: selectedState.name,
      city: "",
    }));
  }, [selectedCountry, selectedState, setAddress]);

  const handleCountryChange = (e) => {
    const country = countryList.find((c) => c.name === e.target.value);
    if (country) setSelectedCountry(country);
  };

  const handleStateChange = (e) => {
    const state = stateList.find((s) => s.name === e.target.value);
    if (state) setSelectedState(state);
  };

  const handleCityChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      city: e.target.value,
    }));
  };

  return (
    <>
      <Select
        label="Country"
        value={address.country}
        onChange={handleCountryChange}
        options={[
          { label: "Select Country", value: "" },
          ...countryList.map((c) => ({ label: c.name, value: c.name })),
        ]}
      />

      <Select
        label="State"
        value={address.state}
        onChange={handleStateChange}
        options={[
          { label: "Select State", value: "" },
          ...stateList.map((s) => ({ label: s.name, value: s.name })),
        ]}
        disabled={!selectedCountry}
      />

      <Select
        label="City"
        value={address.city}
        onChange={handleCityChange}
        options={[
          { label: "Select City", value: "" },
          ...cityList.map((c) => ({ label: c.name, value: c.name })),
        ]}
        disabled={!selectedState}
      />
    </>
  );
};

export default CountryStateCitySelector;
