import { useState, useEffect } from 'react';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import {useNavigate} from 'react-router-dom'

import { toast } from 'react-toastify';

// redux userslice 
import {useDispatch, useSelector} from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {

  // if user is ther navigate to dashboard page
  const navigate = useNavigate()

  // local state values 
  const [values, setValues] = useState(initialState)
  
  // redux slice 
  const {user, isLoading} =  useSelector(store => store.user)
  const dispatch = useDispatch()

  
  // toggle button 
  const toggleMember = () =>{
    setValues({...values, isMember: !values.isMember})
  }

  // input handlechange 
  const handleChange = (e) =>{
   const name = e.target.name
   const value = e.target.value
  //  console.log(`${name}: ${value}`);
   setValues({...values, [name]:value})
  }

  // submit form 
  const onSubmit = (e) =>{ 
   e.preventDefault()
   const { name, email, password, isMember } = values;
  if (!email || !password || (!isMember && !name)) {
    // console.log('Please Fill Out All Fields');
    toast.error("Please Fill Out All Fields")
    return;
  }
  //  login user 
   if(isMember){
    dispatch(loginUser({email:email, password:password}))
    return;
   }
  //  register user 
   dispatch(registerUser({name,email,password }))
  }
  
  // if user is ther navigate to dashboard page 
  useEffect(() =>{
    if(user){
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3> {values.isMember ? 'Login' : 'Register' } </h3>

        {/* name field */}
        <div className='form-row'>
          
         {
          !values.isMember && (
            <FormRow 
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
          )
         }

       <FormRow 
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

         <FormRow 
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        </div>

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'Submit'}
        </button>

          {/* test user  */}
          <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }));
          }}
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>
        

        
        <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}

      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
        </p>

      </form>
    </Wrapper>
  )
}

export default Register