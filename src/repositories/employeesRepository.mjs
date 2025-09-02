import Employee from "../models/Employees.mjs";

class EmployeeRepository {
  async getAllEmployees(page = 1, limit = 10, sortBy = "firstName", sortOrder = "asc") {
    const skip = (page - 1) * limit;

    // Campos permitidos para ordenar
    const allowedSortFields = ["firstName", "lastName", "department", "rank", "isActive", "birthday", "salary"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "firstName";
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    // Construir query base
    let query = Employee.find()
      .populate("rank")
      .populate("department")
      .skip(skip)
      .limit(limit);

    // Orden dinámico
    if (sortField === "rank") {
      query = query.sort({ "rank.name": sortDirection });
    } else if (sortField === "department") {
      query = query.sort({ "department.name": sortDirection });
    } else {
      query = query.sort({ [sortField]: sortDirection });
    }

    const [employees, totalCount] = await Promise.all([
      query,
      Employee.countDocuments()
    ]);

    return {
      data: employees,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  }
  
  async addEmployee(employeeData) {
    return await Employee.create(employeeData);
  }

  async updateEmployee(id, data) {
    return await Employee.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteEmployee(id) {
    return await Employee.findByIdAndDelete(id);
  }

  async getEmployee(id) {
    return await Employee.findById(id)
      .populate("rank")
      .populate("department");
  }
}

export default new EmployeeRepository();
