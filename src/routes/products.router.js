import { Router } from "express";
import productsController from "../controllers/products.controller.js"
import checktoken from "../middlewares/checkToken.js";
import validation from "../middlewares/validation.js";


const router = Router()

router.get('/products', productsController.GET)
router.get('/products/:product_id', productsController.GET)
router.put('/admin/products/:product_id',checktoken, validation, productsController.PUT)
router.delete('/admin/products/:product_id',checktoken, validation, productsController.DELETE)
router.post('/admin/products',checktoken, validation, productsController.POST)

export default router