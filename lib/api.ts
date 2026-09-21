import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // When in browser, proxy through Next.js to avoid Mixed Content / CORS issues
    return '/backend-api';
  }
  // Default fallback for Server-Side Rendering
  return 'https://crestless-robbing-tropical.ngrok-free.dev';
};

export const chatTriage = async (
  message: string, 
  history: any[] = [], 
  patientInfo?: any, 
  location?: {lat: number, lng: number},
  imageBase64?: string,
  imageMimeType?: string,
  caregiverContext?: string[]
) => {
  const response = await axios.post(getBaseUrl() + '/triage/chat', {
    message,
    history,
    patientInfo,
    location,
    imageBase64,
    imageMimeType,
    caregiverContext
  });
  return response.data?.data ?? response.data;
};

