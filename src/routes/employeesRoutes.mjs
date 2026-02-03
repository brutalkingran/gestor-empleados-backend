import express from "express";
import {
  getAllEmployeesController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getEmployeeController
} from "../controllers/employeesController.mjs";
import { authenticateToken } from "../validations/authenticationMiddleware.mjs"
import { deleteEmployeeValidationRules, registerEmployeeValidationRules, updateEmployeeValidationRules } from "../validations/validationRulesEmployees.mjs";
import { handleValidationErrors } from "../validations/errorMiddleware.mjs";
import { hasPermission } from "../validations/authorizationMiddleware.mjs";

const router = express.Router();

// Crear empleado
router.post(
  "/create",
  //authenticateToken,
  //hasPermission("create"),
  registerEmployeeValidationRules(), // Middleware
  handleValidationErrors,
  createEmployeeController
);

// Editar empleado
router.put(
  "/modify",
  authenticateToken,
  hasPermission("edit"),
  updateEmployeeValidationRules(),
  handleValidationErrors,
  updateEmployeeController
);

// Eliminar empleado
router.delete(
  "/delete/:id",
  authenticateToken,
  hasPermission("delete"),
  deleteEmployeeValidationRules(),
  handleValidationErrors,
  deleteEmployeeController
);

// Get empleados
router.get(
  "/",
  //authenticateToken,
  //hasPermission("read_all"),
  getAllEmployeesController
);

// Obtener empleado por ID
router.get(
  "/:id",
  authenticateToken,
  hasPermission("read_one"),
  getEmployeeController
);


export default router;
