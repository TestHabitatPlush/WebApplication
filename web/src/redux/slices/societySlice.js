import { createSlice } from '@reduxjs/toolkit';

const societySlice = createSlice({
  name: 'society',
  initialState: {
    data: [],
    page: 0,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    columns: [
      { Header: 'ID', accessor: 'customerId' },
      { Header: 'Name', accessor: 'customerName' },
      { Header: 'Type', accessor: 'customerType' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Established Year', accessor: 'establishedYear' },
      { Header: 'Society Type', accessor: 'societyType' },
      { Header: 'Actions', accessor: 'actions' },
    ],
    filters: { 
      name: '',
      type: '',
      email: '',
      societyType: ''
    },
    selectedSociety: null,   // ✅ NEW: holds selected society object
    status: 'idle',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateData: (state, action) => {
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.total = action.payload.total;
    },
    setSocietyLists: (state, action) => {
      state.data = action.payload;
    },
    setSelectedSociety: (state, action) => {
      state.selectedSociety = action.payload; // ✅ new action
    },
    clearSelectedSociety: (state) => {
      state.selectedSociety = null;
    }
  },
});

export const {
  setPage,
  setPageSize,
  setFilters,
  updateData,
  setSocietyLists,
  setSelectedSociety,      // ✅ export new actions
  clearSelectedSociety,
} = societySlice.actions;

export default societySlice.reducer;
