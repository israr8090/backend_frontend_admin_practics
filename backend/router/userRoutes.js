import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {registerUser, logInUser, logOutUser, getUserProfile} from '../controllers/userController.js';

const router = express.Router();  //--

//--Define routes here
router.post('/register', registerUser);
router.post('/login', logInUser);
router.get('/me', isAuthenticated, getUserProfile);
router.get('/logout', isAuthenticated, logOutUser);

//--Export the router
export default router;