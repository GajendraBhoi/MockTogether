const express = require('express');
const app = express();


require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // to fetch data from body


app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
})


const cors = require('cors');
app.use(cors()); // since the font and back are runnnig in different ports


const dbConnect = require('./Config/database');
dbConnect();

// import route and mount 
const userRoute = require('./Routes/User');
app.use("/", userRoute);


app.get('/', (req, res) => {
    res.send('<h1>App is running</h1>');
})


