const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Mantener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [
    {
      id: String,
      title: String,
      note: String,
      deleted: Boolean,
      pinned: Boolean,
      archived: Boolean,
      hovered: Boolean,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User ;