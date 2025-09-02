import jwt from "jsonwebtoken";

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
  if (req.user.rank !== "Boss") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
