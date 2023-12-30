

import express from 'express'
import { getProducts , newProduct, getProductDetail, 
    updateProduct,deleteProduct,
    createProductReview,getAllReviews,deleteProductReview, canUserReview, getAdminProducts} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
const router = express.Router();


router.route("/products").get(getProducts);
router
    .route("/admin/products")
    .post(isAuthenticatedUser, authorizeRoles("admin"),newProduct)
    .get(isAuthenticatedUser, authorizeRoles("admin"),getAdminProducts);

router.route("/products/:id").get(getProductDetail);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct);


router.route("/reviews").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(isAuthenticatedUser,getAllReviews);
router.route("/admin/reviews").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProductReview);
router.route("/can_review").get(isAuthenticatedUser, canUserReview);


export default router;