const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../server');

test('Suíte de Testes da API', async (t) => {

  // Teste do Endpoint 1: GET /status
  await t.test('GET /status deve retornar 200 e status OK', async () => {
    const response = await request(app)
      .get('/status')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(response.body.status, 'OK');
  });

  // Teste do Endpoint 2: GET /users
  await t.test('GET /users deve retornar 200 e uma lista de usuários', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(Array.isArray(response.body), true);
    assert.strictEqual(response.body.length, 2);
    assert.strictEqual(response.body[0].name, 'Alice');
  });

  // Teste do Endpoint 3: POST /items (Caso de Sucesso)
  await t.test('POST /items deve criar um item com sucesso', async () => {
    const response = await request(app)
      .post('/items')
      .send({ name: 'Teclado Mecânico' })
      .expect('Content-Type', /json/)
      .expect(201);

    assert.strictEqual(response.body.name, 'Teclado Mecânico');
    assert.strictEqual(response.body.created, true);
  });

  // Teste do Endpoint 3: POST /items (Caso de Erro/Validação)
  await t.test('POST /items deve retornar 400 se o nome não for enviado', async () => {
    const response = await request(app)
      .post('/items')
      .send({})
      .expect(400);

    assert.strictEqual(response.body.error, 'O nome do item é obrigatório');
  });

});
