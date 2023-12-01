

import express from 'express'
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { newOrder,getOrderDetail,myOrder,getAllOrder,updateOrder} from '../controllers/orderController.js';

const router = express.Router();


router.route("/orders/new").post(isAuthenticatedUser,newOrder);
router.route("/orders/:id").get(isAuthenticatedUser,getOrderDetail);

router.route("/user/orders").get(isAuthenticatedUser,myOrder);

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrder);
router.route("/admin/orders/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder);

export default router;