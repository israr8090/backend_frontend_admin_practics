import React, { useState } from 'react';
import upload_area from '../assets/upload_area.png';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { useParams } from 'react-router-dom';
import { getAllEmployees, getSingleEmployee, updateEmployee } from '../store/slices/employeeSlice';
import { useEffect } from 'react';
import axios from 'axios';
import SpecialLoadingButton from './SpecialLoadingButton';

const UpdateEmployee = () => {

  const { id } = useParams();  //--
  const dispatch = useDispatch();  //--
  const { loading, message, error, isUpdated, employee } = useSelector(state => state.employeesList);  //--



  ////--useState
  const [fullName, setFullName] = useState(employee && employee.fullName);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [designation, setDesignation] = useState();
  const [gender, setGender] = useState();
  const [course, setCourse] = useState();
  const [avatar, setAvatar] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const [updatedStatus, setUpdatedStatus] = useState('');
  const [errors, setErrors] = useState({});

  //--handling input fields changes--
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {

      setCourse(checked ? name : '');

    } else if (type === 'file') {

      const file = e.target.files[0];
      setAvatar(file);

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);

      } else {
        setPreviewUrl(null);
      }
    }
    else {
      setGender(value);
    }
  };

  //--handling form validation--
  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = fullName ? "" : "* Name is required.";
    tempErrors.email = email ? (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? "" : "* Email is not valid.") : "* Email is required.";
    tempErrors.phone = phone ? (/^\d{10}$/.test(phone) ? "" : "* Mobile number must be exactly 10 digits.") : "* Mobile number is required.";
    tempErrors.designation = designation ? "" : "* required.";
    tempErrors.gender = gender ? "" : "* required.";
    tempErrors.course = course ? "" : "* At least one course must be selected.";
    tempErrors.avatar = avatar ? "" : "* Image is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  //--handling key Down--
  const handleKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (!/^[0-9]*$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

  };

  //--handling On Form Submitting--
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);
        formData.append('avatar', avatar);

        dispatch(updateEmployee(id, formData));

        setUpdatedStatus('Employee Updated successfully!');

      } catch (error) {
        console.error('Error Updating Employee:', error);
        setUpdatedStatus('Error Updating Employee. Please try again.');

      }
    }
  };

  useEffect(() => {
    //--getting Employee--
    const getEmployee = async () => {
      await axios.get(
        `http://localhost:4000/api/employe/getsingle/${id}`,
        { withCredentials: true }
      ).then((res) => {
        // console.log(res.data)
        setFullName(res.data.employee.fullName);
        setEmail(res.data.employee.email);
        setPhone(res.data.employee.phone);
        setDesignation(res.data.employee.designation);
        setGender(res.data.employee.gender);
        setCourse(res.data.employee.course);
        setAvatar(res.data.employee.avatar && res.data.employee.avatar.url);
        setPreviewUrl(res.data.employee.avatar && res.data.employee.avatar.url);
      }).catch(error => {
        console.error('Error fetching employee:', error);
        toast.error('Error fetching employee. Please try again.');
      })
    };
    getEmployee();

    //--handling error and success messages--
    if (error) {
      toast.error(error);
      dispatch(clearAllEmployeeErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetEmployeeSlice());
      dispatch(getAllEmployees());
    }

  }, [id, error, message, dispatch]);

  return (
    <>
      <div>
        <Home />
      </div>
      {/* ----------------------------------- */}
      <div>
        <h1 className='bg-yellow-300 text-lg pl-1'>Update Employee</h1>

        <div className=' flex justify-center m-auto mt-5 w-5/6 height-creat-employee'>
          <form onSubmit={handleSubmit} className='w-5/6'>
            {/* Fullname */}
            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Name:
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='outline-none border rounded pl-2 py-1 w-2/3 ml-2'
                />
                <div className='text-sm text-red-500 ml-2'>{errors.fullName}</div>
              </label>
            </div>

            {/* Email */}
            <div className='mt-5'>
              <label className='flex w-full items-center'>
                Email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='outline-none border rounded pl-2 py-1 w-2/3 ml-2'
                />
                <div className='text-sm text-red-500 ml-2'>{errors.email}</div>
              </label>
            </div>

            {/* Phone */}
            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Contect No.:
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='outline-none border rounded pl-2 py-1 w-2/3 ml-2'
                />
                <div className='text-sm text-red-500 ml-2'>{errors.phone}</div>
              </label>
            </div>

            {/* Designation */}
            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Designation:
                <select
                  name="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className='border w-2/2 rounded outline-none ml-2 px-1'
                >
                  <option value="">Select Designation</option>
                  <option value="hr">HR</option>
                  <option value="sales">Sales</option>
                  <option value="manager">Manager</option>
                </select>
                <div className='text-sm text-red-500 ml-2'>{errors.designation}</div>
              </label>
            </div>

            {/* Gender */}
            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Gender:
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  Female
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  Other
                </label>
                <div className='text-sm text-red-500 ml-2'>{errors.gender}</div>
              </label>
            </div>

            {/* Courses */}
            <div className='mt-5'>
              <label className='flex items-center'>
                Courses:
                <label>
                  <input
                    type="checkbox"
                    name="MCA"
                    checked={course === 'MCA'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  MCA
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="BSC"
                    checked={course === 'BSC'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  BSC
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="BSc"
                    checked={course === 'BSc'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  BSc
                </label>
                <div className='text-sm text-red-500 ml-2'>{errors.course}</div>
              </label>
            </div>

            {/* Upload Image */}
            <div className='mt-2'>
              <label className='flex items-center justify-between mt-3 w-64 '>
                Upload Image:
                <img src={previewUrl ? previewUrl : upload_area} height={90} width={110} alt="avatar"
                  className='rounded-md ml-2 ' />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  hidden    
                />
                <div className='text-sm text-red-500 ml-2'>{errors.avatar}</div>
              </label>
            </div>


            {/* form update status */}
            <div className="text-green-500 text-sm mb-2 mt-5">{updatedStatus}</div>

            {/* Button Update */}
            {
              loading
                ? <SpecialLoadingButton content={"Updating..."} />
                : <button
                  type="submit"
                  className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-md 
                  shadow hover:bg-blue-600 focus:outline-none focus:ring-2
                  focus:ring-blue-400 focus:ring-opacity-75 transition 
                 duration-150"
                >
                  Update
                </button>
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateEmployee;