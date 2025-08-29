import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
} from "../services/employeesService.mjs";

export const getAllEmployeesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await fetchEmployeesPaginated(page, limit);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener empleados",
      error: err.message
    });
  }
};

// Crear
export const createEmployeeController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      rank,
      department,
      hireDate,
      isActive,
      salary,
      birthday,
      sex,
      stressLevel,
      photo,
      notes
    } = req.body;

    const newEmployee = await addEmployee({
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      rank,
      department,
      hireDate,
      isActive,
      salary,
      birthday,
      sex,
      stressLevel,
      photo,
      notes
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al crear empleado",
      error: error.message
    });
  }
};

// Editar
export const updateEmployeeController = async (req, res) => {
  try {
    const datosActualizados = req.body;

    const updated = await updateEmployee(datosActualizados.id, datosActualizados);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al editar empleado",
      error: error.message
    });
  }
};

// Eliminar
export const deleteEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteEmployee(id);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar empleado",
      error: error.message
    });
  }
};

// Obtener por ID
export const getEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await getEmployeeById(id);

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar empleado",
      error: error.message
    });
  }
};
