import { body, param } from 'express-validator';
import mongoose from 'mongoose';

// Validar ID de Mongo
export const deleteUserValidationRules = () => [
    param('_id')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB.')
];

// Registro de usuario
export const registerUserValidationRules = () => [
  body('firstName')
    .notEmpty().withMessage("Campo 'firstName' obligatorio.")
    .isLength({ min: 1, max: 50 }).withMessage('El nombre debe tener entre 1 y 50 caracteres.'),

  body('lastName')
    .notEmpty().withMessage("Campo 'lastName' obligatorio.")
    .isLength({ min: 1, max: 50 }).withMessage('El apellido debe tener entre 1 y 50 caracteres.'),

  body('username')
    .notEmpty().withMessage("Campo 'username' obligatorio.")
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('El username solo puede contener letras, números y guiones bajos.'),

  body('password')
    .notEmpty().withMessage("Campo 'password' obligatorio.")
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body("rank")
    .notEmpty().withMessage("Campo 'rank' obligatorio.")
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El rank debe ser un ObjectId válido.");
      }
      return true;
    }),

  body('email').notEmpty().withMessage('Email obligatorio').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Contraseña obligatoria')
];

// Actualización de usuario
export const updateUserValidationRules = () => [
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.'),

  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.'),

  body('username')
    .optional()
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('El username solo puede contener letras, números y guiones bajos.'),

  body('password')
    .optional
    .notEmpty().withMessage("Campo 'password' obligatorio.")
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body('rank')
    .optional()
    .isIn(['Boss', 'Employee', 'Junior', 'Trainee', 'Senior', 'Dept Head', "HR"]).withMessage('El rol debe ser válido.'),

  body('email').optional().notEmpty().withMessage('Email obligatorio').isEmail().withMessage('Email inválido'),
  body('password').optional().notEmpty().withMessage('Contraseña obligatoria')
];
