import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Should return a response', () => {
  it('Must in route /', async () => {
    const { body } = await chai.request(app).get('/');
    expect(body).to.be.deep.equal({ ok: true });
  });
});