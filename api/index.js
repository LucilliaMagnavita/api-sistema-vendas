// Carrega variáveis de ambiente
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Lê string de conexão do Mongo
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ ERRO: MONGO_URI não encontrada no .env");
}

// Configura o cliente MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Variável para guardar o db
let db = null;

// Função para conectar ao MongoDB
async function conectarAoMongo() {
  try {
    await client.connect();
    db = client.db("sistema_vendas"); // nome do seu banco
    console.log("✅ Conectado ao MongoDB!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error.message);
  }
}

// Chama a conexão
conectarAoMongo();

// ROTA DE TESTE
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    mongoConectado: db !== null
  });
});

// Exporta o app — IMPORTANTE PARA A VERCEL
module.exports = app;
