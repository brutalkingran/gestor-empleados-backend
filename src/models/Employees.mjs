import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: String,
  position: String,
  rank: Number,
  department: String,
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
