import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const authorsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required: true,
    lowercase:true
  },
  numPosts: {
    type: Number,
 
  },
  numLikes: {
    type: Number,

  },
  
}, {
  timestamps: true,
});

const Authors = mongoose.model("Authors", authorsSchema);

export default Authors