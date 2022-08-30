export interface Indexable {
  id: number;
}

export interface IBodyMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoal: number;
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
