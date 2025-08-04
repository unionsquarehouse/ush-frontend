// app/api/blogs/route.js
import clientPromise from "../../../../lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME); // use your DB name
    const blogs = await db.collection(process.env.BLOGS_COLLECTION).find({}).sort({ publishedAt: -1 }).toArray();

    return Response.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}
