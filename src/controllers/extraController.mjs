import { getDepartments, getRanks } from "../services/extraServices.mjs";

// Obtener todos los departamentos
export const getDepartmentsController = async (req, res) => {
  try {
    const departments = await getDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener departamentos",
      error: error.message
    });
  }
};

// Obtener todos los rangos
export const getRanksController = async (req, res) => {
  try {
    const ranks = await getRanks();
    res.status(200).json(ranks);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener rangos",
      error: error.message
    });
  }
};
