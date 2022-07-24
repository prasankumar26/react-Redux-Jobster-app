import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';


const JobsContainer = () => {

    const { jobs, isLoading, page, sort, searchType, searchStatus, search, totalJobs, numOfPages } = useSelector((store) => store.allJobs);
  
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllJobs())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, sort, searchType, searchStatus, search])

   
    if(isLoading){
       return <Loading center />
    }

    if(jobs.length === 0){
        return <Wrapper>
        <h2>No Jobs to Display...</h2>
      </Wrapper>
    }

  return (
    <Wrapper>
    <h5>{totalJobs} job{jobs.length > 1 &&  `'s`} found</h5>
    <div className='jobs'>
      {jobs.map((job) => {
        return <Job key={job._id} {...job} />;
      })}
    </div>
    {numOfPages > 1 && <PageBtnContainer />}
  </Wrapper>
  )
}

export default JobsContainer