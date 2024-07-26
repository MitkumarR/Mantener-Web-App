const express = require("express");
const { MongoClient, Int32 } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const { collection } = require("./config");
const { Writable } = require("stream");
// const { change } = require("../../src/redux/clicked/clickedSlice");
dotenv.config();

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const dbName = "Mantener";
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("view engine", "jsx");

// client.connect();

mongoose.connect("mongodb://localhost:27017/Mantener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// User Schema

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const noteSchema = new mongoose.Schema(
  {
    Id: { type: String, required: true },
    Title: { type: String, required: true },
    Note: { type: String, required: true },
    Deleted: { type: Boolean, default: false },
    Pinned: { type: Boolean, default: false },
    Archived: { type: Boolean, default: false },
    Opened: { type: Boolean, default: false },
    Writable: { type: Boolean, default: false },
    Bgcolor: { type: Number, default: 0 },
    Hovered: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [noteSchema],
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

app.get("/notes/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    console.log(user.username);
    if (user) {
      res.json(user.notes);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
});

app.post("/notes", async (req, res) => {
  const note = req.body.note;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      user.notes.push({
        Id: note.Id,
        Title: note.Title,
        Note: note.Note,
        Deleted: false,
        Pinned: false,
        Archived: false,
        Opened: false,
        Writable: true,
        Bgcolor: 0,
        Hovered: false,
      });

      await user.save();
      res.status(201).json({ message: "Note saved successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving note", error });
  }
});

app.post("/note", async (req, res) => {

  const { username, itemid, edits } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      user.notes = user.notes.map((note) =>
        note.Id === itemid
          ? {
              ...note,
              Title: edits.Title,
              Note: edits.Note,
            }
          : note
      );
      await user.save();
      res.status(201).json({ message: "Note saved successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving note", error });
  }
});

app.post("/notes/change", async (req, res) => {
  // const changes = req.body.changes;
  // const itemid = req.body.itemid;

  const { username, itemid, changes } = req.body;

  try {
    // const user = await User.findOne({ username : req.body.username });
    const user = await User.findOne({ username });
    if (user) {
      user.notes = user.notes.map((note) =>
        note.Id === itemid
          ? {
              ...note,
              Pinned: changes.Pinned,
              Deleted: changes.Deleted,
              Archived: changes.Archived,
              Writable: changes.Writable,
            }
          : note
      );
      // user.notes.Pinned = changes.Pinned;

      await user.save();
      res.status(201).json({ message: "Changes saved successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving changes", error });
  }
});

app.post("/notes/remove", async (req, res) => {
  const { username, itemid } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      user.notes = user.notes.filter((note) => note.Id !== itemid);

      await user.save();
      res.status(201).json({ message: "Note removed successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving changes", error });
  }
});

// Authentication Route
app.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json("Invalid Password");

    // const token = jwt.sign({ id: user._id }, 'yourJWTSecret', { expiresIn: '1h' });
    res.json(user.username);
    // res.render('/Mantener/src/components/Home/Main/Notes.jsx');
  } catch (err) {
    res.status(500).json("Server error");
  }
});

app.post("/signup", async (req, res) => {
  // const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      notes: [],
    });

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const userData = await User.insertMany(newUser);

    // await newUser.save();
    return res.json("User signed up successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
