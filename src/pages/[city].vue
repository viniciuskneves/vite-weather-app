<template>
  <h1>Weather in {{ weatherData.city }}</h1>
  <p>{{ Math.round(weatherData.temperature) }}°C - {{ weatherData.weatherEmoji }}</p>
</template>

<script>
import { ref } from 'vue';

// Services
import { getCurrentWeather } from '../services/openWeather.js';

export default {
  name: 'City',
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const weatherData = ref({});

    const weatherResponse = await getCurrentWeather(props.city);

    weatherData.value = {
      city: weatherResponse.name,
      weather: weatherResponse.weather[0].main,
      temperature: weatherResponse.main.temp,
    };

    return { weatherData };
  },
};
</script>
