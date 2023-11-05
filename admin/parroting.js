const { app } = require("../app.js");

// "hello "に続く文字列をオウム返しする
app.message("hello ", async ({ message, say }) => {
  // 特定のチャンネルでのみ動作するようにする
  if (message.channel != "C064783DT8V") {
    return;
  }
  // "hello "に続く文字列を取得する
  const splitted = message.text.split("hello ");
  if (splitted.length < 2) {
    return;
  }
  // オウム返しする
  await say(`<@${message.user}> ${splitted[1]}`);
});
