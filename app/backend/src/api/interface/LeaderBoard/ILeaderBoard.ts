export interface ILeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface ILeaderBoardDB {
  awayTeam?: { teamName: string; };
  homeTeam?: { teamName: string; };
  dataValues: {
    totalGames: number;
    totalVictories: number;
    totalLosses: number;
    totalDraws: number;
    goalsFavor: number;
    goalsOwn: number;
  };
}
