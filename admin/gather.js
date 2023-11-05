const { addCronJobs } = require("../middleware/cronJob.js");
const { game } = require("../middleware/gather.js");

// 1minおきに実行される関数を登録します
const updateGather = async () => {
  const players = game.getPlayersInMap("office-socials");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(players);
  if (!players) {
    throw new Error("players is null");
  }
  // const players = game.getKnownCompletedMaps();
  console.log(players);
};
addCronJobs(updateGather);
