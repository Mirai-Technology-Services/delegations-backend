export const env = {
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: parseInt(process.env.DB_PORT || "5432", 10),
  dbUsername: process.env.DB_USERNAME,
  dbDatabase: process.env.DB_DATABASE,
  port: parseInt(process.env.PORT || "3000", 10),
};
