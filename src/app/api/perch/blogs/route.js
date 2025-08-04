import mariadb from "mariadb";
import clientPromise from "../../../../lib/mongodb"

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

    const rows = await conn.query(`
      SELECT pci.*
      FROM wnffuczkhf.perch3_collection_items AS pci
      INNER JOIN (
        SELECT itemID, MAX(itemRev) AS maxRev
        FROM wnffuczkhf.perch3_collection_items
        GROUP BY itemID
      ) AS latest
      ON pci.itemID = latest.itemID AND pci.itemRev = latest.maxRev
      WHERE pci.itemSearch IS NOT NULL AND pci.itemSearch != '';
    `);

    // 🔥 Parse itemJSON if it exists
    const parsedRows = rows.map((row) => {
      try {
        const parsedJSON = row.itemJSON ? JSON.parse(row.itemJSON) : {};
        delete row.itemJSON;
        return { ...row, ...parsedJSON };
      } catch (e) {
        console.error("Invalid JSON:", e);
        return row;
      }
    });

    const client = await clientPromise;
    console.log(client,"-=-=--=-=-=-");
    
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection(process.env.BLOGS_COLLECTION);

    await collection.insertMany(parsedRows);

    return new Response(JSON.stringify(parsedRows), {
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
    if (conn) conn.release();
  }
}
