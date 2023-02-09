
const bcrypt = require("bcrypt");
const { SignupModel } = require("../Model/userAuth.model");


const signup= async (req, res) => {
  const { username, email, password } = req.body;

  const user = await SignupModel.findOne({ username: username });
  const useremail = await SignupModel.findOne({ email: email });
  if (user || useremail) {
    res.status(400).send({ msg: "User already available", status: false });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      await SignupModel.insertMany({ email, password: hash, username });
    });
    res.status(200).send({ msg: "User Sign Up sucessfully", status: true });
  }
}
const login=async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userdata = await SignupModel.findOne({ username: username });
    if (userdata) {
      bcrypt.compare(password, userdata.password, function (err, result) {
        if (result) {
          let obj = { ...userdata };
          delete obj._doc.password;
          let data = obj._doc;
          res.status(200).send({ data, status: true });
        } else {
          res.status(401).send({ status: false, msg: "Password may be wrong" });
        }
      });
    } else {
      res.status(401).send({ status: false, msg: "something went wrong" });
    }
  } catch (error) {
    next(error);
  }
}
const getavatar= async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await SignupModel.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(user);
  } catch (error) {}
}
const setavatar= async (req, res, next) => {
  try {
    const { img_url } = req.body.image;

    const { id } = req.params;
    const data = await SignupModel.findByIdAndUpdate(id, {
      isAvatarImageSet: true,
      avatarImage: img_url,
    });

    const user = await SignupModel.findOne({ id });
    res.send({ isSet: data.isAvatarImageSet, image: data.avatarImage });
  } catch (error) {
    next(error);
  }
}
module.exports = { setavatar,getavatar,login,signup};
