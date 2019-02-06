const Bot = require('./model/Bot');
const Leaderboard = require('./model/Leaderboard');

const bot = new Bot();
const leaderboard = new Leaderboard();

const handlePostPlay = function(req, res) {
  let { name } = req.body;
  const { move } = req.body;

  name = name.toLowerCase();
  const { winStatus, botMove } = bot.play(move);

  leaderboard.updateLeaderBoard({
    name,
    winStatus,
  });

  res.json({
    name,
    winStatus,
    botMove,
  });
};

const handleFetchLeaderboard = function(req, res) {
  //
  // TODO
  //
  res.json(
    leaderboard.leadersArray
  );
};

module.exports = {
  handlePostPlay,
  handleFetchLeaderboard,
};
