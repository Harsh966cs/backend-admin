import express from 'express';
import bodyParser from 'body-parser';
import {createPost} from '../controller/Post.controller.js';


const router = express.Router();



router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.post('/',createPost);




export default router;