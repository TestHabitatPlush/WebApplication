import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import AddNewFacilityForm from "./AddNewFacilityForm";
const AddNewFacility = () => {
  return (
    <main>
      <form>
        <AddNewFacilityForm />
      </form>
    </main>
  );
};

export default AddNewFacility;
