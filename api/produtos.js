// api/produtos.js (Código Final Corrigido)

// Usamos 'import' em vez de 'require' para módulos ES, preferido pelo Vercel
import { MongoClient, ServerApiVersion } from "mongodb";

// cache de conexão (boa prática em serverless)
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGO_URI; // Chave MONGO_URI configurada na Vercel

  if (!uri) {
    // Isso é uma medida de segurança, mas você já corrigiu a URI na Vercel
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
  // Corrigido: Usamos 'vendas' que é o banco de dados definido na sua URI.
  const db = client.db("vendas"); 

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// CORREÇÃO CRÍTICA: Exportação Padrão (necessário para o roteamento da Vercel)
export default async function handler(req, res) {
  try {
    const { client, db } = await connectToDatabase();

    if (req.method === "GET") {
      const produtos = await db.collection("produtos").find().toArray();
      // Usamos return res.status(200).json() para evitar o erro "Headers already sent"
      return res.status(200).json(produtos); 
    }

    return res.status(405).json({ erro: "Método não permitido" });
  } catch (erro) {
    console.error("Erro em /api/produtos:", erro);
    // Se você receber 500 agora, o erro é quase sempre a senha (Database User)
    return res.status(500).json({ erro: "Erro de Servidor. Verifique a senha do usuário do banco.", detalhes: erro.message });
  }
};
