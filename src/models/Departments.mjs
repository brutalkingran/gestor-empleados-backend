import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
});

const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema, "departments");

export default Department;