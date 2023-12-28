

import express from 'express'
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { newOrder,getOrderDetail,myOrder,getAllOrder,updateOrder,deleteOrder} from '../controllers/orderController.js';

const router = express.Router();


router.route("/orders/new").post(isAuthenticatedUser,newOrder);
router.route("/orders/:id").get(isAuthenticatedUser,getOrderDetail);

router.route("/me/orders").get(isAuthenticatedUser, myOrder);

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrder);
router.route("/admin/orders/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder);
router.route("/admin/orders/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

export default router;