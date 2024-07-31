const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {
  it('GET /pedidos - Deve retornar a lista de pedidos', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /pedidos - Deve criar um novo pedido', async () => {
    const newPedido = {
      endereco: { rua: 'Rua 1', numero: 123 },
      latitude: -23.5505,
      longitude: -46.6333,
      produto: 'Produto 1',
      quantidade: 2
    };
    const response = await request(app).post('/pedidos').send(newPedido);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe(1);
    expect(response.body.produto).toBe('Produto 1');
  });

  it('GET /rotas - Deve retornar a lista de rotas', async () => {
    const response = await request(app).get('/rotas');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /rotas - Deve criar uma nova rota', async () => {
    const newRota = {
      latitude: -23.5505,
      longitude: -46.6333
    };
    const response = await request(app).post('/rotas').send(newRota);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe(1);
    expect(response.body.latitude).toBe(-23.5505);
  });

  it('GET /melhor-rota/:id - Deve retornar a melhor rota de entrega', async () => {
    // Primeiro cria um pedido e uma rota
    const newPedido = {
      endereco: { rua: 'Rua 1', numero: 123 },
      latitude: -23.5505,
      longitude: -46.6333,
      produto: 'Produto 1',
      quantidade: 2
    };
    await request(app).post('/pedidos').send(newPedido);

    const newRota = {
      latitude: -23.5505,
      longitude: -46.6333
    };
    const rotaResponse = await request(app).post('/rotas').send(newRota);

    const response = await request(app).get(`/melhor-rota/${rotaResponse.body.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].pedidoId).toBe(1);
  });
});
