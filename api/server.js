//init express
const express = require('express');
const app = express();

// init env
require('dotenv').config();
const PORT = process.env.PORT || 5000;




// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://172.0.0.1:${PORT}`);
});