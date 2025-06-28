const express = require('express');
const app = express();


require('dotenv').config();
const PORT = process.env.PORT || 8080;


// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // to parse the body of request


app.listen(PORT, (req, res) => {
    console.log(`server is running on port : ${PORT}`);
})


const cors = require('cors');
app.use(cors()); // since the font and back are runnnig in different ports


const dbConnect = require('./Config/database');
const bodyParser = require('body-parser');
dbConnect();

app.get('/', (req, res) => {
    res.send('<h1>App is running</h1>');
})