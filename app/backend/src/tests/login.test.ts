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

const token:string = `any-token`;

const findOneUserMock: ILogin = {
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const userMock: IUser = {
  id: 1,
  username: 'any_name',
  role: 'any-role',
  email: 'any_email',
  password: 'any_password'
}

describe('Login', () => {
  beforeEach(()=>{
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    sinon.stub(JoiService, 'validadeBodyLogin').resolves(findOneUserMock)
    sinon.stub(EncryptyService, 'compare').returns(true);
    sinon.stub(JwtService, 'sign').returns(token);
  })
  
  afterEach(()=>{
    sinon.restore();
  })

  it('shold return status 200', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(findOneUserMock)
    expect(response.status).to.equal(200);
  });

  it('should return token if authenticated correctly', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(findOneUserMock)
    expect(response.body).to.deep.equal({token});
  })
});
