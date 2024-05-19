const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env.local") });

module.exports = {
  client: {
    service: {
      name: process.env.GRAPHQL_SERVICE_NAME,
      url: process.env.HTTP_GRAPHQL_ENDPOINT,
    },
    includes: ["src/graphql/**/*.graphql"],
  },
};
