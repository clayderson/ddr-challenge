import axios from 'axios';

export default () => {
  it('list all matchings records', async () => {
    const response = await axios.get(`http://localhost:${process.env.PORT}/matchings`);
    expect(response.status).toBe(200);
  });
};
