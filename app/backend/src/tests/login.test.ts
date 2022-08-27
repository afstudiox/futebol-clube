import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/user';
import EncryptyService from '../services/encriptService';

import { app } from '../app';

import { Response } from 'superagent';
import { IUser, ILogin } from '../Interfaces/IUser';
import JwtService from '../services/jwtService';
import JoiService from '../services/joiServices';

chai.use(chaiHttp);

const { expect } = chai;

const token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NjEzNjc0MjN9.6YWtLdxTJ6iuY8vy3y4FBi4ehOKk8-dEDzCK1RQmN1M';

const findOneUserMock: ILogin = {
  email: 'user@user.com',
  password: 'secret_user'
}

const userMock: IUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const roleMock = {
  role: 'user',
}

describe('1 - Login', () => {
  beforeEach(()=>{
    sinon.stub(JoiService, 'validadeBodyLogin').resolves(findOneUserMock);
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    sinon.stub(EncryptyService, 'compare').returns(true);
    sinon.stub(JwtService, 'sign').returns(token);
  })
  
  afterEach(()=>{
    sinon.restore();
  })

  it('1.1 - Should return token if authenticated correctly and return status 200', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(findOneUserMock)
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({token});
    });
    
});

describe('2 - Authorization', () => {
  beforeEach(()=>{
    sinon.stub(JwtService, 'verify').returns('user@useer.com');
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
  })
  
  afterEach(()=>{
    sinon.restore();
  })

  it('2.1 - Should when validate token return status 200 ', async () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', token)
      .send(findOneUserMock)
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({role: 'user'});
    });
  
  it('2.2 = Should return 401 when token not found', async () => {
    const response = await chai.request(app)
    .get('/login/validate')
    .set('authorization', '')
    expect(response.status).to.equal(401);
  })
});


