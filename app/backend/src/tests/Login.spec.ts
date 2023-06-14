import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Should be able to login', () => {
  beforeEach(sinon.restore);

  const user = new UserModel({
    id: 1,
    username: 'Xablau',
    role: 'admin',
    email: 'email@email.com',
    password: '123456'
  })

  it('Must return a token', async () => {
    const body = { email: 'email@email.com', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(user);
    
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(200);

    expect(result.body).to.haveOwnProperty('token');
  });

  it('Must return an error if password is empty', async () => {
    const body = { email: 'email@email.com', password: ''}

    sinon.stub(Model, 'findOne').resolves(user);

    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);

    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Must return an error if password is wrong', async () => {
    const body = { email: 'email@email.com', password: '13'}

    sinon.stub(Model, 'findOne').resolves(user);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);

    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });

  it('Must return an error if email is empty', async () => {
    const body = { email: '', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(user);

    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);

    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Must return an error if email is wrong', async () => {
    const body = { email: 'email', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(null);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);

    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });
});