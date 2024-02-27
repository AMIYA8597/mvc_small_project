"const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const UserChatModel = mongoose.model("UserChat", UserChatSchema);
// export default UserChatModel;
module.exports = UserChatModel





































// sender: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User',
//   required: true
// },
// receiver: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User',
//   required: true
// },
// content: {
//   type: String,
//   required: true
// },
// timestamp: {
//   type: Date,
//   default: Date.now
// }

"