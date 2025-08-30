//Creamos un servicio para autenticacion
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/Users.mjs';

// Clase que maneja toda la lógica de autenticación
class AuthService {
  // Método para registrar un nuevo usuario
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
    
    const user = new User({
      ...userData,
      password: hashedPassword
    });
    
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    const token = this.generateToken(user);
    return { user: userResponse, token };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
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
  
  // Token JWT
  generateToken(user) {
    return jwt.sign(
      { 
        id: user._id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
  }
}

export default new AuthService();
