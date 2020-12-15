<template>
  <success
    :city="weatherData.city"
    :weather="weatherData.weather"
    :temperature="weatherData.temperature"
  />
</template>

<script>
import { ref } from 'vue';

// Components
import Success from '../components/Success.vue';

// Services
import { getCurrentWeather } from '../services/openWeather.js';

export default {
  name: 'City',
  components: {
    Success,
  },
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
