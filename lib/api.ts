import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return 'http://' + window.location.hostname + ':5001/api';
  }
  // Default fallback for Server-Side Rendering
  return 'http://127.0.0.1:5001/api';
};

export const chatTriage = async (
  message: string, 
  history: any[] = [], 
  patientInfo?: any, 
  location?: {lat: number, lng: number},
  imageBase64?: string,
  imageMimeType?: string
) => {
  const response = await axios.post(getBaseUrl() + '/triage/chat', {
    message,
    history,
    patientInfo,
    location,
    imageBase64,
    imageMimeType
  });
  return response.data?.data ?? response.data;
};

export const searchPatient = async (cid: string) => {
  try {
    const response = await axios.post(getBaseUrl() + '/pat/search', { cid });
    return response.data?.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const loginPatient = async (cid: string, passwordInput: string) => {
  const response = await axios.post(getBaseUrl() + '/pat/login', { cid, password: passwordInput });
  return response.data?.data;
};

export const savePatient = async (patientData: any) => {
  const response = await axios.post(getBaseUrl() + '/pat/save', patientData);
  return response.data?.data;
};

export const getHistory = async (cid: string) => {
  const response = await axios.get(getBaseUrl() + '/triage/history/' + cid);
  return response.data?.data;
};

export const getHealthInfo = async (cid: string) => {
  try {
    const response = await axios.get(getBaseUrl() + '/pat/health/' + cid);
    return response.data?.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const updateHealthInfo = async (cid: string, data: any) => {
  const response = await axios.put(getBaseUrl() + '/pat/health/' + cid, data);
  return response.data?.data;
};

export const updateProfile = async (cid: string, data: any) => {
  const response = await axios.put(getBaseUrl() + '/pat/profile/' + cid, data);
  return response.data?.data;
};

export const changePassword = async (cid: string, data: any) => {
  const response = await axios.put(getBaseUrl() + '/pat/password/' + cid, data);
  return response.data;
};
