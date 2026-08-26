const express = require('express');
const app = express();

app.use(express.json());

// 1. Endpoint: Status da API
app.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API rodando perfeitamente' });
});

// 2. Endpoint: Listar usuários (Exemplo de GET com dados)
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.status(200).json(users);
});

// 3. Endpoint: Criar um item (Exemplo de POST)
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'O nome do item é obrigatório' });
  }
  res.status(201).json({ id: Date.now(), name: name, created: true });
});

// Exporta o app para os testes (sem iniciar o servidor se for importado)
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
