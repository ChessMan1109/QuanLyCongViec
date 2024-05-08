//Services/WeatherService.js
import axios from 'axios';

const API_KEY = '7d40e471578637e632120513b54533fd';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=Hanoi`;

export const WeatherService = {
  getWeatherData: async () => {
    try {
      return await axios.get(API_URL);
    } catch (error) {
      throw new Error('Lỗi khi tìm nạp dữ liệu thời tiết:', error);
    }
  },
};
