const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user1", "user2"] },
  },
  { collection: "User" }
);

module.exports = User = mongoose.model("User", UserSchema);
