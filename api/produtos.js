const { MongoClient, ServerApiVersion } = require("mongodb");

// cache de conexão
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGO_URI; // mesma chave que você colocou na Vercel

  if (!uri) {
    throw new Error("MONGO_URI não configurada na Vercel.");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db("sistema_vendas"); // nome do banco

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const produtos = await db.collection("produtos").find().toArray();
      return res.status(200).json(produtos);
    }

    return res.status(405).json({ erro: "Método não permitido" });
  } catch (erro) {
    console.error("Erro em /api/produtos:", erro);
    return res.status(500).json({ erro: erro.message });
  }
};
