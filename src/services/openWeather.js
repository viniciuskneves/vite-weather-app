const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_TYPE_EMOJI_MAP = {
  THUNDERSTORM: '⛈',
  DRIZZLE: '🌧',
  RAIN: '🌧',
  SNOW: '❄️',
  CLEAR: '☀️',
  CLOUDS: '☁️',
  MIST: '🌫',
  SMOKE: '🌫',
  HAZE: '🌫',
  DUST: '🌫',
  FOG: '🌫',
  ASH: '🌫',
  SQUALL: '🌫',
  TORNADO: '🌪',
};

function asyncSetTimeout() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

export async function getCurrentWeather(city) {
  const path = '/weather';
  const [ response ] = await Promise.all([
    fetch(`${BASE_URL}${path}?q=${city}&appid=${API_KEY}&units=metric`),
    asyncSetTimeout(),
  ]);

  return response.json();
}

export function weatherTypeToEmoji(weatherType) {
  const emoji = WEATHER_TYPE_EMOJI_MAP[weatherType.toUpperCase()];

  if (!emoji) {
    throw new Error('No weather type found');
  }

  return emoji;
}