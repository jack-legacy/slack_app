const { App } = require("@slack/bolt");
const { cronHandler } = require("./middleware/cronJob.js");

// Load all files in the current directory
require("./loader.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  customRoutes: [
    // 1分おきにリクエストが来るエンドポイント
    // 定期実行を可能にするためのもの
    {
      path: "/cron/1",
      method: ["GET"],
      handler: cronHandler,
    },
  ],
});

// "hello" を含むメッセージをリッスンします
app.message("hello", async ({ message, say }) => {
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
