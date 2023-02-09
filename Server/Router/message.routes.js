const { Router } = require("express");
const { addmsg, getMessages } = require("../controller/message");
const messageRoute = Router();

messageRoute.post("/postmsg",addmsg)
messageRoute.post("/getmsg",getMessages)

module.exports ={messageRoute}

