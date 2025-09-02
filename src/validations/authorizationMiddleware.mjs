import User from "../models/Users.mjs";

export const hasPermission = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
      }

      const user = await User.findById(req.user.id).populate("rank");

      if (!user || !user.rank) {
        return res.status(403).json({ message: "Usuario sin rango asignado" });
      }

      // Convertir a array si viene como string
      const permissionsToCheck = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      const hasPermission = permissionsToCheck.some((perm) =>
        user.rank.permissions.includes(perm)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "No tienes permiso para realizar esta acción" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

