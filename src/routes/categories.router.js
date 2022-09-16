import { Router } from "express";
import categoryController from "../controllers/categories.controller.js"
import checktoken from "../middlewares/checkToken.js";
import validation from "../middlewares/validation.js";


const router = Router()

router.get('/categories', categoryController.GET)
router.get('/categories/:category_id', categoryController.GET)
router.put('/admin/categories/:category_id',checktoken, validation, categoryController.PUT)
router.delete('/admin/categories/:category_id',checktoken, validation, categoryController.DELETE)
router.post('/admin/categories',checktoken, validation, categoryController.POST)



export default router