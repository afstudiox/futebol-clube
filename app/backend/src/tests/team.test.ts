import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/team';

import { app } from '../app';

import { Response } from 'superagent';
import { ITeam } from '../Interfaces/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam =   {
  "id": 16,
  teamName: "São Paulo"
}

const teamsMock: ITeam[] = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
  {
    id: 4,
    teamName: "Corinthians"
  },
  {
    id: 5,
    teamName: "Cruzeiro"
  },
]

describe('Team', () => {
  afterEach(()=>{
    sinon.restore();
  })

  it('should return a list of teams and return status 200', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
    const response = await chai.request(app)
      .get('/teams')
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });

  it('should return a team and return status 200', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(teamMock as TeamModel);
    const response = await chai.request(app)
      .get('/teams/16')
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamMock);
  });

});
