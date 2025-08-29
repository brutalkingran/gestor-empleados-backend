class IRepository {
  getAllEmployees() {
    throw new Error("Método 'obtenerTodos()' no implementado");
  }

  addEmployee() {
    throw new Error("Método 'agregarEmpleado()' no implementado");
  }

  updateEmployee() {
    throw new Error("Método 'editarEmpleado()' no implementado");
  }

  deleteEmployee() {
    throw new Error("Método 'borrarEmpleado()' no implementado");
  }

  getEmployee(id) {
    throw new Error("Método 'obtenerEmpleado()' no implementado");
  }
}

export default IRepository;
