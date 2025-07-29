
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, { params }) {
  try {
    const { id } = params; // documentId

    const strapiUrl = `${process.env.STRAPI_URL || 'http://localhost:1337'}/api/blogs/${id}?populate=image&populate=authorImage`;

    console.log('Fetching single blog from Strapi:', strapiUrl);

    const response = await axios.get(strapiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    console.log('Strapi single blog response:', data);

    // Transform single blog data
    const blog = data.data;
    const transformedData = {
      id: blog.id,
      documentId: blog.documentId,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      authorBio: blog.authorBio,
      date: blog.date,
      category: blog.category,
      readTime: blog.readTime,
      featured: blog.featured,
      views: 1250, // Default value
      image: blog.image ? `${process.env.STRAPI_URL || 'http://localhost:1337'}${blog.image.url}` : null,
      authorImage: blog.authorImage ? `${process.env.STRAPI_URL || 'http://localhost:1337'}${blog.authorImage.url}` : null,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      publishedAt: blog.publishedAt,
    };

    return NextResponse.json({
      success: true,
      data: transformedData
    });

  } catch (error) {
    console.error('Error fetching blog from Strapi:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

