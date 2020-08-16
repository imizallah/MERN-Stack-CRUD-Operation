const mongoose = require("mongoose");

const PostMessage = mongoose.model('postmessages', {
  title: String,
  message: String
})

module.exports = { PostMessage };