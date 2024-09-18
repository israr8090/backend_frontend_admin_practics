import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import GetAllEmployee from './components/GetAllEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { getUser } from './store/slices/userSlice';
import { getAllEmployees } from './store/slices/employeeSlice';


const App = () => {

  const dispatch = useDispatch();

  //--useEffect
  useEffect(() => {
    dispatch(getUser()); //--
    dispatch(getAllEmployees); //--
  }, []);

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>

        <div className='mt-9 h-[94vh]'>
          <Router>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/employee/create" element={<CreateEmployee />} />
              <Route path="/employee/getall" element={<GetAllEmployee />} />
              <Route path="/employee/update/:id" element={<UpdateEmployee />} />
            </Routes>
            <ToastContainer position='bottom-right' theme='dark' autoClose={3000} />
          </Router>
        </div>
      </div>


    </>
  )
}

export default App;