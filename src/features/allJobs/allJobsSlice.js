import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';



const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};


// get all jobs 
export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)


// showstats 
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)



// initialstate 
const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
   showLoading: (state) =>{
    state.isLoading = true;
   },
   hideLoading: (state) =>{
    state.isLoading = false;
   },
   handleChange: (state, {payload: {name,value}}) =>{
    state.page = 1
    state[name] = value;
   },
   clearFilters: (state) =>{
    return {...state, ...initialFiltersState}
   },
   changePage: (state, {payload}) =>{
    state.page = payload
    // console.log(payload);
   },
   clearAllJobsState: (state) => initialState
  },


  extraReducers:{
    // getalljobs 
    [getAllJobs.pending]: (state) =>{
      state.isLoading = true
    },
    [getAllJobs.fulfilled]: (state,{payload})=>{
      state.isLoading = false
      state.jobs = payload.jobs
      state.numOfPages = payload.numOfPages
      state.totalJobs = payload.totalJobs
    //  console.log(payload.jobs);
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // showstats 
    [showStats.pending]: (state) =>{
      state.isLoading = true
    },
    [showStats.fulfilled]: (state, {payload}) =>{
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
      // console.log(payload);
    },
    [showStats.rejected]: (state, {payload}) =>{
      state.isLoading = false
      toast.error(payload)
    },
  }
});

export const {showLoading,hideLoading,handleChange,clearFilters,changePage,clearAllJobsState}  = allJobsSlice.actions

export default allJobsSlice.reducer;