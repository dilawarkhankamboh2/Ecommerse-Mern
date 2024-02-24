const mongoose = require("mongoose");

const DatabaseConnection = async () => {

  try {

    const connect = await mongoose.connect(

      "mongodb://127.0.0.1:27017/Ecommerse"

    );

    if (connect) console.log("Database Connected...");

  } catch (error) {

    console.log("Connection faild...");

    throw error;
  }
};

module.exports= DatabaseConnection;
