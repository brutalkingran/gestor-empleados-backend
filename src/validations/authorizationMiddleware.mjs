import User from "../models/Users.mjs";

export const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
      }

      // Traer al usuario con su rank y permisos
      const user = await User.findById(req.user._id).populate("rank");

      if (!user || !user.rank) {
        return res.status(403).json({ message: "Usuario sin rango asignado" });
      }

      const hasPermission = user.rank.permissions.includes(requiredPermission);

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para realizar esta acción" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
