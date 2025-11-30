const { MongoClient, ServerApiVersion } = require("mongodb");

// Conexão com cache para não reconectar várias vezes
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ MONGO_URI não configurada na Vercel.");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db("sistema_vendas");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    // ROTA DE TESTE
    if (req.method === "GET") {
      return res.status(200).json({
        status: "ok",
        mongoConectado: true,
      });
    }

    return res.status(405).json({ error: "Método não permitido" });

  } catch (error) {
    console.error("❌ ERRO NA API:", error);
    return res.status(500).json({
      status: "erro",
      detalhes: error.message,
    });
  }
};
