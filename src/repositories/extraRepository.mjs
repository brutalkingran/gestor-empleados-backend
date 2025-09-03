import Department from "../models/Departments.mjs";
import Rank from "../models/Ranks.mjs";

class DepartmentsRepository {
  async getAllDepartments() {
    return await Department.find();
  }
}

class RanksRepository {
  async getAllRanks() {
    return await Rank.find();
  }
}

export const departmentsRepository = new DepartmentsRepository();
export const ranksRepository = new RanksRepository();
