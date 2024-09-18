import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/userSlice';

const Home = () => {

  const dispatch = useDispatch();  //--
  const navigateTo = useNavigate();  //--

  const { isAuthenticated, error, user } = useSelector(state => state.user); //--

  //--Handle Logout User
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("User Logged Out!")
    navigateTo("/login");
  };

  //--
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <div className='flex justify-between px-10 bg-teal-200 border border-black'>
          <div className='w-1/4 flex justify-between ml-10 sticky'>
            <Link to={'/'}>Home</Link>
            <Link to={'/employee/getall'}>Employee List</Link>                     
          </div>
          {
            user && user.fullName ? <button onClick={handleLogout}>{user.fullName}-Logout</button> : "User LogedOut"
          }
        </div>
      </div>
    </>
  )
}

export default Home;