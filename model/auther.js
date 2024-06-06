import mongoose from "mongoose";
import { Schema } from "mongoose";

const authorsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Name must be unique"]
  },
  password:{
    type: String,
    required: [true, "Password is required"],
    lowercase: [true, "Password must be lowercase"]
  },
}, {
  timestamps: true,
});

const AuthorsData = mongoose.model("Authors", authorsSchema);

export default AuthorsData;
