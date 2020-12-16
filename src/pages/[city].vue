<template>
  <h1>Weather in {{ weatherData.city }}</h1>
  <p>{{ Math.round(weatherData.temperature) }}°C - {{ weatherData.weatherEmoji }}</p>
</template>

<script setup>
import { defineProps, ref } from 'vue';

// Services
import { getCurrentWeather } from '../services/openWeather.js';

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const weatherData = ref({});
const weatherResponse = await getCurrentWeather(props.city);

weatherData.value = {
  city: weatherResponse.name,
  weather: weatherResponse.weather[0].main,
  temperature: weatherResponse.main.temp,
};
</script>