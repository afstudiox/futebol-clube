import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/user';

import { app } from '../app';

import { Response } from 'superagent';
import { IUser } from '../Interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

const token:string = `any-token`;

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
  })
  
  afterEach(()=>{
    sinon.restore();
  })

  it('shold return status 200', async () => {
    const response = await chai.request(app)
      .post('/login')
    expect(response.status).to.equal(200);
  });
});
