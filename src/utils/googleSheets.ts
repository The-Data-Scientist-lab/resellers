import axios from 'axios';

interface LocationData {
  country: string;
  city: string;
  region: string;
  timezone: string;
}

interface IPResponse {
  ip: string;
}

interface LocationResponse {
  country_name: string;
  city: string;
  region: string;
  timezone: string;
}

interface SheetData {
  timestamp: string;
  ip: string;
  location: LocationData;
  modelName: string;
  planName: string;
  amount: string;
  fullName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  reason: string;
  hasScreenshot: string;
  screenshotName?: string;
  status: string;
  type: 'payment' | 'refund';
  browserInfo: string;
  deviceType: string;
}

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
}

// Your Google Apps Script web app URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwRtRAmvAe2jw83QwWkPWGocx2uPgjfnFNNWs30-VISXEULWrRent7dmnOcnlL-7BM6iQ/exec';

const getLocationData = async (ip: string): Promise<LocationData> => {
  try {
    const response = await axios.get<LocationResponse>(`https://ipapi.co/${ip}/json/`);
    return {
      country: response.data.country_name,
      city: response.data.city,
      region: response.data.region,
      timezone: response.data.timezone
    };
  } catch (error) {
    console.error('Error getting location data:', error);
    return {
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      timezone: 'Unknown'
    };
  }
};

const getBrowserInfo = (): string => {
  return navigator.userAgent;
};

const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

const formatTimestamp = (): string => {
  const now = new Date();
  // Format: YYYY-MM-DDTHH:mm:ss.sssZ (ISO string format)
  return now.toISOString();
};

export const submitToSheet = async (data: Omit<SheetData, 'timestamp' | 'ip' | 'location' | 'browserInfo' | 'deviceType'>): Promise<{ result: string }> => {
  try {
    const ip = await getClientIP();
    const location = await getLocationData(ip);
    
    // Create form data
    const formData = new FormData();
    const completeData: SheetData = {
      ...data,
      timestamp: formatTimestamp(),
      ip,
      location,
      browserInfo: getBrowserInfo(),
      deviceType: getDeviceType()
    };

    // Add each field to form data
    Object.entries(completeData).forEach(([key, value]) => {
      if (key === 'location') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    console.log('Submitting data:', completeData);
    
    const response = await axios.post<ApiResponse>(SCRIPT_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Response:', response.data);
    
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Server returned an error');
    }

    return { result: 'success' };

  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to submit form data: ${error.message}`);
    } else {
      throw new Error('Failed to submit form data. Please try again.');
    }
  }
};

export const getClientIP = async (): Promise<string> => {
  try {
    const response = await axios.get<IPResponse>('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'Unknown';
  }
}; 