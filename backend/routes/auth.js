

import express from 'express'
import {  getUserProfile,forgotPassword, loginUser, logoutUser, registerUser, resetPassword, updatePassword } from '../controllers/authController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.route("/profile").get( isAuthenticatedUser,getUserProfile);


export default router;