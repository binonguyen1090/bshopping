

import express from 'express'
import { getProducts , newProduct, getProductDetail, updateProduct,deleteProduct} from '../controllers/productController.js';

const router = express.Router();


router.route("/products").get(getProducts);
router.route("/admin/products").get(newProduct);
router.route("/products/:id").get(getProductDetail);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);

export default router;