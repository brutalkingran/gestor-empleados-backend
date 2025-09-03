import express from "express";
import {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  getUserController
} from "../controllers/profilesController.mjs";

import {
  deleteUserValidationRules,
  registerUserValidationRules,
  updateUserValidationRules
} from "../validations/validationRulesUsers.mjs";

import { handleValidationErrors } from "../validations/errorMiddleware.mjs";

const router = express.Router();

// Crear usuario
router.post("/create", registerUserValidationRules(), handleValidationErrors, createUserController);

// Editar usuario
router.put("/modify", updateUserValidationRules(), handleValidationErrors, updateUserController);

// Eliminar usuario
router.delete("/delete/:id", deleteUserValidationRules(), handleValidationErrors, deleteUserController);

// Mostrar todos los usuarios (paginado)
router.get("/", getAllUsersController);

// Obtener usuario por ID
router.get("/:id", getUserController);

export default router;
