import axios from 'axios';

export default () => {
  it('create tabulation register', async () => {
    const response = await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
      clientName: 'João Paulo',
      binedPhone: '11911111111',
      accessPhone: '11911111111',
      protocol: Math.random().toString(36).substring(7),
      calledAt: '2020-04-17 12:05:35',
    });

    expect(response.status).toBe(200);
  });

  it('invalid client name', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
        clientName: null,
        binedPhone: '11111',
        accessPhone: '11911111111',
        protocol: 'C202004002',
        calledAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid bined phone number', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
        clientName: 'João Paulo',
        binedPhone: '11111',
        accessPhone: '11911111111',
        protocol: 'C202004002',
        calledAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid access phone number', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
        clientName: 'João Paulo',
        binedPhone: '11911111111',
        accessPhone: '111111',
        protocol: 'C202004002',
        calledAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid protocol', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
        clientName: 'João Paulo',
        binedPhone: '11911111111',
        accessPhone: '111111',
        protocol: '@!#!@#',
        calledAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid protocol', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
        clientName: 'João Paulo',
        binedPhone: '11911111111',
        accessPhone: '111111',
        protocol: '@!#!@#',
        calledAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid recordedAt', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/tabulations`, {
        clientName: 'João Paulo',
        binedPhone: '11911111111',
        accessPhone: '111111',
        protocol: '@!#!@#',
        calledAt: 'Hello, world',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });
};
