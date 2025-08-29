import express from "express";
import {
  getAllEmployeesController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getEmployeeController
} from "../controllers/employeesController.mjs";

import { deleteEmployeeValidationRules, registerEmployeeValidationRules, updateEmployeeValidationRules } from "../validations/validationRulesEmployees.mjs";

import { handleValidationErrors } from "../validations/errorMiddleware.mjs";

const router = express.Router();

// Crear
router.post("/create", registerEmployeeValidationRules(), handleValidationErrors, createEmployeeController);

// Editar
router.put("/modify", updateEmployeeValidationRules(), handleValidationErrors, updateEmployeeController);

// Eliminar
router.delete("/delete/:id", deleteEmployeeValidationRules(), handleValidationErrors, deleteEmployeeController);

// Get empleados
router.get("/", getAllEmployeesController);

// Obtener por ID
router.get("/:id", getEmployeeController);

export default router;
