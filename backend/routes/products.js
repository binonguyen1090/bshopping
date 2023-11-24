

import express from 'express'
import { getProducts , newProduct} from '../controllers/productController.js';

const router = express.Router();


router.route("/products").get(getProducts);
router.route("/admin/products").get(newProduct);

export default router;