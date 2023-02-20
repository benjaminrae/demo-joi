import dotenv from "dotenv";

dotenv.config();

const {
  PORT: port,
  ORIGIN_WHITELIST: originWhitelist,
  SWAGGER_BASIC_AUTH_USERNAME: swaggerBasicAuthUsername,
  SWAGGER_BASIC_AUTH_PASSWORD: swaggerBasicAuthPassword,
  APP_NAME: appName,
  MONGO_DB_DEBUG: mongoDbDebug,
  MONGO_DB_URI: mongoDbUri,
  JWT_SECRET: jwtSecret,
} = process.env;

export const environment = {
  port,
  originWhitelist: originWhitelist.split(","),
  swaggerAuth: {
    username: swaggerBasicAuthUsername,
    password: swaggerBasicAuthPassword,
  },
  appName,
  mongoDbDebug: mongoDbDebug === "true",
  mongoDbUri,
  jwtSecret,
};
