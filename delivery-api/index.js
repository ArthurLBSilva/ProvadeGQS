const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let pedidos = [];
let rotas = [];

// GET /pedidos - Retorna uma lista de pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// POST /pedidos - Cria um novo pedido
app.post('/pedidos', (req, res) => {
  const { endereco, latitude, longitude, produto, quantidade } = req.body;
  const novoPedido = { id: pedidos.length + 1, endereco, latitude, longitude, produto, quantidade };
  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

// GET /rotas - Retorna uma lista de rotas
app.get('/rotas', (req, res) => {
  res.json(rotas);
});

// POST /rotas - Cria uma nova rota
app.post('/rotas', (req, res) => {
  const { latitude, longitude } = req.body;
  const novaRota = { id: rotas.length + 1, latitude, longitude };
  rotas.push(novaRota);
  res.status(201).json(novaRota);
});

// GET /melhor-rota/:id - Verifica a melhor rota de entrega para os pedidos
app.get('/melhor-rota/:id', (req, res) => {
  const { id } = req.params;
  const rota = rotas.find(r => r.id == id);

  if (!rota) {
    return res.status(404).json({ error: 'Rota não encontrada' });
  }

  // Lógica fictícia para calcular a melhor rota
  const melhorRota = pedidos.map(pedido => {
    return {
      pedidoId: pedido.id,
      distancia: Math.sqrt(
        Math.pow(pedido.latitude - rota.latitude, 2) + Math.pow(pedido.longitude - rota.longitude, 2)
      )
    };
  }).sort((a, b) => a.distancia - b.distancia);

  res.json(melhorRota);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

module.exports = app;
