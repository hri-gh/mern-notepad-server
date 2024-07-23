import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { RegisterSchema, LoginSchema } from "../validators/user.validator.js";

import {
    registerUser,
    loginUser,
    changeCurrentPassword,
    logoutUser,
    refreshAccessToken,
    updateAccountDetails
} from "../controllers/user.controller.js";

const router = Router()



router.route('/register').post(validate(RegisterSchema), registerUser)
router.route('/login').post(validate(LoginSchema), loginUser)

// *------------------*
// Secured routes
// *------------------*
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJWT, changeCurrentPassword)
router.route('/update-account').patch(verifyJWT, updateAccountDetails)


export default router
