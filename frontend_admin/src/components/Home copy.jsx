import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/userSlice';
import GetAllEmployee from './GetAllEmployee';
import Dashboard from './Dashboard';import CreateEmployee from './CreateEmployee';

const Home = () => {

  const dispatch = useDispatch();  //--
  const navigateTo = useNavigate();  //--

  const [active, setActive] = useState("Dashboard");

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
            <Link onClick={() => setActive("Dashboard")}>Home</Link>
            <Link onClick={() => setActive("EmployeeList")}>Employee List</Link>                     
          </div>
          {
            user ? <button onClick={handleLogout}>{user.fullName}-Logout</button> : "lof"
          }
        </div>

        {/* --------------------------- */}
        <div>
          {/* -------------------OR--------------------------- */}
          {(() => {
            switch (active) {
              case "Dashboard":
                return <Dashboard />
                break;
              case "EmployeeList":
                return <GetAllEmployee />
                break;                                                        
              default:
                return <Home />
            }
          })()}
          {/* ---------------------------------------------- */}         
        </div>

        {}
      </div>
    </>
  )
}

export default Home;