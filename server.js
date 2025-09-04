const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model('User', UserSchema);

//  Route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to My CRUD API</h1><h3>Hello From Crud Operation Server</h3>");
});
// APIs Operation
// CREATE (POST)
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
// READ (GET)
app.get('/user', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



