import Authors from "../model/auther.js"; // Ensure the model file name is correct
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import 'dotenv/config'
const uri = process.env.DB_URL; // Specify the correct database
console.log(uri)
const client = new MongoClient(uri);
const app = express();

app.use(bodyParser.json());

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

export const AdminCreate = async (req, res) => {
  try {
    const newAuthor = new Authors(req.body);
    const database = client.db("MyDatabase");
    const postData = database.collection("MyAuthor");
    const savedAuthor = await postData.insertOne(newAuthor);
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAuthor = async (req, res) => {
  try {
    const { name, password } = req.body;
    const database = client.db("MyDatabase");
    const postData = database.collection("MyAuthor");
    const author = await postData.findOne({ name });
    if (!author) {
      return res.status(400).send({ message: 'User does not exist' });
    }
    if (password !== author.password) {
      return res.status(400).send({ message: 'Password does not match' });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostCount = async (req, res) => {
  try {
    await connectClient();
    const database = client.db("MyDatabase");
    const postData = database.collection("MyCollection");
    const estimation = await postData.estimatedDocumentCount();
    if (estimation === 0) {
      return res.status(400).send({ message: 'There is no data exist' });
    }
    console.log(estimation);
    res.status(200).send({ estimation });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const getFilterByDate = async (req, res) => {
  try {
    await connectClient();
    const Year = parseInt(req.params.year);
    const Month = parseInt(req.params.month); // Subtract 1 because months are 0-indexed in JS Date
    const Day = parseInt(req.params.day);
    console.log(Year, Month, Day);
    const database = client.db("MyDatabase");
    const postData = database.collection("MyCollection");
    const queryData = await postData.find({
      publishedAt: { $lte: new Date(Year, Month, Day, 0, 0, 0) }
    }).toArray();
    console.log(queryData);
    res.status(200).send({ queryData });
  } catch (error) {
    res.status(500).send({ message: error });
  } finally {
    await client.close();
    isConnected = false; // Reset the connection flag
  }
};


export const getFilterByTitle = async (req, res) => {
  await connectClient();
  const {title,sort,select} = req.query;
  const queryObject = {};


  if(title){
      queryObject.title = { $regex: title, $options: "i"};
  }
  console.log(queryObject);

  const database = client.db("MyDatabase");
  const postData = database.collection("MyCollection");
  const queryData = await postData.find(queryObject).toArray();
  console.log(queryData);

  if(sort){
      let sortFix = sort.split(",").join(" ");
      apiData = apiData.sort(sortFix);
  }
  if(select){
      let selectFix = select.split(",").join(" ");
      apiData = apiData.select(selectFix);
  }


  try {
    const myData = queryData; // Use Database model
    res.status(200).json({ myData });
   
} catch (error) {
    res.status(500).json({ message: error.message });
}
};






