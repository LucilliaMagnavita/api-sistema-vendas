// index.js
// Servidor básico da API do Sistema de Vendas

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Cria a aplicação Express
const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// URL do MongoDB (Mogno BD)
// ⚠️ MAIS PRA FRENTE vamos colocar essa string de conexão certinho.
// Por enquanto, deixe assim:
const MONGO_URI = process.env.MONGO_URI;

// Conexão com o MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
  });

// Rota simples só para teste
app.get("/", (req, res) => {
  res.json({ mensagem: "API do Sistema de Vendas está rodando ✨" });
});

// Porta (para serviços como Render/Railway) ou 3000 localmente
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
