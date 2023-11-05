const { app } = require("./app.js");

// Load all files in the current directory
require("./loader.js");

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
