// src/app/api/blogs/route.js
import connectDB from '../../../../lib/mongodb';
import Blog from '../../../models/Blog';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ }).sort({ itemUpdated: -1 }).lean();
    console.log(blogs,"-=-=-=-=-=-=-=-=-");
    
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}   