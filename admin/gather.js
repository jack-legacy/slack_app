const { Player } = require("@gathertown/gather-game-client");
const { web } = require("../app.js");
const { addCronJobs } = require("../middleware/cronJob.js");
const { game } = require("../middleware/gather.js");
const CHANNEL = "C064783DT8V";
let gatherTS = null;

/**
 * Update Slack message with players in the gather office
 *
 * @param {Array<Player>} players
 */
const updateSlackMessage = async (players) => {
  const ts = gatherTS;
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:gathertown: Gatherのオフィスにいる人たち _(最終更新: ${new Date().toLocaleString(
          "ja-JP",
          { timeZone: "Asia/Tokyo" }
        )})_ :gathertown:`,
      },
    },
    {
      type: "divider",
    },
  ];
  players.forEach((player) => {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `* ${player.name}`,
      },
    });
  });

  // メッセージを更新する
  if (ts) {
    await web.chat.update({
      channel: CHANNEL,
      ts,
      blocks,
    });
  } else {
    const result = await web.chat.postMessage({
      channel: CHANNEL,
      blocks,
    });
    gatherTS = result.ts;
  }

  // gatherTSから1ヶ月以上経過していたら、gatherTSをnullにする
  if (ts) {
    const tsDate = new Date(parseInt(ts));
    const now = new Date();
    if (now - tsDate > 60 * 60 * 24 * 30) {
      gatherTS = null;
    }
  }
};

// 1minおきに実行される関数を登録します
const updateGather = async () => {
  const players = game.getPlayersInMap("office-socials");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待つ
  if (!players) {
    throw new Error("players is null");
  }
  updateSlackMessage(players);
};
addCronJobs(updateGather);
