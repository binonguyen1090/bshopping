

import express from 'express'
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { newOrder } from '../controllers/orderController.js';

const router = express.Router();


router.route("/orders/new").post(isAuthenticatedUser,newOrder);


export default router;