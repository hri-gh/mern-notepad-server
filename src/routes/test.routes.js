import { Router } from "express";
import { testFunction } from "../controllers/test.controller.js";
import { testPost } from "../controllers/test.controller.js";


const router = Router()


router.route('/test').get(testFunction)
router.route('/test').post(testPost)



export default router
