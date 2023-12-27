const express = require('express');
require("dotenv").config();
const userRouter = require("./routes/UsersRouter");
const {errorHandler} = require('./middlewares/errorMiddleware');
const connectDB = require('./utils/connectDB');
connectDB();



// init express app
const app = express();

// environment variables
const PORT = process.env.PORT || 5000;

//---------- Middleware -----------------
// parse incoming requests as a json data
app.use(express.json());


// ------------Router-----------------
app.use('/api/v1/users', userRouter);

// ------------Errorhandler-----------------
app.use(errorHandler);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});