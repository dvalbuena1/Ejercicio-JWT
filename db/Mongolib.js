const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB is Connected");
  } catch (err) {
    console.error(err);
  }
}
exports.connectDB = connectDB;
