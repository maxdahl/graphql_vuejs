import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDubs: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    dropDubs: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
