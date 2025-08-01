// import mariadb from "mariadb";

// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: "wnffuczkhf",
//   port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
//   connectionLimit: 5,
// });

// export async function GET() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     const rows = await conn.query(`SELECT pci.*
// FROM wnffuczkhf.perch3_collection_items AS pci
// INNER JOIN (
//   SELECT itemID, MAX(itemRev) AS maxRev
//   FROM wnffuczkhf.perch3_collection_items
//   GROUP BY itemID
// ) AS latest
// ON pci.itemID = latest.itemID AND pci.itemRev = latest.maxRev;
// `);

//     // Process each row to extract and parse itemJSON
//     // const processedRows = rows.map((row) => {
//     //   let parsedJSON = {};

//     //   try {
//     //     if (row.itemJSON && row.itemJSON.trim() !== "") {
//     //       parsedJSON = JSON.parse(row.itemJSON);
//     //     }
//     //   } catch (e) {
//     //     console.error("Error parsing itemJSON for itemID", row.itemID, ":", e);
//     //     parsedJSON = {};
//     //   }

//     //   // Helper function to extract text from Perch objects
//     //   const extractText = (field) => {
//     //     if (!field) return "";
//     //     if (typeof field === "string") return field;
//     //     if (typeof field === "object") {
//     //       // Handle Perch field objects
//     //       if (field.processed) return field.processed;
//     //       if (field.raw) return field.raw;

//     //       // Handle arrays
//     //       if (Array.isArray(field)) {
//     //         return field.map((item) => extractText(item)).join(", ");
//     //       }

//     //       // Handle nested objects - convert to JSON string or extract meaningful data
//     //       if (field._flang || field.value !== undefined) {
//     //         return field.value || field.processed || field.raw || "";
//     //       }

//     //       // For other objects, try to extract meaningful content
//     //       const keys = Object.keys(field);
//     //       if (keys.length > 0) {
//     //         // If it's a simple object with text values, join them
//     //         const values = keys
//     //           .map((key) => {
//     //             const val = field[key];
//     //             if (typeof val === "string") return val;
//     //             if (typeof val === "object" && val !== null && val.processed)
//     //               return val.processed;
//     //             if (typeof val === "object" && val !== null && val.raw)
//     //               return val.raw;
//     //             return "";
//     //           })
//     //           .filter(Boolean);

//     //         if (values.length > 0) {
//     //           return values.join(", ");
//     //         }

//     //         // Fallback: return JSON string for complex objects
//     //         return JSON.stringify(field);
//     //       }
//     //     }
//     //     if (typeof field === "number" || typeof field === "boolean") {
//     //       return String(field);
//     //     }
//     //     return "";
//     //   };

//     //   // Extract all key-value pairs from itemJSON
//     //   const extractedFields = {};
//     //   Object.keys(parsedJSON).forEach((key) => {
//     //     extractedFields[key] = extractText(parsedJSON[key]);
//     //   });

//     //   return {
//     //     itemID: row.itemID,
//     //     collectionID: row.collectionID,
//     //     extractedFields: extractedFields, // Processed key-value pairs
//     //     itemSearch: row.itemSearch,
//     //     itemUpdated: row.itemUpdated,
//     //     itemUpdatedBy: row.itemUpdatedBy,
//     //   };
//     // });

//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("MariaDB query error:", err);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   } finally {
//     if (conn) conn.release();
//   }
// }

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
