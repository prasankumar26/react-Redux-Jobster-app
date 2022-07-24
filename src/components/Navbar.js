import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, clearStore } from '../features/user/userSlice';

const Navbar = () => {

    const [showLogOut, setShowLogOut] = useState(false)

    const {user, isSidebarOpen} = useSelector((stote) => stote.user)
    const dispatch = useDispatch()

    // console.log(isSidebarOpen);

    const toggle = () =>{
        dispatch(toggleSidebar())
    }


  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={()=>setShowLogOut(!showLogOut)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogOut ? 'dropdown show-dropdown' : 'dropdown' } >
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => dispatch(clearStore('Logging Out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar