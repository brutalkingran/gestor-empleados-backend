import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser
} from "../services/usersService.mjs";

// Obtener todos los usuarios (paginado)
export const getAllUsersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "firstName";
    const sortOrder = req.query.sortOrder || "asc";

    const result = await getAllUsers(page, limit, sortBy, sortOrder);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: err.message
    });
  }
};

// Crear un nuevo usuario
export const createUserController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      rank,
      mustChangePassword
    } = req.body;

    const newUser = await addUser({
      firstName,
      lastName,
      username,
      email,
      password,
      rank,
      mustChangePassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al crear usuario",
      error: error.message
    });
  }
};

// Editar un usuario existente
export const updateUserController = async (req, res) => {
  try {
    const datosActualizados = req.body;

    const updated = await updateUser(datosActualizados.id, datosActualizados);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al editar usuario",
      error: error.message
    });
  }
};

// Eliminar un usuario por ID
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUser(id);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar usuario",
      error: error.message
    });
  }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUser(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar usuario",
      error: error.message
    });
  }
};
