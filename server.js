// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db'); // import DB connection

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Define schema & model
const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  age: Number
});
const User = mongoose.model('User', userSchema);
// Route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to My CRUD API</h1><h3>Hello From Crud Operation Server</h3>");
});
// Post 
app.post('/user', async (req, res) => {
    console.log(req.body);
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.json({ message: "User saved!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get
app.get('/user', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
// READ (GET by ID)
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
// UPDATE all users
app.put('/user', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const result = await User.updateMany({}, { name, email, age });
    res.json({ message: "All users updated!", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE (PUT by ID)
app.put('/user/:id', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true } // return updated document
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated!", user });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  } 
});

// DELETE (by ID)
app.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted!" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
// DELETE all users
app.delete('/user', async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});








