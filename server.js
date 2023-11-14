// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000; // Choose a port for your server

// MongoDB connection setup
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(bodyParser.json());

// Middleware to handle MongoDB connection
app.use(async (req, res, next) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    req.dbClient = client;
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API endpoint to fetch nature data
app.get('/api/natures', async (req, res) => {
  try {
    await client.connect();
    const collectionNature = client.db('natures').collection('nature');

    const nature = await collectionNature.find().toArray();

    res.json(nature);
  } catch (error) {
    console.error('Error fetching natures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});
app.get('/api/natures/type', async (req, res) => {
  try {
    await client.connect();
    const collectionType = client.db('natures').collection('nature_type');

    const type = await collectionType.find().toArray();

    res.json(type);
  } catch (error) {
    console.error('Error fetching nature types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});
app.get('/api/natures/doc', async (req, res) => {
  try {
    await client.connect();

    const collectionDoc = client.db('natures').collection('doc_type');

    const doc = await collectionDoc.find().toArray();

    res.json(doc);
  } catch (error) {
    console.error('Error fetching nature types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});
app.get('/api/natures/sub', async (req, res) => {
  try {
    await client.connect();
    const collectionSub = client.db('natures').collection('sub_nature');

    const sub = await collectionSub.find().toArray();

    res.json(sub);
  } catch (error) {
    console.error('Error fetching nature types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
