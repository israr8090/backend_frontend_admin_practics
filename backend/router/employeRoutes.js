import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
} from '../controllers/employeController.js';

const router = express.Router();  //--

//--Define routes here
router.post('/create', isAuthenticated, createEmployee);
router.get('/getall', isAuthenticated, getAllEmployees);
router.get('/getsingle/:id', isAuthenticated, getSingleEmployee);
router.put('/update/:id', isAuthenticated, updateEmployee);
router.delete('/delete/:id', isAuthenticated, deleteEmployee);

//--Export the router
export default router;