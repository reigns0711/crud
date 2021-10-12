const express= require('express');
const connectDB = require('./config/db');
const app = express();
var logger = require('morgan');


connectDB();


app.use(express.json({extended : false}));
app.use(logger('dev'));
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))



app.get("/", (req, res) => res.send("API Running"));



app.listen(5000, () => console.log("Server started on port 5000"));
