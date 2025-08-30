import mongoose from 'mongoose';

const rankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [String]
});

export default mongoose.models.Rank || mongoose.model("Rank", rankSchema, "ranks");
