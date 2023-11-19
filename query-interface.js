const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model (reuse the same schema as the log ingestor)
const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

const Log = mongoose.model('Log', logSchema);

// Endpoint to search for logs based on criteria
app.get('/search', async (req, res) => {
  try {
    const logs = await Log.find(req.query);
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Query Interface listening on port ${PORT}`);
});
