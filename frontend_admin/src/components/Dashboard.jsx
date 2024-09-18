import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Home from './Home';

const Dashboard = () => {

  const dispatch = useDispatch();  //--
  const navigateTo = useNavigate();  //--

  //--
  useEffect(() => {

  }, []);

  return (
    <>
      <div>
        <Home />
      </div>
      
      <div>
        <h1 className='bg-yellow-300 text-lg pl-1'>Deshboard</h1>
        <div className='flex justify-center items-center mt-20 text-xl'>
          <h2>Welcome Admin Panel</h2>
        </div>
      </div>
    </>
  )
}

export default Dashboard;