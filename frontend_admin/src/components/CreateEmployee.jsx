import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import upload_area from '../assets/upload_area.png'
import Home from './Home';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllEmployeeErrors, createEmployee, getAllEmployees, resetEmployeeSlice } from '../store/slices/employeeSlice';
import SpecialLoadingButton from './SpecialLoadingButton';

function CreateEmplyee() {

  const dispatch = useDispatch();  //--
  const { loading, message, error } = useSelector(state => state.employeesList);  //--

  ////--useState
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    course: '',  // Only one course can be selected
    avatar: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        course: checked ? name : '',
      });
    } else if (type === 'file') {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        avatar: file,
      });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? "" : "* Name is required.";
    tempErrors.email = formData.email ? (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email) ? "" : "* Email is not valid.") : "Email is required.";
    tempErrors.phone = formData.phone ? (/^\d{10}$/.test(formData.phone) ? "" : "Mobile number must be exactly 10 digits.") : "Mobile number is required.";
    tempErrors.designation = formData.designation ? "" : "* required.";
    tempErrors.gender = formData.gender ? "" : "* required.";
    tempErrors.course = formData.course ? "" : "* At least one course must be selected.";
    tempErrors.avatar = formData.avatar ? "" : "* Image is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  //--
  const handleKeyDown = (event) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (!/^[0-9]*$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('course', formData.course);

        if (formData.avatar) {
          formDataToSend.append('avatar', formData.avatar);
        }
        
        dispatch(createEmployee(formDataToSend));  //--
        toast.success(message); 

      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('Error submitting form. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);      
      dispatch(clearAllEmployeeErrors());
    }
    if (message) {
          
      dispatch(resetEmployeeSlice());
      dispatch(getAllEmployees());

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        gender: '',
        course: '',
        avatar: null,
        previewUrl: null,
      })
    }
  }, [dispatch, error, message]);



  return (
    <>
      <div>
        <Home />
      </div>
      {/* ----------------------------------- */}
      <div>
        <h1 className='bg-yellow-300 text-lg pl-1'>Create Employee</h1>

        <div className=' flex justify-center m-auto mt-5 w-5/6 height-creat-employee'>
          <form onSubmit={handleSubmit} className='w-5/6'>

            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Name:
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className='outline-none border rounded pl-2 py-1 w-2/3 ml-2'
                />
                <div className='text-sm text-red-500 ml-2'>{errors.fullName}</div>
              </label>
            </div>

            <div className='mt-5'>
              <label className='flex w-full items-center'>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className='outline-none border rounded pl-2 py-1 w-2/3 ml-2'
                />
                <div className='text-sm text-red-500 ml-2'>{errors.email}</div>
              </label>
            </div>

            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Contect No.:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className='outline-none border rounded pl-2 py-1 w-2/3 ml-2'
                />
                <div className='text-sm text-red-500 ml-2'>{errors.phone}</div>
              </label>
            </div>

            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Designation:
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
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

            <div className='mt-5'>
              <label className='flex items-center w-full'>
                Gender:
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
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
                    checked={formData.gender === 'female'}
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
                    checked={formData.gender === 'other'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  Other
                </label>
                <div className='text-sm text-red-500 ml-2'>{errors.gender}</div>
              </label>
            </div>

            <div className='mt-5'>
              <label className='flex items-center'>
                Courses:
                <label>
                  <input
                    type="checkbox"
                    name="MCA"
                    checked={formData.course === 'MCA'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  MCA
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="BSC"
                    checked={formData.course === 'BSC'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  BSC
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="BSc"
                    checked={formData.course === 'BSc'}
                    onChange={handleChange}
                    className='ml-2 mr-1'
                  />
                  BSc
                </label>
                <div className='text-sm text-red-500 ml-2'>{errors.course}</div>
              </label>
            </div>

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

            <div className="text-green-500 text-sm mb-2 mt-5">{submitStatus}</div>

           {/* Button Submit */}
            {
              loading
                ? <SpecialLoadingButton content={"Submitting..."} />
                : <button
                  type="submit"
                  className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-md 
                  shadow hover:bg-blue-600 focus:outline-none focus:ring-2
                  focus:ring-blue-400 focus:ring-opacity-75 transition 
                 duration-150"
                >
                  Submit
                </button>
            }

          </form>
        </div >

      </div >
    </>
  )
}

export default CreateEmplyee;