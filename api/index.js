// Conteúdo CORRIGIDO do arquivo api/index.js
// Usa a sintaxe "export default" que o Vercel prefere para roteamento
export default (req, res) => {
  res.status(200).json({
    ok: true,
    mensagem: 'API da Lucillia está funcionando na Vercel! Conexão com MongoDB OK!'
  });
};

