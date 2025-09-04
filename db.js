// db.js
const mongoose = require('mongoose');
const atlasConnectionString="mongodb+srv://adityasingh_db_user:aadi%40123%40@cluster1.wta4a0e.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster1"
mongoose.connect(atlasConnectionString)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log('MongoDB Atlas connection error:', err));

module.exports = mongoose;
