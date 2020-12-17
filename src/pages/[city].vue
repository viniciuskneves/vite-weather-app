<template>
  <loading v-if="isLoading" />
  <success
    v-else-if="isSuccess"
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
import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';

// Services
import { getCurrentWeather } from '../services/openWeather.js';

const STATES = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERRROR',
};

export default {
  name: 'City',
  components: {
    Success,
    Loading,
    Error,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = ref(STATES.LOADING);
    const weatherData = ref({});

    const isLoading = computed(() => state.value === STATES.LOADING);
    const isSuccess = computed(() => state.value === STATES.SUCCESS);
    const isError = computed(() => state.value === STATES.ERROR);

    (async function fetchCityWeather() {
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
    })();

    return { state, weatherData, isLoading, isSuccess, isError };
  },
};
</script>
