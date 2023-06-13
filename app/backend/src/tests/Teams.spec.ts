import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import TeamsService from '../services/TeamsService';

import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect, request } = chai;

const listTeamsMock: TeamsModel[] = [
  new TeamsModel({ id: 1, teamName: 'Remo', }),
  new TeamsModel({ id: 2, teamName: 'Paysandu', }),
];

describe('Should be returned all the teams', () => {
  beforeEach(sinon.restore);

  it('Must be returned all the teams', async () => {
    sinon.stub(Model, 'findAll').resolves(listTeamsMock);
    const service = new TeamsService();
    const result = await service.findAll();

    expect(result).to.be.equal(listTeamsMock);
    expect(result.length).to.be.equal(2);
  });

  it('Must be returned one team', async () => {
    sinon.stub(Model, 'findByPk').resolves(listTeamsMock[0]);
    const service = new TeamsService();
    const result = await service.findById(1);

    expect(result).to.be.equal(listTeamsMock[0]);
  });
});

describe('Should be returned all the teams', () => {
  beforeEach(sinon.restore);

  it('Must be returned all the teams', async () => {
    sinon.stub(Model, 'findAll').resolves(listTeamsMock);
    const result = await request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(listTeamsMock);
  });

  it('Must be returned one team', async () => {
    sinon.stub(Model, 'findByPk').resolves(listTeamsMock[0]);
    const result = await request(app).get('/teams/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(listTeamsMock[0]);
  });
});