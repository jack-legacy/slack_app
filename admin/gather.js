const { addCronJobs } = require("../middleware/cronJob.js");

// 1minおきに実行される関数を登録します
const hoge = async () => {
  console.log(`Hello!`);
  const result = await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(result);
};
addCronJobs(hoge);
