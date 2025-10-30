// Geolocation utilities

interface GeoLocation {
  country: string;
  countryCode: string;
  city?: string;
}

export async function getLocationFromIP(ip: string): Promise<GeoLocation> {
  // Skip geolocation for localhost/private IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return {
      country: 'Localhost',
      countryCode: 'LO',
    };
  }

  try {
    // Use ipapi.co for free IP geolocation
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Geolocation API failed');
    }

    const data = await response.json();

    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'Unknown',
      city: data.city,
    };
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return {
      country: 'Unknown',
      countryCode: 'Unknown',
    };
  }
}

