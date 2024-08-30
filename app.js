const express = require('express');
const PORT = 3000;
const authRoutes = require('./routes/authRoutes')

const app = express();

const connectDB = require("./db/database");
connectDB()
app.set('view engine','ejs')

app.use(express.json())
app.use('/',authRoutes);
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))


app.listen(PORT,()=>{
    console.log("Server is running at 3000")
})