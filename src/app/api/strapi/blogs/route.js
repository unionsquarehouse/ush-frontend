
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '25';
    const category = searchParams.get('category') || '';
    const author = searchParams.get('author') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'createdAt:desc';

    // Build Strapi API URL
    const strapiUrl = new URL(`${process.env.STRAPI_BASE_URL || 'http://localhost:1337'}/api/blogs`);
    
    // Add population parameters separately
    strapiUrl.searchParams.append('populate', 'image');
    strapiUrl.searchParams.append('populate', 'blocks');
    strapiUrl.searchParams.append('populate', 'seo');
    // strapiUrl.searchParams.append('populate', 'authorImage');
    
    // Add pagination
    strapiUrl.searchParams.set('pagination[page]', page);
    strapiUrl.searchParams.set('pagination[pageSize]', pageSize);
    
    // Add sorting
    strapiUrl.searchParams.set('sort', sort);
    
    // Add filters
    if (category) {
      strapiUrl.searchParams.set('filters[category][$eq]', category);
    }
    
    if (author) {
      strapiUrl.searchParams.set('filters[author][$eq]', author);
    }
    
    if (search) {
      strapiUrl.searchParams.set('filters[$or][0][title][$containsi]', search);
      strapiUrl.searchParams.set('filters[$or][1][excerpt][$containsi]', search);
      strapiUrl.searchParams.set('filters[$or][2][content][$containsi]', search);
    }

    console.log('Fetching from Strapi:', strapiUrl.toString());

    const response = await axios.get(strapiUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    console.log('Strapi response data:', data);

    // Transform Strapi data to match frontend expectations
    const transformedData = data.data.map(blog => ({
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
      views: 1250, // Default value since not in Strapi
      image: blog.image ? `${process.env.STRAPI_BASE_URL}${blog.image.url}` : null,
      authorImage: blog.authorImage ? `${process.env.STRAPI_BASE_URL}${blog.authorImage.url}` : null,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      publishedAt: blog.publishedAt,
       slug: blog.slug,
        blocks: blog.blocks || [],
        seo: blog.seo || null,
    }));

    return NextResponse.json({
      success: true,
      data: transformedData,
      meta: data.meta
    });

  } catch (error) {
    console.error('Error fetching blogs from Strapi:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blogs',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

