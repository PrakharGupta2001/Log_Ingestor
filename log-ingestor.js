const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Define MongoDB schema and model
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

// Endpoint for log ingestion
app.post('/logs', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send('Log ingested successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get all logs
app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to clear all logs (for testing purposes)
app.delete('/logs', async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).send('All logs cleared successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true });

// Start the server
app.listen(PORT, () => {
  console.log(`Log Ingestor listening on port ${PORT}`);
});
