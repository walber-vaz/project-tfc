import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../../src/app';
import {
  isInvalidEmailLoginBody,
  isInvalidLoginBody,
  isInvalidPasswordLoginBody,
  isLoginWithoutEmail,
  isLoginWithoutPassword,
  isValidLoginBody,
  userRegistered,
  wrongPasswordUser
} from './mocks/Login.mock';
import Token from '../api/utils/token';
import Validations from '../api/middlewares/validations';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../../src/database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Should be able to login', () => {
  it('Must be able to login', async () => {
    sinon.stub(User, 'findOne').resolves(userRegistered as any);
    sinon.stub(Token, 'sign').returns('validToken');
    sinon.stub(Validations, 'login').returns();
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isValidLoginBody);
    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
  });

  it('Not be able to login without email', async () => {
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isLoginWithoutEmail);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Not be able to login without password', async () => {
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isLoginWithoutPassword);
    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  });

  it('Not login in email invalid', async () => {
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isInvalidEmailLoginBody);
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Not login in password invalid', async () => {
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isInvalidPasswordLoginBody);
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Not login with wrong password', async () => {
    sinon.stub(User, 'findOne').resolves(wrongPasswordUser as any);
    sinon.stub(Token, 'sign').returns('validToken');
    sinon.stub(Validations, 'login').returns();
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isValidLoginBody);
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Not login with wrong email', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(Token, 'sign').returns('validToken');
    sinon.stub(Validations, 'login').returns();
    const { status, body } = await chai.request(app)
      .post('/login')
      .send(isValidLoginBody);
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  afterEach(sinon.restore);
});

describe('Routes /login/role', async () => {
  it('Must return role correct', async () => {
    sinon.stub(User, 'findOne').resolves(userRegistered as any);
    sinon.stub(Token, 'verify').returns(isValidLoginBody);
    const { role } = userRegistered;
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'validToken');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ role });
  });

  it('Return 401 if token not found', async () => {
    const { status, body } = await chai.request(app).get('/login/role');
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token not found');
  });

  it('Return 401 if token is invalid', async () => {
    sinon.stub(Token, 'verify').returns('Token must be a valid token');
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'invalidToken');
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token must be a valid token');
  });

  it('Return menssagem email invalida', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(Token, 'verify').returns(isInvalidLoginBody);
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'invalidToken');
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  afterEach(sinon.restore);
});