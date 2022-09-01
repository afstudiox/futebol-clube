import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/match';

import { app } from '../app';

import { Response } from 'superagent';
import { IMatch, IBodyMatch, IBodyGoals, IMessage} from '../Interfaces/IMatch';
import JwtService from '../services/jwtService';

chai.use(chaiHttp);

const { expect } = chai;

// MOCKS
const matcheshMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    home_team: 16,
    away_team: 8,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    home_team: 9,
    away_team: 14,
    teamHome: {
      teamName: "Internacional",
    },
    teamAway: {
      teamName: "Santos",
    },
  },
]

const matcheshProgressTrueMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    home_team: 16,
    away_team: 8,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    },
  }
]

const matcheshProgressFalseMock = [
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    home_team: 9,
    away_team: 14,
    teamHome: {
      teamName: "Internacional",
    },
    teamAway: {
      teamName: "Santos",
    },
  },
]

const matcheBodyMock = {
    homeTeamGoals: 0,
    awayTeamGoals: 0
}

describe('1 - Matches Positive', () => {
  beforeEach(()=>{
    sinon.restore();
  })
  
  it('1.1 - Should return all matches no filter and return status 200', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matcheshMock as unknown as MatchModel[]);
    const response = await chai.request(app)
      .get('/matches')
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matcheshMock);
  });

  it('1.2 - Should return all matches with inProgrees filter to true and return status 200 ', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matcheshProgressTrueMock as unknown as MatchModel[]);
    const response = await chai.request(app)
      .get(`/matches?inProgress=true`)
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matcheshProgressTrueMock);
  });
  
  it('1.3 - Should return all matches with inProgrees filter to false and return status 200 ', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matcheshProgressFalseMock as unknown as MatchModel[]);
    const response = await chai.request(app)
      .get(`/matches?inProgress=false`)
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matcheshProgressFalseMock);
  });

  it('1.4 - Should updating matches that are in progress and return "Updated"', async () => {
    sinon.stub(MatchModel, 'update').resolves();
    const response = await chai.request(app)
      .patch('/matches/2')
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal('Match Update');
  });

});

// describe('2 - Authorization', () => {
//   beforeEach(()=>{
//     sinon.stub(JwtService, 'verify').returns('user@useer.com');
//     sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
//   })
  
//   afterEach(()=>{
//     sinon.restore();
//   })

//   it('2.1 - Should when validate token return status 200 ', async () => {
//     const response = await chai.request(app)
//       .get('/login/validate')
//       .set('authorization', token)
//       .send(findOneUserMock)
//       expect(response.status).to.equal(200);
//       expect(response.body).to.deep.equal({role: 'user'});
//     });
  
//   it('2.2 = Should return 401 when token not found', async () => {
//     const response = await chai.request(app)
//     .get('/login/validate')
//     .set('authorization', '')
//     expect(response.status).to.equal(401);
//   })
// });