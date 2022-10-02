const ENVIRONMENT = getEnvironment();
const MONGO_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 8080;
const secret = process.env.SECRET || "not-so-secret";
const APP_URL = process.env.APP_URL || "http://localhost:8082";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = {
  PORT,
  MONGO_URL,
  secret,
  APP_URL,
  ENVIRONMENT,
  GITHUB_TOKEN,
};

function getEnvironment() {
  return process.env.ENVIRONMENT || "development";
}
