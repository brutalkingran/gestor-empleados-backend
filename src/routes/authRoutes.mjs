import express from 'express';
import { register, login } from '../controllers/authController.mjs';
import { registerUserValidationRules } from '../validations/validationRulesUsers.mjs';
import { handleValidationErrors } from '../validations/errorMiddleware.mjs';

const router = express.Router();

router.post('/register', registerUserValidationRules(), handleValidationErrors, register);
router.post('/login', login);

export default router;
