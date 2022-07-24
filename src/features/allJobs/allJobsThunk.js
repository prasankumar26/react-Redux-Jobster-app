import customFetch, {checkForUnauthorizedResponse} from "../../utils/axios";


// get all jobs 
export const getAllJobsThunk = async(_, thunkAPI) =>{
    const {page, sort, searchType, searchStatus, search} = thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if(search){
      url = url + `&search=${search}`
    }
    try {
      const resp = await customFetch(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        }
      })
      return resp.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI );
    }
  }


// show stats 
  export const showStatsThunk = async(_, thunkAPI) =>{
    try {
      const resp = await customFetch('/jobs/stats', {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        }
      })
      return resp.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI );
    }
  }