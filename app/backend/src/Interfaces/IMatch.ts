export interface Indexable {
  id: number;
}

export interface IMatch extends Indexable {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoal: number;
  inProgress: number;
  teamHome?: {
    teamName: string;
  }
  teamAway?: {
    teamName: string;
  }
}
