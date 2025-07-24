class TokenManager {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
    this.refreshInterval = null;
  }

  async getToken() {
    // If token exists and hasn't expired, return it
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // Otherwise, fetch a new token
    return await this.refreshToken();
  }

  async refreshToken() {
    try {
      const response = await fetch('https://atlas.propertyfinder.com/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: process.env.PROPERTY_API_KEY,
          apiSecret: process.env.PROPERTY_API_SECRET,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token refresh failed:', response.status, errorText);
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if token exists in response
      if (!data.token && !data.access_token && !data.accessToken) {
        console.error('No token found in response:', data);
        throw new Error('No token in response');
      }
      
      this.token = data.token || data.access_token || data.accessToken; // Try all possible field names
      this.tokenExpiry = Date.now() + (30 * 60 * 1000); // 30 minutes from now

      console.log('Token refreshed successfully:', this.token ? 'Token received' : 'No token');
      return this.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  startAutoRefresh() {
    // Clear existing interval if any
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // Refresh token every 29 minutes (slightly before expiry)
    this.refreshInterval = setInterval(async () => {
      try {
        await this.refreshToken();
      } catch (error) {
        console.error('Auto token refresh failed:', error);
      }
    }, 29 * 60 * 1000);
  }

  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}

// Create a singleton instance
const tokenManager = new TokenManager();

export default tokenManager;

