const { messageModel } = require("../Model/message.model");

const addmsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "msg added sucesfully" });
    else return res.json({ msg: "something went wrong" });
  } catch (error) {
    next(error);
  }
};
const getMessages = async (req, res, next) => {
  console.log(req.body);
  try {
    const { from, to } = req.body;

  const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
   
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
  console.log(projectedMessages,"projectedmsg");
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { addmsg, getMessages };
