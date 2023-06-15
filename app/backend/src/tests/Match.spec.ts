import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/SequelizeMatch';
import { matches, isInProgressMatches, isNotInProgressMatches } from './mocks/Match.mock';
import Token from '../api/utils/token';

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

  describe('Should be able to finish a match', () => {
    it('finish a match', async () => {
      sinon.stub(Match, 'findByPk').resolves(matches[0] as any);
      sinon.stub(Match, 'update').resolves([1]);
      sinon.stub(Token, 'verify').resolves();

      const { status, body } = await chai.request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'validToken');

      expect(status).to.be.equal(200);
      expect(body.message).to.be.equal('Finished');
    });

    it('returns an error message if the match is not found', async () => {
      sinon.stub(Match, 'findByPk').resolves(null);
      sinon.stub(Token, 'verify').resolves();

      const { status, body } = await chai.request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'validToken');

      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Match not found');
    });

    it('returns an error message if the match is already finished', async () => {
      const { status, body } = await chai.request(app).patch('/matches/1/finish');

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token not found');
    });

    it('returns an error message if the token is invalid', async () => {
      sinon.stub(Token, 'verify').returns('Token must be a valid token');

      const { status, body } = await chai.request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'invalidToken');

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token must be a valid token');
    });
  });

  describe('Should be able to update a match', () => {
    const updatedGoals = {
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    };

    it('update a match', async () => {
      sinon.stub(Match, 'findByPk').resolves(matches[0] as any);
      sinon.stub(Match, 'update').resolves([1]);
      sinon.stub(Token, 'verify').resolves();

      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', 'validToken')
        .send(updatedGoals);

      expect(status).to.be.equal(200);
      expect(body.message).to.be.equal('Updated');
    });

    it('return an error message if the match is not found', async () => {
      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .send(updatedGoals);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token not found');
    });

    it('return an error message if the token is invalid', async () => {
      sinon.stub(Token, 'verify').returns('Token must be a valid token');

      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', 'invalidToken')
        .send(updatedGoals);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token must be a valid token');
    });

    it('return an error message if the match is already finished', async () => {
      sinon.stub(Match, 'findByPk').resolves(null);
      sinon.stub(Token, 'verify').resolves();

      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', 'validToken')
        .send(updatedGoals);

      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Match not found');
    });
  });

  afterEach(sinon.restore);
});