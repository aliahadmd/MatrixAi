const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const cnn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${cnn.connection.host}`);
    } catch (error) {
        console.error(`error connecting to mongoDB${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;