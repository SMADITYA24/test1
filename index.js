const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (host and port from Docker Compose env vars)
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/testdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 Hello from Node.js + MongoDB Docker app!');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});