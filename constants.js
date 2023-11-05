const CHANNEL = {
  development: {
    ADMIN_GATHER: "C064783DT8V",
    ADMIN_PARROTING: "C064783DT8V",
  },
  production: {
    ADMIN_GATHER: "C064783DT8V",
    ADMIN_PARROTING: "C064783DT8V",
  },
};

if (process.env.NODE_ENV == "production") {
  exports.CHANNEL = CHANNEL.production;
} else {
  exports.CHANNEL = CHANNEL.development;
}
