import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true},
  lastName: { type: String, required: true, trim: true },
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  rank: { type: mongoose.Schema.Types.ObjectId, ref: "Rank", required: true },
  mustChangePassword: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema, "users");
