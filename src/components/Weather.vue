<template>
  <p>{{ weather }}</p>
  <p>{{ emoji }}</p>
</template>

<script>
import { ref } from 'vue';
import { getCurrentWeather, weatherTypeToEmoji } from '../services/openWeather.js';

export default {
  name: 'Weather',
  props: {
    city: {
      type: String,
      default: '',
    },
  },
  async setup(props) {
    const weather = ref(null);
    const emoji = ref(null);
    const weatherResponse = await getCurrentWeather({
      city: props.city,
    });

    weather.value = weatherResponse;
    emoji.value = weatherTypeToEmoji(weatherResponse.weather[0].main);

    return { weather, emoji };
  }
}
</script>
