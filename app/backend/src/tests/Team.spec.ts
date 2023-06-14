import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Should return a response', () => {
  it('Must return all teams', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it('Must return one tema', async () => {
    sinon.stub(Team, 'findOne').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });
});