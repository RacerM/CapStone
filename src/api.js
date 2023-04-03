import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchChampionData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/champions`);
    const version = response.data.version;
    const data = response.data.champions;
    return { version, data };
  } catch (error) {
    console.error("Failed to fetch champion data:", error);
    return null;
  }
};
