require("dotenv").config();
const express= require("express");
const DatabaseConnection = require("./src/database/connection");
const errorMiddleware= require("./src/middlewares/error");
const cookieParser= require("cookie-parser")
const apiRoutes = require("./src/routes/api.routes");
const app = express();
const PORT= process.env.PORT || 8000;

process.on("uncaughtException", (err)=>{

    console.log(`uncaughtException ${err.message}`);
    process.exit(1)
})

//* database connection
DatabaseConnection()

//* middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())

//* api routes
apiRoutes(app)

// middlewares custom
app.use(errorMiddleware)

//* server listen
app.listen(PORT, ()=> console.log(`Server runnit at ${PORT}`))