'use client';

import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

const Directories = () => {
  const [guests, setGuests] = useState([]);
  const [name, setName] = useState('');

  const inputChange= (e) => {
    setName(e.target.value);
  }

  const btnHandler = () => {
    setGuests(prev => [...prev, name]);
    setName('');
  }
  return (
    <div className="max-w-[400px]">
      <Input
        value={name}
        onChange={inputChange}
        placeholder="Enter guest name"
        type="text"
      />
      <Button color="lime" onClick={btnHandler}>
        Submit
      </Button>
      <div className="space-y-2 mt-5 ">
        {guests.map((name, index) => (
          <div key={index} className="p-2 bg-gray-200">
            {index + 1} : {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directories;
