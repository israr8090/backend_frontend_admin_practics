import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpecialLoadingButton from './SpecialLoadingButton';
import {
  clearAllEmployeeErrors,
  deleteEmployee,
  getAllEmployees,
  resetEmployeeSlice
} from '../store/slices/employeeSlice';
import Home from './Home';

const GetAllEmployee = () => {

  const dispatch = useDispatch();  //--
  const { loading, message, error, employees } = useSelector(state => state.employeesList);  //--

  //--Handleing Delete Employee
  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));  //--
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  //--UseEffect
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllEmployeeErrors());
    }

    dispatch(getAllEmployees());  //--
    dispatch(resetEmployeeSlice());
  }, [dispatch, error, message]);


  return (
    <>
      <div>
        <Home />
      </div>

      {loading
        ? <SpecialLoadingButton text='Loading...' />
        : <div>
          <h1 className='bg-yellow-300 text-lg pl-1'>Employee List</h1>

          <div className=' float-right mr-2 mt-2'>
            <div className='flex'>
              <h2 className='mr-5'>Total Count: {employees.length}</h2>
              <Link to="/employee/create" className='bg-blue-500 hover:bg-blue-700 text-white px-8 rounded'>
                Create Employee
              </Link>
            </div>
          </div>

          <div className='flex mt-7 mb-2 float-right w-72 mr-10'>
            <p className='mr-2 '>Search</p>
            <input
              type="text"
              placeholder='Enter Employee Name'
              className='bg-white w-full border-black border rounded-sm placeholder:text-center outline-none pl-2'
            // value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch} 
            />
          </div>

          {/* ------------------- */}
          <div>
            <table className='table-auto w-full '>
              <thead className='bg-cyan-300'>
                <tr>
                  <th className='text-start'>Unique Id</th>
                  <th className='text-start'>Image</th>
                  <th className='text-start'>Name</th>
                  <th className='text-start'>Email</th>
                  <th className='text-start'>Mobile No</th>
                  <th className='text-start'>Designation</th>
                  <th className='text-start'>Gender</th>
                  <th className='text-start'>Course</th>
                  <th className='text-start'>Create date</th>
                  <th className='text-start'>Action</th>
                </tr>
              </thead>

              <tbody>
                {
                  employees && employees.length > 0
                    ? (
                      employees.map((employee, index) => {
                        return (
                          <tr key={employee._id}>
                            <td className='pl-5'>{index + 1}</td>
                            <td className='text-start'>
                              {loading ? <SpecialLoadingButton content={'loading...'} /> : (
                                <img
                                  src={
                                    employee.avatar &&
                                    employee.avatar.url
                                  }
                                  height={70}
                                  width={70}
                                  className='rounded-md'
                                  alt='Employee'
                                />
                              )}
                            </td>
                            <td className='text-start'>{employee.fullName}</td>
                            <td className='text-start'>{employee.email}</td>
                            <td className='text-start'>{employee.phone}</td>
                            <td className='text-start'>{employee.designation}</td>
                            <td className='text-start'>{employee.gender}</td>
                            <td className='text-start'>{employee.course}</td>
                            {/* <td className='text-start'>{employee.createdDate}</td> */}
                            <td className='text-start'>{formatDate(employee.createdDate)}</td>
                            <td className='text-start'>
                              <Link to={`/employee/update/${employee._id}`} className='text-blue-500 hover:text-blue-700'>Edit</Link> |
                              {
                                loading
                                  ? <SpecialLoadingButton content={"Deleting.."} width={'w=52'} />
                                  : (
                                    <button
                                      className='text-red-500 hover:text-red-700 ml-1'
                                      onClick={() => handleDeleteEmployee(employee._id)}
                                    >
                                      Delete
                                    </button>
                                  )
                              }
                            </td>
                          </tr>
                        )
                      })
                    )
                    : (
                      <tr>
                        <td colSpan='10' className='text-center'>No Employee Found</td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
}

export default GetAllEmployee;