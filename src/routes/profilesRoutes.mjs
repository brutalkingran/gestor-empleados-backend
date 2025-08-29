import express from "express";
import {
  getAllProfilesController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getEmployeeByIdController
} from "../controllers/profileController.mjs";

import { deleteByIdValidationRules, registerValidationRules, updateValidationRules } from "../validations/validationRulesProfiles.mjs";

import { handleValidationErrors } from "../validations/errorMiddleware.mjs";

const router = express.Router();

// Crear
router.post("/profile/create", registerValidationRules(), handleValidationErrors, createEmployeeController);

// Editar
router.put("/profile/modify", updateValidationRules(), handleValidationErrors, updateEmployeeController);

// Eliminar
router.delete("/profile/delete/:id", deleteByIdValidationRules(), handleValidationErrors, deleteEmployeeController);

// Mostrar todos (paginado)
router.get("/profile", getAllProfilesController);

// Obtener por ID
router.get("/profile/:id", getEmployeeByIdController);

export default router;
