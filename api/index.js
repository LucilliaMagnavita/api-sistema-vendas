module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    mensagem: 'API da Lucillia está funcionando na Vercel!'
  });
};
