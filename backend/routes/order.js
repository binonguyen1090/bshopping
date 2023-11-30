

import express from 'express'
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { newOrder,getOrderDetail,myOrder } from '../controllers/orderController.js';

const router = express.Router();


router.route("/orders/new").post(isAuthenticatedUser,newOrder);
router.route("/orders/:id").get(isAuthenticatedUser,getOrderDetail);
router.route("/user/orders").get(isAuthenticatedUser,myOrder);


export default router;