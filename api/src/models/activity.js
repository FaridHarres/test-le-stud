const mongoose = require("mongoose");

const MODELNAME = "activity";

const Schema = new mongoose.Schema({
  project: { type: String },
  user: { type: String },
  userAvatar: { type: String, default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },
  userCostPerDay: { type: Number },
  userSellPerDay: { type: Number },
  userJobTitle: { type: String },
  date: { type: Date },
  total: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  value: { type: Number, default: 0 },
  detail: [{ date: Date, value: Number }],
  created_at: { type: Date, default: Date.now },

  comment: String,
});

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;
