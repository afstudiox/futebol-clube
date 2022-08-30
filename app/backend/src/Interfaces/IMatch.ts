export interface Indexable {
  id: number;
}

export interface IBodyGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IBodyMatch extends IBodyGoals{
  homeTeam: number;
  awayTeam: number;
}

export interface IMatch extends Indexable, IBodyMatch {
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  }
  teamAway?: {
    teamName: string;
  }
}

export interface IMessage {
  message: string;
}
