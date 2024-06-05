import Post from "../model/post.js"
import bodyParser from "body-parser"


export const createPost = (async(req,res)=>{
    try {
          const blog = new Post(req.body);
          const savedAuthor= await blog.save();
          res.status(201).json(savedAuthor)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})