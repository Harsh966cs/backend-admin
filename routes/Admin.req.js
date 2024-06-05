import express from 'express';
import bodyParser from 'body-parser';
import {AdminCreate,getAuthor,getPostCount,getFilterByDate,getFilterByTitle} from '../controller/Admin.controller.js';


const router = express.Router();



router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.post('/',AdminCreate);
router.get('/author',getAuthor); 
router.get('/postCount',getPostCount)
router.get('/data/:year/:month/:day',getFilterByDate)
router.get('/data',getFilterByTitle)




export default router;