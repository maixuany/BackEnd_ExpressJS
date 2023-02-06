const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  role: {type: String, required: true},
});

module.exports = User = mongoose.model("user", userSchema);
