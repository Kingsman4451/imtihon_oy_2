import { Router } from "express";
import subCategoryController from "../controllers/subCategories.controller.js"
import checktoken from "../middlewares/checkToken.js";
import validation from "../middlewares/validation.js";


const router = Router()

router.get('/subcategories', subCategoryController.GET)
router.get('/subcategories/:sub_category_id', subCategoryController.GET)
router.put('/admin/subcategories/:sub_category_id',checktoken, validation, subCategoryController.PUT)
router.delete('/admin/subcategories/:sub_category_id',checktoken, validation, subCategoryController.DELETE)
router.post('/admin/subcategories',checktoken, validation, subCategoryController.POST)

export default router