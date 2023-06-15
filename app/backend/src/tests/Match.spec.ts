import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/SequelizeMatch';
import { matches, isInProgressMatches, isNotInProgressMatches } from './mocks/Match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Should be able to get all matches', () => {
  it('Return all matches', async () => {
    sinon.stub(Match, 'findAll').resolves(matches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matches);
  });

  it('Should be able to get all matcher in progress', async () => {
    sinon.stub(Match, 'findAll').resolves(isInProgressMatches as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(isInProgressMatches);
  });

  it('Should be able to get all matches not in progress', async () => {
    sinon.stub(Match, 'findAll').resolves(isNotInProgressMatches as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(isNotInProgressMatches);
  });

  afterEach(sinon.restore);
});