
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, { params }) {
  try {
    const { idOrSlug } = params; // Extract slug from URL path

    if (!idOrSlug) {
      return NextResponse.json(
        { success: false, error: 'Please provide a slug' },
        { status: 400 }
      );
    }

    // Build Strapi API URL for a single blog by slug
    const strapiUrl = new URL(`${process.env.STRAPI_BASE_URL || 'http://localhost:1337'}/api/blogs`);
    strapiUrl.searchParams.append('filters[slug][$eq]', idOrSlug);
    strapiUrl.searchParams.append('populate', 'image,blocks,seo'); // Populate image, blocks, and seo

    console.log('Fetching from Strapi:', strapiUrl.toString());

    const response = await axios.get(strapiUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    if (!data.data || data.data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const blog = data.data[0]; // First matching blog
    const attributes = blog.attributes;

    // Transform Strapi data to match frontend expectations
    const transformedData = {
      id: blog.id,
      slug: attributes.slug,
      title: attributes.title,
      desc: attributes.desc,
      excerpt: attributes.excerpt || '',
      image: attributes.image?.data ? `${process.env.STRAPI_BASE_URL || 'http://localhost:1337'}${attributes.image.data.attributes.url}` : null,
      image_alt: attributes.image?.data?.attributes?.alternativeText || attributes.title,
      author: attributes.authorName || 'Admin',
      authorBio: attributes.authorBio || '',
      category: attributes.category || 'General',
      readMinutes: attributes.readMinutes || 1,
      featured: attributes.featured || false,
      blocks: attributes.blocks || [],
      dateTime: attributes.publishedAt || attributes.createdAt,
      itemUpdated: attributes.updatedAt,
      itemUpdatedBy: attributes.authorName || 'Admin',
      status: attributes.publishedAt ? 'published' : 'draft',
      seo: attributes.seo || null,
    };

    return NextResponse.json({ success: true, data: transformedData });
  } catch (error) {
    console.error('Error fetching blog from Strapi:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}