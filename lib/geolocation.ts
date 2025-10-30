// Geolocation utilities

interface GeoLocation {
  country: string;
  countryCode: string;
  city?: string;
}

// Comprehensive country code to name mapping
const COUNTRY_NAMES: Record<string, string> = {
  'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia',
  'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
  'BE': 'Belgium', 'CH': 'Switzerland', 'AT': 'Austria', 'SE': 'Sweden', 'NO': 'Norway',
  'DK': 'Denmark', 'FI': 'Finland', 'PL': 'Poland', 'IE': 'Ireland', 'PT': 'Portugal',
  'GR': 'Greece', 'CZ': 'Czech Republic', 'HU': 'Hungary', 'RO': 'Romania', 'BG': 'Bulgaria',
  'HR': 'Croatia', 'SK': 'Slovakia', 'SI': 'Slovenia', 'LT': 'Lithuania', 'LV': 'Latvia',
  'EE': 'Estonia', 'LU': 'Luxembourg', 'MT': 'Malta', 'CY': 'Cyprus', 'IS': 'Iceland',
  'IN': 'India', 'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'SG': 'Singapore',
  'MY': 'Malaysia', 'TH': 'Thailand', 'ID': 'Indonesia', 'PH': 'Philippines', 'VN': 'Vietnam',
  'TW': 'Taiwan', 'HK': 'Hong Kong', 'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia',
  'IL': 'Israel', 'TR': 'Turkey', 'EG': 'Egypt', 'ZA': 'South Africa', 'NG': 'Nigeria',
  'KE': 'Kenya', 'MA': 'Morocco', 'BR': 'Brazil', 'MX': 'Mexico', 'AR': 'Argentina',
  'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru', 'VE': 'Venezuela', 'EC': 'Ecuador',
  'NZ': 'New Zealand', 'FJ': 'Fiji', 'PG': 'Papua New Guinea', 'RU': 'Russia',
  'UA': 'Ukraine', 'BY': 'Belarus', 'KZ': 'Kazakhstan', 'UZ': 'Uzbekistan', 'PK': 'Pakistan',
  'BD': 'Bangladesh', 'LK': 'Sri Lanka', 'NP': 'Nepal', 'MM': 'Myanmar', 'KH': 'Cambodia',
  'LA': 'Laos', 'MN': 'Mongolia', 'AF': 'Afghanistan', 'IQ': 'Iraq', 'IR': 'Iran',
  'JO': 'Jordan', 'LB': 'Lebanon', 'SY': 'Syria', 'YE': 'Yemen', 'OM': 'Oman',
  'KW': 'Kuwait', 'QA': 'Qatar', 'BH': 'Bahrain', 'DZ': 'Algeria', 'TN': 'Tunisia',
  'LY': 'Libya', 'SD': 'Sudan', 'ET': 'Ethiopia', 'GH': 'Ghana', 'TZ': 'Tanzania',
  'UG': 'Uganda', 'RW': 'Rwanda', 'ZM': 'Zambia', 'ZW': 'Zimbabwe', 'BW': 'Botswana',
  'MU': 'Mauritius', 'MZ': 'Mozambique', 'AO': 'Angola', 'SN': 'Senegal', 'CI': 'Ivory Coast',
  'CM': 'Cameroon', 'MG': 'Madagascar', 'CV': 'Cape Verde', 'BJ': 'Benin', 'ML': 'Mali',
  'BF': 'Burkina Faso', 'NE': 'Niger', 'TD': 'Chad', 'MR': 'Mauritania', 'GN': 'Guinea',
  'SL': 'Sierra Leone', 'LR': 'Liberia', 'TG': 'Togo', 'GA': 'Gabon', 'CG': 'Congo',
  'CD': 'DR Congo', 'CF': 'Central African Republic', 'SO': 'Somalia', 'DJ': 'Djibouti',
  'ER': 'Eritrea', 'SS': 'South Sudan', 'UY': 'Uruguay', 'PY': 'Paraguay', 'BO': 'Bolivia',
  'GY': 'Guyana', 'SR': 'Suriname', 'GF': 'French Guiana', 'FK': 'Falkland Islands',
  'CR': 'Costa Rica', 'PA': 'Panama', 'NI': 'Nicaragua', 'HN': 'Honduras', 'GT': 'Guatemala',
  'BZ': 'Belize', 'SV': 'El Salvador', 'CU': 'Cuba', 'JM': 'Jamaica', 'HT': 'Haiti',
  'DO': 'Dominican Republic', 'PR': 'Puerto Rico', 'TT': 'Trinidad and Tobago', 'BB': 'Barbados',
  'BS': 'Bahamas', 'AG': 'Antigua and Barbuda', 'DM': 'Dominica', 'LC': 'Saint Lucia',
  'VC': 'Saint Vincent', 'GD': 'Grenada', 'KN': 'Saint Kitts', 'TC': 'Turks and Caicos',
  'VG': 'British Virgin Islands', 'VI': 'US Virgin Islands', 'AW': 'Aruba', 'CW': 'Curaçao',
  'SX': 'Sint Maarten', 'AI': 'Anguilla', 'MS': 'Montserrat', 'BM': 'Bermuda',
  'GL': 'Greenland', 'PM': 'Saint Pierre', 'NC': 'New Caledonia', 'PF': 'French Polynesia',
  'WS': 'Samoa', 'TO': 'Tonga', 'VU': 'Vanuatu', 'SB': 'Solomon Islands', 'KI': 'Kiribati',
  'TV': 'Tuvalu', 'NR': 'Nauru', 'PW': 'Palau', 'FM': 'Micronesia', 'MH': 'Marshall Islands',
  'AS': 'American Samoa', 'GU': 'Guam', 'MP': 'Northern Mariana', 'CK': 'Cook Islands',
  'NU': 'Niue', 'TK': 'Tokelau', 'WF': 'Wallis and Futuna',
};

