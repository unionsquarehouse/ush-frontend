import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "wnffuczkhf",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  connectionLimit: 5,
});

export async function GET() {
  let conn;
  try {
    conn = await pool.getConnection();

    const rows = await conn.query(`SELECT pci.*
FROM wnffuczkhf.perch3_collection_items AS pci
INNER JOIN (
  SELECT itemID, MAX(itemRev) AS maxRev
  FROM wnffuczkhf.perch3_collection_items
  GROUP BY itemID
) AS latest
ON pci.itemID = latest.itemID AND pci.itemRev = latest.maxRev;
`);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("MariaDB query error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    if (conn) conn.release(); // release connection back to pool
  }
}
