import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

export async function dbQuery(req, params) {
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    const result = await dbConnection.query(req, params);
    return result;
  } catch (error) {
    console.error("DBERROR", error);
    throw error;
  } finally {
    if (dbConnection) {
      dbConnection.release();
    }
  }
}
