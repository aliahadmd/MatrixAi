//init express
const express = require('express');
const app = express();

// init env
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Router
const userRouter = require('./routes/UsersRouter');
app.use('/api/v1/users', userRouter);


// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});