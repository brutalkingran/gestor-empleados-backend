import Employee from "../models/Employees.mjs";

class EmployeeRepository {
  async getAllEmployees(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [employees, totalCount] = await Promise.all([
      Employee
        .find()
        .skip(skip)
        .limit(limit)
        .populate("rank")
        .populate("department"),
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
