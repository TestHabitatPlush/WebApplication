const { Country, State, City } = require("country-state-city");
const CountryModel = require("../service/models/Country");
const StateModel = require("../service/models/State");
const CityModel = require("../service/models/City");


const sequelize = require("../config/database");

const seed = async () => {
  try {
    await sequelize.sync(); 

    const countries = Country.getAllCountries();
    console.log("countries", countries.length);

    for (const country of countries) {
      await CountryModel.create({
        isoCode: country.isoCode,
        name: country.name,
      });

      const states = State.getStatesOfCountry(country.isoCode);
      for (const state of states) {
        await StateModel.create({
          countryIsoCode: country.isoCode,
          isoCode: state.isoCode,
          name: state.name,
        });

        const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
        for (const city of cities) {
          await CityModel.create({
            countryIsoCode: country.isoCode,
            stateIsoCode: state.isoCode,
            name: city.name,
          });
        }
      }
    }

    console.log(" Seed complete");
  } catch (err) {
    console.error("Seed error:", err);
  }
};

seed();
