class Player {
  constructor(name) {
    this.name = name;
    this.wins = 0;
    this.losses = 0;
    this.ties = 0;
    this.winPercentage = 0;
    this.winStreak = 0;
  }

  getStats() {
    const { wins, losses, ties } = this;
    return {
      wins,
      losses,
      ties,
    };
  }

  // winStatus will be 1, 0, or -1
  updateStats(winStatus) {
    if (winStatus === 1) {
      this.wins += 1;
      this.winStreak += 1;
    }
    if (winStatus === 0) {
      this.ties += 1;
      this.winStreak = 0;
    }
    if (winStatus === -1) {
      this.losses += 1;
      this.winStreak = 0;
    }
    this.winPercentage = this.calculateWinPercentage();
  }

  calculateWinPercentage() {
    const { wins, losses, ties } = this;
    const total = wins + losses + ties;
    return (((wins / total) * 100) / 100).toFixed(4);
  }
}

module.exports = Player;
