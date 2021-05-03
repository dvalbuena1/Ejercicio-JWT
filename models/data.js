const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    role: [{ type: String, enum: ["admin", "user1", "user2"] }],
  },
  { collection: "Data" }
);

module.exports = Data = mongoose.model("Data", DataSchema);
