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

export interface IProgress {
  inProgress: boolean;
}

export interface IMatch extends Indexable, IBodyMatch, IProgress {
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
