const { app } = require("../app.js");
const { CHANNEL } = require("../constants.js");

// じゃっくんが挨拶してくれる
app.message(
  /^じゃっくん[!！]*こんにち(わ|は)[!！]*/,
  async ({ message, say }) => {
    // 特定のチャンネルでのみ動作するようにする
    if (message.channel != CHANNEL.ADMIN_GREETING) {
      return;
    }
    // オウム返しする
    await say(`<@${message.user}> こんにちわ！`);
  }
);
