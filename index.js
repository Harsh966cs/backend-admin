import express from 'express';
import bodyParser from 'body-parser';
import connect from './config/contect.js';
import Admin from './routes/Admin.req.js';
 import Posts from './routes/Posts.req.js'
 import CORS from 'cors';

const app = express()
app.use(CORS())
const port = process.env.PORT || 3000 


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/",Admin);
app.use("/api/posts",Posts)

connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})