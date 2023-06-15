export const matches = [
  {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 5,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: 'Paysandu',
    },
    awayTeam: {
      teamName: 'Remo',
    },
  },
  {
    id: 2,
    homeTeamId: 3,
    awayTeamId: 4,
    homeTeamGoals: 1,
    awayTeamGoals: 5,
    inProgress: true,
    homeTeam: {
      teamName: 'Tuna',
    },
    awayTeam: {
      teamName: 'Bragantino',
    },
  }
];

export const isNotInProgressMatches = [matches[0]];

export const isInProgressMatches = [matches[1]];