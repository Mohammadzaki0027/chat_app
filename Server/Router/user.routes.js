const { Router } = require("express");
const { signup, login, getavatar, setavatar } = require("../controller/auth");

const { SignupModel } = require("../Model/userAuth.model");
const SignRouter = Router();

SignRouter.post("/signup", signup);
SignRouter.post("/login", login);
SignRouter.get("/getavatar/:id", getavatar);
SignRouter.post("/setavatar/:id", setavatar);
module.exports = { SignRouter };
