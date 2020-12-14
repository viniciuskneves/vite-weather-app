<template>
  <section>
    <h1>Weather in {{ city }}</h1>
    <p>{{ Math.round(temperature) }}°C - {{ weatherEmoji }}</p>
  </section>
</template>

<script>
import { weatherTypeToEmoji } from '../services/openWeather.js';

export default {
  name: 'Success',
  props: {
    city: {
      type: String,
      required: true,
    },
    weather: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
  },
  computed: {
    weatherEmoji() {
      return weatherTypeToEmoji(this.weather);
    },
  },
}
</script>