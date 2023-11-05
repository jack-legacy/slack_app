const { Game } = require("@gathertown/gather-game-client");
global.WebSocket = require("isomorphic-ws");

const game = new Game(process.env.GATHER_SPACE_ID, () =>
  Promise.resolve({ apiKey: process.env.GATHER_API_KEY })
);
game.connect();

exports.game = game;
