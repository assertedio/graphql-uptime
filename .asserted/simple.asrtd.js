const { expect } = require('chai');
const axios = require('axios');
const HTTP_STATUS = require('http-status');

describe('simple tests', () => {
  it('get endpoint returns 200', async () => {
    const { status } = await axios.get('https://api.asserted.io/v1/echo', { validateStatus: () => true });
    expect(status).to.eql(HTTP_STATUS.OK);
  });
});
