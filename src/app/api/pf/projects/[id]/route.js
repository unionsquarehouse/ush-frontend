import axios from 'axios';
import { NextResponse } from 'next/server';
import tokenManager from '../../../../../lib/tokenManager';

// Reuse your location resolver
async function getLocationDetails(locationId) {
  if (!locationId) return 'Dubai';
  console.log(locationId,"locationid");
  
  try {
    const locationRes = await axios.get(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/pf/locations?id=${locationId}`,
      { timeout: 5000 }
    );

    if (locationRes.data.success && locationRes.data.data) {
      return locationRes.data.data.hierarchy;
    }

    return 'Dubai';
  } catch (error) {
    console.error('Error getting location:', error.message);
    return 'Dubai';
  }
}

export async function GET(req, { params }) {
  const { id } = await params;
    console.log("reached",id);
    
  try {
    const token = await tokenManager.getToken();
    if (!token) throw new Error("No valid token available");

    const response = await axios.get(
      `https://atlas.propertyfinder.com/v1/listings?filter[ids]=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const item = response.data.results?.[0];
    if (!item) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const location = await getLocationDetails(item.location?.id);
    console.log(location,"location");
    
    // Format similar to your projects list
    // const formatted = {
    //   id: item.id,
    //   title: item.title.en,
    //   location,
    //   locationId: item.location?.id,
    //   info: item.description?.en?.slice(0, 100) || "",
    //   price: item.price?.amounts?.sale || 0,
    //   beds: parseInt(item.bedrooms) || 0,
    //   baths: parseInt(item.bathrooms) || 0,
    //   area: item.size,
    //   color: "#e5d2b1",
    //   features: item.amenities || [],
    //   image: item.media?.images?.[0]?.original?.url || "https://via.placeholder.com/400x300?text=No+Image",
    //   status: item.projectStatus || item.status || "Available",
    //   type: item.type || item.category || "Apartment",
    //   category: item.category || "residential",
    //   completionStatus: item.completionStatus || item.projectStatus || item.status || "Ready",
    //   offeringType: item.offeringType,
    //   developer: item.developer || "Not Specified",
    // };

    const formattedData={
      location,
      data:item
    }

    return NextResponse.json({ success: true, data: formattedData });

  } catch (err) {
    console.error("Error fetching project:", err.message);
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
  }
}
