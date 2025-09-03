import User from "../models/Users.mjs";

class UserRepository {
  async getAllUsers(page = 1, limit = 10, sortBy = "firstName", sortOrder = "asc") {
    const skip = (page - 1) * limit;

    // Campos permitidos para ordenar
    const allowedSortFields = ["firstName", "lastName", "username", "email", "mustChangePassword"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "firstName";
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    // Construir query base
    let query = User.find()
      .populate("rank")
      .skip(skip)
      .limit(limit);

    // Orden dinámico
    if (sortField === "rank") {
      query = query.sort({ "rank.name": sortDirection });
    } else {
      query = query.sort({ [sortField]: sortDirection });
    }

    const [users, totalCount] = await Promise.all([
      query,
      User.countDocuments()
    ]);

    return {
      data: users,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  }

  async addUser(userData) {
    return await User.create(userData);
  }

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async getUser(id) {
    return await User.findById(id).populate("rank");
  }
}

export default new UserRepository();
