import dotenv from "dotenv";

dotenv.config();

const {
  PORT: port,
  ORIGIN_WHITELIST: originWhitelist,
  SWAGGER_BASIC_AUTH_USERNAME: swaggerBasicAuthUsername,
  SWAGGER_BASIC_AUTH_PASSWORD: swaggerBasicAuthPassword,
} = process.env;

export const environment = {
  port,
  originWhitelist: originWhitelist.split(","),
  swaggerAuth: {
    username: swaggerBasicAuthUsername,
    password: swaggerBasicAuthPassword,
  },
};
