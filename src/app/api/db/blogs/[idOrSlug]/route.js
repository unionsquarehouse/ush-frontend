// src/app/api/db/blogs/[idOrSlug]/route.js
import connectDB from '../../../../../lib/mongodb';
import Blog from '../../../../models/Blog';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Helper to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { idOrSlug } = params; // Extract idOrSlug from URL path

    if (!idOrSlug) {
      return NextResponse.json(
        { success: false, error: 'Please provide an id or slug' },
        { status: 400 }
      );
    }

    let blog;
    // Check if idOrSlug is a valid ObjectId
    if (isValidObjectId(idOrSlug)) {
      blog = await Blog.findOne({ _id: idOrSlug, status: 'published' }).lean();
    } else {
      // Treat as slug
      blog = await Blog.findOne({ slug: idOrSlug, status: 'published' }).lean();
    }

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}