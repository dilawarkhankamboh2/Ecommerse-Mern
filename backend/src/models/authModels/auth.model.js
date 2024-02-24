const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avator: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  resetPwdToken: String,

},{timestamps:true});

module.exports = mongoose.model("User", authSchema);
