import EmployeeRepository from "../repositories/employeesRepository.mjs";

export const getAllEmployees = async (page, limit, sortBy, sortOrder) => {
  return await EmployeeRepository.getAllEmployees(page, limit, sortBy, sortOrder);
};

export const addEmployee = async (employeeData) => {
  return await EmployeeRepository.addEmployee(employeeData);
};

export const updateEmployee = async (id, data) => {
  return await EmployeeRepository.updateEmployee(id, data);
};

export const deleteEmployee = async (id) => {
  return await EmployeeRepository.deleteEmployee(id);
};

export const getEmployee = async (id) => {
  return await EmployeeRepository.getEmployee(id);
};
