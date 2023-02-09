const mongoose = require("mongoose");
const signupschema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
})
const SignupModel = mongoose.model("chatuser", signupschema);

module.exports = { SignupModel };
