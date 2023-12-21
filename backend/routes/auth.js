

import express from 'express'
import {  getUserProfile,forgotPassword, loginUser, logoutUser, 
    registerUser, resetPassword, updatePassword,updateProfile,
    getAllUsers,getUserDetails,updateUserProfile,deleteUserProfile, uploadAvatar} from '../controllers/authController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.route("/profile").get( isAuthenticatedUser,getUserProfile);
router.route("/profile/update").put( isAuthenticatedUser,updateProfile);
router.route("/me/upload_avatar").put( isAuthenticatedUser,uploadAvatar);


router.route("/admin/users").get( isAuthenticatedUser, authorizeRoles("admin") ,getAllUsers);
router.route("/admin/users/:id").get( isAuthenticatedUser,authorizeRoles("admin"),getUserDetails);
router.route("/admin/users/:id").put( isAuthenticatedUser,authorizeRoles("admin"),updateUserProfile);
router.route("/admin/users/:id").delete( isAuthenticatedUser,authorizeRoles("admin"),deleteUserProfile);

export default router;