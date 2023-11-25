

import express from 'express'
import { getProducts , newProduct, getProductDetail} from '../controllers/productController.js';

const router = express.Router();


router.route("/products").get(getProducts);
router.route("/admin/products").get(newProduct);
router.route("/products/:id").get(getProductDetail);

export default router;