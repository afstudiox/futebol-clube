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
  password: 'secret_user'
}

const userMock: IUser = {
  id: 1,
  username: 'any_name',
  role: 'any-role',
  email: 'any@email',
  password: 'any_password'
}

describe('Login', () => {
  beforeEach(()=>{
    sinon.stub(JoiService, 'validadeBodyLogin').resolves(findOneUserMock)
    sinon.stub(UserModel, 'findOne').resolves(userMock  as UserModel);
    sinon.stub(EncryptyService, 'compare').returns(true);
    sinon.stub(JwtService, 'sign').returns(token);
  })
  
  afterEach(()=>{
    sinon.restore();
  })

  it('should return token if authenticated correctly and return status 200', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(findOneUserMock)
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({token});
  });

});
