import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//--employeeSlice
const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        loading: false,
        employees: [],
        employee: {},
        isAuthenticated: false,
        message: null,
        isUpdated: false,
        error: null,
    },

    //--Reducers
    reducers: {
        //--Create New Employee
        createEmployeeRequest:(state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.employee = {};
            state.error = null;
        },
        createEmployeeSuccess:(state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.employee = action.payload;
            state.message = action.payload;
            state.error = null;
        },
        createEmployeeFailed:(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.employee = {};
            state.message = null;
            state.error = action.payload;
        },

        //--Get All Employees
        getAllEmployeesRequest:(state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.employees = [];
            state.error = null;
        },
        getAllEmployeesSuccess:(state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.employees = action.payload;
            state.error = null;
        },
        getAllEmployeesFailed:(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.employees = [];
            state.message = null;
            state.error = action.payload;
        },

        //--Get Single Employee
        getSingleEmployeeRequest:(state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.employee = {};
            state.error = null;
        },
        getSingleEmployeeSuccess:(state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.employee = action.payload;
            state.error = null;
        },
        getSingleEmployeeFailed:(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.employee = {};
            state.message = null;
            state.error = action.payload;
        },

        //--Update Employee
        updateEmployeeRequest:(state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.employee = {};
            state.isUpdated = false;
            state.error = null;
        },
        updateEmployeeSuccess:(state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.employee = action.payload;
            state.message = action.payload;
            state.isUpdated = true;
            state.error = null;
        },
        updateEmployeeFailed:(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.employee = {};
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        //--update Employye Reset After Update
        updateEmployeeResetAfterUpdate:(state, action) => {
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },

        //--Delete Employee
        deleteEmployeeRequest:(state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.employee = {};
            state.error = null;
        },
        deleteEmployeeSuccess:(state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
            state.error = null;
        },
        deleteEmployeeFailed:(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.employee = {};
            state.message = null;
            state.error = action.payload;
        },

        //--Reset Employee
        resetEmployee:(state, action) => {
            state.loading = false;
            state.employees = state.employees;
            state.message = null;
            state.error = null;
        },

        //--Clear All Errors
        clearAllErrors:(state, action) => {
            state.error = null;
            state.employee = state.employee
        },
    }
});

//----------Actions-------------
//--Create New Employee--
export const  createEmployee = (newEmployeeData) => async (dispatch) => {

    console.log("New Employee: " +newEmployeeData)
    
    dispatch(employeeSlice.actions.createEmployeeRequest());

    try {
        const data = await axios.post(
            "http://localhost:4000/api/employe/create",
            newEmployeeData,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        )
        
        console.log(data)

        dispatch(employeeSlice.actions.createEmployeeSuccess(data.data.message));
        dispatch(employeeSlice.actions.clearAllErrors());
        
    } catch (error) {
        dispatch(employeeSlice.actions.createEmployeeFailed(error.response.data.message));        
    }
};

//--Get All Employees--
export const getAllEmployees = () => async (dispatch) => {
    dispatch(employeeSlice.actions.getAllEmployeesRequest())

    try {
        const {data} = await axios.get(
            "http://localhost:4000/api/employe/getall",
            { withCredentials: true}
        )
        // console.log(data)
        
        dispatch(employeeSlice.actions.getAllEmployeesSuccess(data.employees));
        dispatch(employeeSlice.actions.clearAllErrors());
        
    } catch (error) {
        console.log(error)
        dispatch(employeeSlice.actions.getAllEmployeesFailed(error.response.data.message));
        
    }
};

//--Get Single Employee--
export const getSingleEmployee = (id) => async (dispatch) => {
    dispatch(employeeSlice.actions.getSingleEmployeeRequest());

    try {
        const data = await axios.get(
           `http://localhost:4000/api/employe/getsingle/${id}`,
            { withCredentials: true}
        )
        console.log(data)

        dispatch(employeeSlice.actions.getSingleEmployeeSuccess(data.employee));
        dispatch(employeeSlice.actions.clearAllErrors());
        
    } catch (error) {
        dispatch(employeeSlice.actions.getSingleEmployeeFailed(error.response.data.message));
    }
};

//--Update Employee--
export const updateEmployee = (id, updatedEmployeeData) => async (dispatch) => {
    dispatch(employeeSlice.actions.updateEmployeeRequest());

    // console.log(updatedEmployeeData)
    try {
        const data = await axios.put(
            `http://localhost:4000/api/employe/update/${id}`,
            updatedEmployeeData,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        )

        console.log(data)

        dispatch(employeeSlice.actions.updateEmployeeSuccess(data.data.employee));
        dispatch(employeeSlice.actions.updateEmployeeResetAfterUpdate());
        
    } catch (error) {
        dispatch(employeeSlice.actions.updateEmployeeFailed(error.response.data.message));
    }
};

//--Delete Employee--
export const deleteEmployee = (id) => async (dispatch) => {
    dispatch(employeeSlice.actions.deleteEmployeeRequest());

    try {
        const data = await axios.delete(
            `http://localhost:4000/api/employe/delete/${id}`,
            { withCredentials: true}
        )
        // console.log(data)

        dispatch(employeeSlice.actions.deleteEmployeeSuccess(data.data.message));
        dispatch(employeeSlice.actions.clearAllErrors());
        
    } catch (error) {
        dispatch(employeeSlice.actions.deleteEmployeeFailed(error.response.data.message));
    }
};

//--Clear All Employee Errors--
export const clearAllEmployeeErrors = () => async (dispatch) => {
    dispatch(employeeSlice.actions.clearAllErrors());
};

//--Reset Employee Slice--
export const resetEmployeeSlice = () => (dispatch) => {
    dispatch(employeeSlice.actions.clearAllErrors());
};

//----------Export-------------
export default employeeSlice.reducer;