function getCountryNameFromCode(code: string): string {
  if (!code || code === 'Unknown' || code === 'LO') return code;
  const upperCode = code.toUpperCase();
  return COUNTRY_NAMES[upperCode] || upperCode;
}

async function tryGeolocationAPI(url: string, parseFn: (data: any) => GeoLocation | null): Promise<GeoLocation | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return parseFn(data);
  } catch (error) {
    return null;
  }
}

export async function getLocationFromIP(ip: string): Promise<GeoLocation> {
  // Skip geolocation for localhost/private IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return {
      country: 'Localhost',
      countryCode: 'LO',
    };
  }

  // Try ipapi.co first
  let result = await tryGeolocationAPI(
    `https://ipapi.co/${ip}/json/`,
    (data) => {
      if (data.error || !data.country_code) return null;
      const countryCode = (data.country_code || '').toUpperCase();
      return {
        country: data.country_name || getCountryNameFromCode(countryCode),
        countryCode: countryCode,
        city: data.city,
      };
    }
  );

  if (result) return result;

  // Fallback to ip-api.com
  result = await tryGeolocationAPI(
    `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,city`,
    (data) => {
      if (data.status === 'fail' || !data.countryCode) return null;
      const countryCode = (data.countryCode || '').toUpperCase();
      return {
        country: data.country || getCountryNameFromCode(countryCode),
        countryCode: countryCode,
        city: data.city,
      };
    }
  );

  if (result) return result;

  // Fallback to ipgeolocation.io (free tier)
  result = await tryGeolocationAPI(
    `https://api.ipgeolocation.io/ipgeo?ip=${ip}`,
    (data) => {
      if (data.message || !data.country_code2) return null;
      const countryCode = (data.country_code2 || '').toUpperCase();
      return {
        country: data.country_name || getCountryNameFromCode(countryCode),
        countryCode: countryCode,
        city: data.city,
      };
    }
  );

  if (result) return result;

  // Last resort: try geojs.io
  result = await tryGeolocationAPI(
    `https://get.geojs.io/v1/ip/country/${ip}.json`,
    (data) => {
      if (!data.country || data.country === 'XX') return null;
      const countryCode = (data.country || '').toUpperCase();
      return {
        country: getCountryNameFromCode(countryCode),
        countryCode: countryCode,
      };
    }
  );

  if (result) return result;

  // If all APIs fail, return Unknown
  console.error(`Failed to geolocate IP: ${ip}`);
  return {
    country: 'Unknown',
    countryCode: 'Unknown',
  };
}

