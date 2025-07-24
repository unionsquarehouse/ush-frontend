import tokenManager from '@/lib/tokenManager';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Start auto-refresh
    tokenManager.startAutoRefresh();
    
    // Get initial token
    await tokenManager.getToken();
    
    return NextResponse.json({ success: true, message: 'Token manager initialized' });
  } catch (error) {
    console.error('Failed to initialize token manager:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize token manager' },
      { status: 500 }
    );
  }
} 