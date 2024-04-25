function start() {
  const members = [
    "1",
    "2",
    "3",
    "4"
  ]

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createTeams(members: string[], teamSize: number = 1): string[][] {
  const shuffledMembers = shuffleArray(members);

  const teams: string[][] = [];

  for (let i = 0; i < shuffledMembers.length; i += teamSize) {
    teams.push(shuffledMembers.slice(i, i + teamSize));
  }

  return teams;
}

const teams = createTeams(members);

console.log('Times formados:', teams);
}

Array.from({length: 5}).map(_ => start())
