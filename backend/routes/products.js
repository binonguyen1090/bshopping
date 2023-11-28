

import express from 'express'
import { getProducts , newProduct, getProductDetail, updateProduct,deleteProduct} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
const router = express.Router();


router.route("/products").get(isAuthenticatedUser, authorizeRoles("admin"), getProducts);
router.route("/admin/products").post(newProduct);

router.route("/products/:id").get(getProductDetail);

router.route("/admin/products/:id").put(updateProduct);
router.route("/admin/products/:id").delete(deleteProduct);

export default router;