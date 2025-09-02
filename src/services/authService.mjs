import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/Users.mjs';
import Rank from '../models/Ranks.mjs';

class AuthService {
  // Registrar un nuevo usuario
  async register(userData) {
    const existingUser = await User.findOne({ 
      $or: [
        { username: userData.username },
        { email: userData.email },
      ]
    });

    if (existingUser) {
      throw new Error('Usuario o email ya existe');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Asignar rank por defecto si no se pasa
    let rankId = userData.rank;
    if (!rankId) {
      const defaultRank = await Rank.findOne({ name: "Trainee" });
      if (!defaultRank) {
        throw new Error('No existe un rank por defecto llamado Trainee');
      }
      rankId = defaultRank._id;
    }

    const user = new User({
      ...userData,
      password: hashedPassword,
      rank: rankId
    });

    await user.save();

    // Hacer populate para devolver nombre del rank
    await user.populate("rank");

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = this.generateToken(user);
    return { user: userResponse, token };
  }

  // Login
  async login(email, password) {
    const user = await User.findOne({ email }).populate("rank");
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = this.generateToken(user);
    return { user: userResponse, token };
  }

  // Generar JWT usando rank en lugar de role
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        rank: user.rank.name,
        permissions: user.rank.permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
  }
}

export default new AuthService();
