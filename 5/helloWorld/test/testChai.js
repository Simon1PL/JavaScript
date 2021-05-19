var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var agent = chai.request.agent('http://localhost:3000')
agent
  .post('/session')
  .send({ username: 'me', password: '123' })
  .then(function (res) {
    expect(res).to.have.cookie('sessionid');
    // The `agent` now has the sessionid cookie saved, and will send it
    // back to the server in the next request:
    return agent.get('/user/me')
      .then(function (res) {
         expect(res).to.have.status(200);
      });
  });
