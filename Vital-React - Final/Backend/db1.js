import mysql from "mysql2";

let connection;

export const connectToDataBase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: previousTuesdayWithOptions.env.DB_NAME,
    });
  }
  return connection;
};
