require("./db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const postMessageRoutes = require("./controllers/postMessageController");


const logger = require("morgan");

// app.get("/", (req, res) => {
//   res.send("I am workig fine;::::: ")
// });

app.use(logger("dev"));


const port = 8000;
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'})); //Allowing React to Interact with the Backend Server
app.listen(port, () => console.log(`Server conected port ${port}`)); 

app.use("/post-messages", postMessageRoutes);
