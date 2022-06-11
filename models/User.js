const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

// UserSchema.methods.verifyPassword = (candidatePassword, next) => {
//   console.log("hasło ze schemy: " + this.password);
//   if (candidatePassword === this.password) {
//     return true;
//   } else {
//     return false;
//   }
// };

const User = mongoose.model("User", UserSchema);
module.exports = User;
