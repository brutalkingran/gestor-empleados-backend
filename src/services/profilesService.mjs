import UserRepository from "../repositories/profilesRepository.mjs";

// Obtener todos los usuarios (con paginación y orden)
export const getAllUsers = async (page, limit, sortBy, sortOrder) => {
  return await UserRepository.getAllUsers(page, limit, sortBy, sortOrder);
};

// Crear un usuario
export const addUser = async (userData) => {
  return await UserRepository.addUser(userData);
};

// Editar un usuario por ID
export const updateUser = async (id, data) => {
  return await UserRepository.updateUser(id, data);
};

// Eliminar un usuario por ID
export const deleteUser = async (id) => {
  return await UserRepository.deleteUser(id);
};

// Obtener un usuario por ID
export const getUser = async (id) => {
  return await UserRepository.getUser(id);
};
