import express from "express";
import {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController
} from "../controllers/userController.mjs";

import {
  deleteByIdValidationRules,
  registerValidationRules,
  updateValidationRules
} from "../validations/validationRulesUsers.mjs";

import { handleValidationErrors } from "../validations/errorMiddleware.mjs";

const router = express.Router();

// Crear usuario
router.post("/user/create", registerValidationRules(), handleValidationErrors, createUserController);

// Editar usuario
router.put("/user/modify", updateValidationRules(), handleValidationErrors, updateUserController);

// Eliminar usuario
router.delete("/user/delete/:id", deleteByIdValidationRules(), handleValidationErrors, deleteUserController);

// Mostrar todos los usuarios (paginado)
router.get("/user", getAllUsersController);

// Obtener usuario por ID
router.get("/user/:id", getUserByIdController);

export default router;
