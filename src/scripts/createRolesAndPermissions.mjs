import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database.js"; 
import Rank from "../models/Ranks.mjs";

dotenv.config();

const initialRanks = [
  {
    name: "Trainee",
    permissions: ["read_own_employee"],
  },
  {
    name: "Junior",
    permissions: ["read_own_employee"],
  },
  {
    name: "Senior",
    permissions: ["read_employee"],
  },
  {
    name: "Dept Head",
    permissions: ["manage_department_employees"],
  },
  {
    name: "Boss",
    permissions: ["manage_all_employees", "manage_profiles"],
  },
];

async function initializeRanks() {
  try {
    await connectDB();
    console.log("✅ Conectado a MongoDB");

    // Limpiar colección existente
    await Rank.deleteMany({});
    console.log("🗑️ Colección 'ranks' limpiada");

    // Insertar ranks
    await Rank.insertMany(initialRanks);
    console.log("✅ Ranks creados exitosamente");
  } catch (error) {
    console.error("❌ Error inicializando ranks:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB");
  }
}

initializeRanks();
