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
  authenticateToken,
  hasPermission("manage_all_employees"),
  registerEmployeeValidationRules(),
  handleValidationErrors,
  createEmployeeController
);

// Editar empleado
router.put(
  "/modify",
  authenticateToken,
  hasPermission(["update_own_employee", "manage_department_employees", "manage_all_employees"]),
  updateEmployeeValidationRules(),
  handleValidationErrors,
  updateEmployeeController
);

// Eliminar empleado
router.delete(
  "/delete/:id",
  authenticateToken,
  hasPermission(["manage_department_employees", "manage_all_employees"]),
  deleteEmployeeValidationRules(),
  handleValidationErrors,
  deleteEmployeeController
);

// Get empleados
router.get(
  "/",
  authenticateToken,
  hasPermission(["read_employee", "manage_department_employees", "manage_all_employees"]),
  getAllEmployeesController
);

// Obtener empleado por ID
router.get(
  "/:id",
  authenticateToken,
  hasPermission(
    "read_employee"
  ),
  getEmployeeController
);

export default router;
