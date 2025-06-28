import { React, useState } from "react";

const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  // Add more country codes as needed
];

const Countrycodes = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCountryCodes = countryCodes.filter((item) =>
    item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (code) => {
    onChange(code);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm || value}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        placeholder="Select your country code"
      />
      {isDropdownOpen && (
        <ul className="absolute z-10 mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg">
          {filteredCountryCodes.length ? (
            filteredCountryCodes.map((item) => (
              <li
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.code} - {item.country}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Countrycodes;
