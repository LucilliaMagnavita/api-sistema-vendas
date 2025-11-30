// Carrega as variáveis de ambiente
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

// Pega a string de conexão do arquivo .env
const uri = process.env.MONGODB_URI;

// Cria o cliente do MongoDB
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Endpoint raiz
app.get("/", (req, res) => {
    res.json({ mensagem: "API funcionando com sucesso!" });
});

// Exemplo de endpoint que lista itens do banco
app.get("/produtos", async (req, res) => {
    try {
        await client.connect();
        const database = client.db("sistema_vendas");
        const collection = database.collection("produtos");

        const dados = await collection.find().toArray();
