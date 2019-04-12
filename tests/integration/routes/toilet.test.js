const request = require('supertest');
const Toilet = require('../../../models/toilet');
const server = require('../../../api/server');

describe('/api/toilet', () => {
  afterAll(async () => {
    await Toilet.flush();
  });

  describe('GET /', () => {
    it('should return all turds', async () => {
      await Toilet.drop({
        shape: 'like a juicy meatball',
        smells: 'rancid',
        colour: 'orange'
      });

      const res = await request(server).get('/api/toilet');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body.find(t => t.colour === 'orange')).toBeDefined();
    });
  });

  describe('GET /:id', () => {
    it('should return a turd if it can be found', async () => {
      const [turd] = await Toilet.sniffBy({ smells: 'rancid' });
      const res = await request(server).get(`/api/toilet/${turd.id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('shape', turd.shape);
    });

    it('should return 404 if no turd with the description exists', async () => {
      const res = await request(server).get('/api/toilet/2');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 400 if turd is half-formed', async () => {
      const mysteryTurd = { bloody: true };
      const res = await request(server).post('/api/toilet').send(mysteryTurd);

      expect(res.status).toBe(400);
    });

    it('should drop the turd if it is fully-formed', async () => {
      const turdSprinkler = { shape: 'sprinkly', smells: 'vomit', colour: 'green' };
      await request(server).post('/api/toilet').send(turdSprinkler);
      const [turd] = await Toilet.sniffBy({ smells: 'vomit' });

      expect(turd).toBeDefined();
      expect(turd).toMatchObject(turdSprinkler);
    });
  });

  describe('PUT /:id', () => {
    it('should return 400 if turd mixer is half-formed', async () => {
      const mysteryTurd = { bloody: true };
      const res = await request(server).put('/api/toilet/2').send(mysteryTurd);

      expect(res.status).toBe(400);
    });

    it('should return 404 if no turd could be mixed', async () => {
      const turdMixer = { shape: 'mushed', smells: 'mouldy', colour: 'brownish' };
      const res = await request(server).put('/api/toilet/3').send(turdMixer);
      expect(res.status).toBe(404);
    });

    it('should mix the turds if they\'re fully-formed', async () => {
      const turdMixer = { shape: 'mushed', smells: 'mouldy', colour: 'brownish' };
      await request(server).put('/api/toilet/2').send(turdMixer);
      const [mixedTurd] = await Toilet.sniffById(2);
      expect(mixedTurd).toHaveProperty('shape', 'mushed');
    });
  });

  describe('DELETE /:id', () => {
    it('should return 404 if no turd with the description exists', async () => {
      const res = await request(server).delete('/api/toilet/3');
      expect(res.status).toBe(404);
    });

    it('should liquefy the turd if it is found', async () => {
      const res = await request(server).delete('/api/toilet/2');
      expect(res.status).toBe(204);
    });
  });
});
