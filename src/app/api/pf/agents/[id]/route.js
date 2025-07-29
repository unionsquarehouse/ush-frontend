import { NextResponse } from 'next/server';
import axios from 'axios';
import tokenManager from '../../../../../lib/tokenManager';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Agent ID is required' },
        { status: 400 }
      );
    }

    const token = await tokenManager.getToken();
    if (!token) {
      throw new Error('No valid token available');
    }

    // Fetch agent data using publicProfileId
    const apiUrl = `https://atlas.propertyfinder.com/v1/users?publicProfileId=${id}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Agent API response:', response.data);

    if (!response.data.data || response.data.data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    const user = response.data.data[0];
    const profile = user.publicProfile || {};

    // Format agent data for frontend
    const formattedAgent = {
      id: user.id,
      publicProfileId: id,
      name: profile.name || `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: profile.email || user.email,
      phone: profile.phone || user.mobile,
      whatsapp: profile.whatsappPhone || user.mobile,
      phoneSecondary: profile.phoneSecondary,
      photo: profile.imageVariants?.large?.webp || 
             profile.imageVariants?.large?.default || 
             "https://via.placeholder.com/400x400?text=No+Image",
      bio: profile.bio?.primary || "",
      position: profile.position?.primary || "Real Estate Agent",
      linkedinAddress: profile.linkedinAddress,
      status: user.status,
      role: user.role?.name || "Agent",
      isSuperAgent: profile.isSuperAgent || false,
      verification: profile.verification?.status || "unverified",
      compliances: profile.compliances || [],
      callTracking: user.callTracking,
      createdAt: user.createdAt,
      // Additional profile details
      languages: profile.languages || [],
      specializations: profile.specializations || [],
      experience: profile.experience,
      awards: profile.awards || [],
      education: profile.education || []
    };

    return NextResponse.json({
      success: true,
      data: formattedAgent
    });

  } catch (error) {
    console.error("Error in agent detail API route:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agent details" },
      { status: 500 }
    );
  }
}