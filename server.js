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
  age: Number
});
const User = mongoose.model('User', userSchema);
// Route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to My CRUD API</h1><h3>Hello From Crud Operation Server</h3>");
});
// Post 
app.post('/user', async (req, res) => {
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
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});






