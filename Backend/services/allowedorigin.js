const allowOrigin = {
  origin: [
    "http://localhost:3000",
    // "https://nepaldesignersandbuilders.netlify.app",
    "https://nd-nb.netlify.app/",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = allowOrigin;
