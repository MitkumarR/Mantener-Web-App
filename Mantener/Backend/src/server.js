const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path  = require("path");

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cors = require("cors");
const { collection } = require("./config");
dotenv.config();

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const dbName = "Mantener";
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.set('view engine', 'jsx');

// client.connect();

mongoose.connect('mongodb://localhost:27017/Mantener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// User Schema

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{
      id: String,
      title: String,
      note: String,
      deleted: Boolean,
      pinned: Boolean,
      archived: Boolean,
      hovered: Boolean
  }]
});

const User = mongoose.model('User', userSchema);

app.get('/notes', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
      res.json({ notes: user.notes, username: user.username });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notes', error });
  }
});

app.post('/notes', async (req, res) => {
  
  try {
    const user = await User.findOne({ id: req.body.id });
    if (user) {
      user.notes.push(req.body.note);
      await user.save();
      res.status(201).json({ message: 'Note saved successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving note', error });
  }
});

// Authentication Route
app.post('/signin', async (req, res) => {

  try {
      const user = await User.findOne({ username : req.body.username });
      if (!user) return res.status(400).json('User not found');

      const isMatch = await bcrypt.compare(req.body.password , user.password);
      if (!isMatch) return res.status(400).json('Invalid Password');

      // const token = jwt.sign({ id: user._id }, 'yourJWTSecret', { expiresIn: '1h' });

      res.json(user._id);

      // res.render('/Mantener/src/components/Home/Main/Notes.jsx');
      
  } catch (err) {
      res.status(500).json('Server error');
  }
});

app.post('/signup', async (req, res) => {


  // const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username : req.body.username,   
      password: hashedPassword,
      notes: [],
    });

    const existingUser = await User.findOne({username: req.body.username });
    if (existingUser) {
      return res.status(400).json('User already exists');
    }


    const userData = await User.insertMany(newUser);

    // await newUser.save();
    return res.json('User signed up successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server error');
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
