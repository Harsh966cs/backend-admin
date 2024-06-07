import Post from "../model/post.js";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

let isConnected = false;
const connectClient = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
};

export const createPost = async (req, res) => {
  try {
    await connectClient();
    
    const blog = new Post(req.body);
    const savedAuthor = await blog.save();
    
    const database = client.db("MyDatabase");
    const postData = database.collection("MyCollection");
    await postData.insertOne(savedAuthor);

    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
