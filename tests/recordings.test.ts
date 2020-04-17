import axios from 'axios';

export default () => {
  it('create recording register', async () => {
    const response = await axios.post(`http://localhost:${process.env.PORT}/recordings`, {
      phone: '11911111111',
      branch: '174',
      recordedAt: '2020-04-17 12:05:35',
    });

    expect(response.status).toBe(200);
  });

  it('invalid phone number', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/recordings`, {
        phone: '123456',
        branch: '174',
        recordedAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid branch', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/recordings`, {
        phone: '11911111111',
        branch: '@!#',
        recordedAt: '2020-04-17 12:05:35',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });

  it('invalid recordedAt', async () => {
    try {
      await axios.post(`http://localhost:${process.env.PORT}/recordings`, {
        phone: '11911111111',
        branch: '174',
        recordedAt: 'Hello, world',
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      return;
    }

    expect(false).toBe(true);
  });
};
