import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { NoteValidationSchema } from "../validators/note.validator.js";
import { addNote, updateNote, deleteNote, getNotes, getNote } from "../controllers/note.controller.js";



const router = Router()



// router.route('/register').post(validate(RegisterSchema), registerUser)
// router.route('/login').post(validate(LoginSchema), loginUser)

// *------------------*
// Secured routes
// *------------------*
router.route('/').get(verifyJWT, getNotes);
router.route('/:id').get(verifyJWT, getNote);
router.route('/create').post(verifyJWT, validate(NoteValidationSchema), addNote);
router.route('/update/:id').patch(verifyJWT, validate(NoteValidationSchema), updateNote);
router.route('/delete/:id').delete(verifyJWT, deleteNote);


export default router
