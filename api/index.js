// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Lê a URL do MongoDB do .env
const uri = process.env.MONGO_URI;

// Validação simples: se não tiver MONGO_URI, avisa no console
if (!uri) {
  console.error('❌ ERRO: MONGO_URI não configurada no arquivo .env');
}

// Configuração do cliente MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Vamos guardar a referência do banco aqui
let db = null;

// Função para conectar no MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    // Nome do banco (você pode mudar depois se quiser)
    db = client.db('sistema_vendas');
    console.log('✅ Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error.message);
  }
}

// Chama a função de conexão
connectToMongo();

// Rota de teste só para ver se o servidor está de pé
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongoConectado: !!db,
  });
});

// Porta do servidor (pode vir do .env ou usar 3000 como padrão)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
