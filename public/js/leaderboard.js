import { getLeaderboard } from './api.js';
import { formatPercentage } from './string-utils.js';
import {
  createTableRow,
  createTableData,
} from './dom-utils.js';

const ui = {};

const renderCell = function(value) {
  return createTableData(value);
};

const renderPlayerRow = function(player) {
  const {
    name,
    wins,
    losses,
    ties,
    winStreak,
  } = player;
  const winPercentage = formatPercentage(player.winPercentage);
  const rowEl = createTableRow();
  [name, wins, losses, ties, winPercentage, winStreak].forEach((cellValue) => {
    rowEl.appendChild(renderCell(cellValue));
  });
  return rowEl;
};

const renderLeaderboard = function(leaderboard) {
  ui.leaderboard.innerHTML = '';
  leaderboard.forEach((player) => {
    ui.leaderboard.appendChild(renderPlayerRow(player));
  });
};

const updateLeaderboard = function() {
  getLeaderboard()
    .then((data) => {
      renderLeaderboard(data);
    });
};

const initSelectors = function() {
  ui.leaderboard = document.querySelector('#leaderboard tbody');
};

const initLeaderboard = function() {
  initSelectors();
  updateLeaderboard();

  // every 10-seconds: poll for any updates to the leaderboard
  setInterval(updateLeaderboard, 10000);
};

export {
  initLeaderboard,
  updateLeaderboard,
};
