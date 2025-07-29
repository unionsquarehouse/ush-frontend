import tokenManager from '../../../../lib/tokenManager';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = parseInt(searchParams.get('limit') || '20');

    const token = await tokenManager.getToken();

    if (!token) {
      throw new Error('No valid token available');
    }

    const res = await axios.get(
      `https://atlas.propertyfinder.com/v1/users?page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const json = res.data;

    // Format agents data for frontend
    const formattedAgents = json.data.map((user) => {
      const profile = user.publicProfile;
      
      return {
        id: user.id,
        name: profile?.name || `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: profile?.email || user.email,
        phone: profile?.phone || user.mobile,
        whatsapp: profile?.whatsappPhone || user.mobile,
        phoneSecondary: profile?.phoneSecondary,
        photo: profile?.imageVariants?.large?.webp || 
               profile?.imageVariants?.large?.default || 
               "https://via.placeholder.com/400x400?text=No+Image",
        bio: profile?.bio?.primary || "",
        position: profile?.position?.primary || "Real Estate Agent",
        linkedinAddress: profile?.linkedinAddress,
        status: user.status,
        role: user.role?.name || "Agent",
        isSuperAgent: profile?.isSuperAgent || false,
        verification: profile?.verification?.status || "unverified",
        compliances: profile?.compliances || [],
        callTracking: user.callTracking,
        createdAt: user.createdAt
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedAgents,
      pagination: json.pagination
    });

  } catch (error) {
    console.error("Error in agents API route:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}