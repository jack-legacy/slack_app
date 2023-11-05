/**
 * Array of functions to be run at cron interval
 *
 * @type {Array<() => Promise<void>>}
 */
const cronJobs = [];

/**
 * Add a function to be run at cron interval
 *
 * @param {() => Promise<void>} callback
 */
const addCronJobs = (callback) => {
  cronJobs.push(callback);
};

const cronHandler = (req, res) => {
  Promise.allSettled(cronJobs.map((callback) => callback())).then((results) => {
    results.forEach((result) => {
      if (result.status === "rejected") {
        console.error(result.reason);
      } else {
        console.log(result.value);
      }
    });
    res.writeHead(200);
    res.end(`Things are going just fine at ${req.headers.host}!\n`);
  });
};

exports.addCronJobs = addCronJobs;
exports.cronHandler = cronHandler;
