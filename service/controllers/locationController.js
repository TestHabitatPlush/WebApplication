const { Country, State, City } = require("country-state-city");

exports.getAllCountries = (req, res) => {
  const countries = Country.getAllCountries();
  res.json(countries);
};

exports.getStatesByCountry = (req, res) => {
  const { countryCode } = req.params;
  const states = State.getStatesOfCountry(countryCode);
  res.json(states);
};

exports.getCitiesByState = (req, res) => {
  const { countryCode, stateCode } = req.params;
  const cities = City.getCitiesOfState(countryCode, stateCode);
  res.json(cities);
};
