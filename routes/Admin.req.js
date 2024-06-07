import express from 'express';
import bodyParser from 'body-parser';
import {AdminCreate,getAuthor,getPostCount,getFilterByDate,getFilterByTitle, getPanelData, getYearlyPanelData} from '../controller/Admin.controller.js';


const router = express.Router();



router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.post('/',AdminCreate);
router.get('/author',getAuthor); 
router.get('/postCount',getPostCount)
router.get('/data/:year/:month/:day',getFilterByDate)
router.get('/data',getFilterByTitle);
router.get('/panelData/:month',getPanelData);
router.get('/panelData/year/:year',getYearlyPanelData);


export default router;