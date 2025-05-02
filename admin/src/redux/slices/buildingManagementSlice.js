import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectOptions: {
    buildingList: [{ label: "Select Society", value: "" }],
  },
};

const buildingManagement = createSlice({
  name: "buildingManagement",
  initialState,
  reducers: {
    setbuildingList: (state, action) => {
      state.selectOptions.buildingList = action.payload;
    },
  },
});

// export const { setOnChangeFormField, setUser } = createSocietyModeratorForm.actions;

export default buildingManagement.reducer;
