const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rota principal raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Rota de sugestão via query string
app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;
  const respostaHTML = `
    <h1>Obrigado pela sugestão!</h1>
    <p><strong>Nome do lanche:</strong> ${nome}</p>
    <p><strong>Ingredientes:</strong> ${ingredientes}</p>
    <a href="/">Voltar</a>
  `;
  res.send(respostaHTML);
});

// Rota para exibir contato.html
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/contato.html'));
});

// Rota para processar formulário de contato
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  const respostaHTML = `
    <h1>Mensagem recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar</a>
  `;
  res.send(respostaHTML);
});

// API 
app.get('/api/lanches', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/data/lanches.json'));
});




app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
