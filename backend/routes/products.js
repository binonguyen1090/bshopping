

import express from 'express'
import { getProducts , newProduct, getProductDetail, 
    updateProduct,deleteProduct,
    createProductReview,getAllReviews,deleteProductReview} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
const router = express.Router();


router.route("/products").get(getProducts);
router
    .route("/admin/products")
    .post(isAuthenticatedUser, authorizeRoles("admin"),newProduct);

router.route("/products/:id").get(getProductDetail);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct);


router.route("/reviews").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(isAuthenticatedUser,getAllReviews);
router.route("/admin/reviews").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProductReview);


export default router;