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
router.post("/employees/create", registerEmployeeValidationRules(), handleValidationErrors, createEmployeeController);

// Editar
router.put("/employees/modify", updateEmployeeValidationRules(), handleValidationErrors, updateEmployeeController);

// Eliminar
router.delete("/employees/delete/:id", deleteEmployeeValidationRules(), handleValidationErrors, deleteEmployeeController);

// Get empleados
router.get("/employees", getAllEmployeesController);

// Obtener por ID
router.get("/employees/:id", getEmployeeController);

export default router;
