const request = require('supertest');
const server = require('../src/server');
const Empresa = require('../src/models/Empresa');

describe('POST /empresa', () => {
  it('should create a new empresa', async () => {
    const empresaData = {
      nome: 'Minha Empresa',
      endereco: 'Rua Teste, 123',
      numero: '123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '19020-630',
      telefone: '(11) 1234-5678',
      whatsapp: '(11) 98765-4321',
      instagram: 'https://www.instagram.com/minhaempresa',
      facebook: 'https://www.facebook.com/minhaempresa',
      linkedin: 'https://www.linkedin.com/company/minhaempresa',
      email: 'contato@minhaempresa.com',
      latitude: -23.550520,
      longitude: -46.633309,
    };

    const response = await request(server)
      .post('/empresa')
      .send(empresaData);

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(empresaData.nome);
    expect(response.body.endereco).toBe(empresaData.endereco);
  });

  afterAll(async () => {
    await Empresa.destroy({ where: { nome: 'Minha Empresa' } });
  });
});
