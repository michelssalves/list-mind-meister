// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000; // Escolha uma porta para o seu servidor

app.use(cors());

// Configuração da conexão MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware para manipular a conexão com o MongoDB
app.use(async (req, res, next) => {
  try {
    const isConnected = client.topology && client.topology.isConnected();

    if (!isConnected) {
      await client.connect();
    }

    req.dbClient = client;
    next();
  } catch (error) {
    console.error('Erro na conexão com o MongoDB:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



// Tratamento de erros centralizado
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Endpoints para acessar dados do MongoDB
app.get('/api/natures', async (req, res) => {
  try {
    const collectionNature = req.dbClient.db('natures').collection('nature');
    const nature = await collectionNature.find().toArray();
    res.json(nature);
  } catch (error) {
    next(error);
  }
});

app.get('/api/natures/type', async (req, res) => {
  try {
    const collectionType = req.dbClient.db('natures').collection('nature_type');
    const type = await collectionType.find().toArray();
    res.json(type);
  } catch (error) {
    next(error);
  }
});

app.get('/api/natures/doc', async (req, res) => {
  try {
    const collectionDoc = req.dbClient.db('natures').collection('doc_type');
    const doc = await collectionDoc.find().toArray();
    res.json(doc);
  } catch (error) {
    next(error);
  }
});

app.get('/api/natures/sub', async (req, res) => {
  try {
    const collectionSub = req.dbClient.db('natures').collection('sub_nature');
    const sub = await collectionSub.find().toArray();
    res.json(sub);
  } catch (error) {
    next(error);
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Fechar a conexão quando o aplicativo é encerrado
process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});

process.on('SIGTERM', async () => {
  await client.close();
  process.exit();
});
