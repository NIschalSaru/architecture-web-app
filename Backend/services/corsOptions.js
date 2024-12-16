const allowOrigin = require("./allowedorigin");

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = allowOrigin[0].origin;
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: allowOrigin[0].methods,
  credentials: true,
  preflightContinue: allowOrigin[0].preflightContinue,
  optionsSuccessStatus: allowOrigin[0].optionsSuccessStatus,
};

module.exports = corsOptions;
