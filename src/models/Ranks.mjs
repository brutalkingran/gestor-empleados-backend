import mongoose from 'mongoose';

const rankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [String]
});

const Rank = mongoose.models.Rank || mongoose.model("Rank", rankSchema, "ranks");

export default Rank;
