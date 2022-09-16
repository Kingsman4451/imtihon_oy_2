import { Router } from "express";
import adminController from "../controllers/admin.controller.js"
import validation from "../middlewares/validation.js";
import checktoken from "../middlewares/checkToken.js";



const router = Router()

router.post('/login', validation, adminController.LOGIN)

export default router