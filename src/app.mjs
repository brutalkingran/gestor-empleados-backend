import express from "express";
import cors from "cors";
import employeeRouter from "./routes/employeesRoutes.mjs";
import authRouter from "./routes/authRoutes.mjs";
import 'dotenv/config';
import { connectDB } from "./config/dbConfig.mjs";

// Cargar modelos
// require('./models/Departments');
// require('./models/Employees');
// require('./models/Roles');
// require('./models/Users');
const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 horas en segundos
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Configuración de rutas
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/profiles', profileRouter);

// Iniciar conexión a MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Accede en: http://localhost:${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.log('Error no manejado:', err);
  process.exit(1);
});

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.json({ message: "pong" });
});

export default app;
