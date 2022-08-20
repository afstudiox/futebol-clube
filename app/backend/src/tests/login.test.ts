import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user';

import { Response } from 'superagent';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

const token:string = `any-token`;

describe('Login', () => {
  it('shold return status 200', async () => {
    const response = await chai.request(app)
      .post('/login')
    expect(response.status).to.equal(200);
  });
});
