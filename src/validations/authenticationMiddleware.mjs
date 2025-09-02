import jwt from "jsonwebtoken";

export const RANKS = {
  TRAINEE: "68b3714aa35349ad04fc4492",
  JUNIOR: "68b3714aa35349ad04fc4493",
  SENIOR: "68b3714aa35349ad04fc4494",
  DEPT_HEAD: "68b3714aa35349ad04fc4495",
  BOSS: "68b3714aa35349ad04fc4496",
  HR: "68b6faa8c4d7029850b8eded"
};

// Middleware para verificar el token de autenticación
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded contiene { id, rank, permissions }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

// Middleware para verificar si el usuario es "Boss" (administrador)
export const isAdmin = (req, res, next) => {
  if (req.user.rank !== RANKS.BOSS) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
