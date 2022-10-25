const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
var cors = require('cors');
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary")

// Handling uncaught error
process.on("uncaughtException", (err)=>{
    console.log(`Error message: ${err.message}`);
    console.log("\n\n\n\nError: ", err);
    console.log("\n\n\n\n", "Shutting Down because of uncaught error")
    process.exit(1)
})

var currentPath = process.cwd();
dotenv.config({path: path.join(currentPath, 'config/config.env')})
const errorMiddleware = require('./middleware/errors')

const app = express();
app.use(cors());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(express.json())   // Use json in our application
const connectToDatabase = require('./db');

// Frontend
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(express.static("public"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Database connection
connectToDatabase();

// Routes
app.use('/api/v1/', require('./routes/productRoute'))
app.use('/api/v2/', require('./routes/userRoute'))
app.use('/api/v3/', require('./routes/orderRoute'))
app.use('/api/v4/', require('./routes/paymentRoute'))

// Middleware for error
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on ${process.env.PORT}`)
})


// Unhandled Promise Rejection error
process.on("unhandledRejection", (err)=>{
    console.log(`error: ${err.message}`);
    console.log("Shutting Down because of unhandled Rejection error")

    server.close(()=>{
        process.exit(1)
    });
})