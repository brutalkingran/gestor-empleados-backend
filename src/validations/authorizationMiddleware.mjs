import User from "../models/Users.mjs";
import { RANKS } from "./authenticationMiddleware.mjs";

export const hasPermission = (action) => {
  return async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ message: "No autenticado" });

      const user = await User.findById(req.user.id).populate("rank");
      if (!user || !user.rank) return res.status(403).json({ message: "Usuario sin rango asignado" });

      const isBossOrHR = [RANKS.BOSS, RANKS.HR].includes(user.rank._id);

      switch (action) {
        case "create": {
          if (isBossOrHR) {
            return next();
          } else {
            return res.status(403).json({ message: "No tienes permiso para crear" });
          }
        }
        case "manage_all_employees": {
          if (isBossOrHR) return next();
          return res.status(403).json({ message: "No tienes permiso para gestionar todos" });
        }
        case "read_all": {
          return next(); // Todos pueden leer todos los empleados
        }
        case "read_one": {
          if (isBossOrHR || String(req.params.id) === String(user._id)) return next();
          return res.status(403).json({ message: "No tienes permiso para ver" });
        }
        case "edit": {
          if (isBossOrHR) return next();
          return res.status(403).json({ message: "No tienes permiso para editar" });
        }
        case "delete": {
          if (isBossOrHR) return next();
          return res.status(403).json({ message: "No tienes permiso para eliminar" });
        }
        default: {
          return res.status(403).json({ message: "Acción no permitida" });
        }
      }
    } catch (err) {
      next(err);
    }
  };
};

