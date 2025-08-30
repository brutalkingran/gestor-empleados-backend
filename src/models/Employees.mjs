import Ranks from "./Ranks.mjs";
import Department from "./Departments.mjs"; // esto sí funciona
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: String,
  position: String,
  rank: { type: mongoose.Schema.Types.ObjectId, ref: "Rank", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  hireDate: Date,
  isActive: Boolean,
  salary: Number,
  birthday: Date,
  sex: String,
  stressLevel: Number,
  photo: String,
  notes: String
});

const Employee = mongoose.model('Employee', employeeSchema, 'employees');
export default Employee;
