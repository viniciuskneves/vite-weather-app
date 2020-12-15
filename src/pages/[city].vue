<template>
  <success
    v-if="isSuccess"
    :city="weatherData.city"
    :weather="weatherData.weather"
    :temperature="weatherData.temperature"
  />
  <error v-else-if="isError" />
</template>

<script>
import { ref, computed } from 'vue';

// Components
import Success from '../components/Success.vue';
import Error from '../components/Error.vue';

// Services
import { getCurrentWeather } from '../services/openWeather.js';

const STATES = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERRROR',
};

export default {
  name: 'City',
  components: {
    Success,
    Error,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const state = ref(null);
    const weatherData = ref({});

    const isSuccess = computed(() => state.value === STATES.SUCCESS);
    const isError = computed(() => state.value === STATES.ERROR);

    try {
      const weatherResponse = await getCurrentWeather(props.city);

      weatherData.value = {
        city: weatherResponse.name,
        weather: weatherResponse.weather[0].main,
        temperature: weatherResponse.main.temp,
      };
      state.value = STATES.SUCCESS;
    } catch(e) {
      console.error(e);

      state.value = STATES.ERROR;
    }

    return { state, weatherData, isSuccess, isError };
  },
};
</script>
