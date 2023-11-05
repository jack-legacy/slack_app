const { App } = require("@slack/bolt");
const { cronHandler } = require("./middleware/cronJob.js");

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
    {
      path: "/health-check",
      method: ["GET"],
      handler: (req, res) => {
        res.writeHead(200);
        res.end("Health check information displayed here!");
      },
    },
  ],
});

exports.app = app;

const { WebClient } = require("@slack/web-api");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

exports.web = web;
