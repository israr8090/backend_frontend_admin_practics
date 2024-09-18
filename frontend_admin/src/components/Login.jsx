import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors, loginUser } from '../store/slices/userSlice';
import SpecialLoadingButton from './SpecialLoadingButton';
import { toast } from "react-toastify";

function Login() {

  const navigateTO = useNavigate();  //--
  const dispatch = useDispatch();  //--

  const [userName, setUserName] = useState(""); //--
  const [password, setPassword] = useState(""); //--

  const { loading, isAuthenticated, error } = useSelector(state => state.user);

  //--
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(userName, password)
    dispatch(loginUser(userName, password));
  };

  //--
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTO('/');
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div>
        <h2 className=' bg-yellow-400 pl-1 font-bold'>Login</h2>
        <div className='flex items-center m-auto mt-10 w-3/6 justify-center '>
          <form onSubmit={handleLogin} className='flex flex-col items-center'>

            <div className='pt-5'>
              <label className='font-bold mr-3'>Username:</label>
              <input
                type="text"
                required
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='border rounded-sm border-black'
              />
            </div>

            <div className='pt-5'>
              <label className='font-bold mr-3'>Password:</label>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border rounded-sm border-black'
              />
            </div>

            {loading ? (<SpecialLoadingButton content={"Logging In..."} />) :
              (<button type="submit" className="my-5 bg-green-500 w-72 rounded-md">
                Login
              </button>)
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;