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
// Components
import Success from '../components/Success.vue';
import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';

// Services
import { getCurrentWeather } from '../services/openWeather.js';

const STATES = {
  INITIAL: '',
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
  data() {
    return {
      state: STATES.INITIAL,
      weatherData: {},
    };
  },
  computed: {
    isLoading() {
      return this.state === STATES.LOADING;
    },
    isSuccess() {
      return this.state === STATES.SUCCESS;
    },
    isError() {
      return this.state === STATES.ERROR;
    }
  },
  created() {
    this.fetchCityWeather();
  },
  methods: {
    async fetchCityWeather() {
      this.state =  STATES.LOADING;

      try {
        const weatherData = await getCurrentWeather(this.city);

        this.weatherData = {
          city: weatherData.name,
          weather: weatherData.weather[0].main,
          temperature: weatherData.main.temp,
        };
        this.state = STATES.SUCCESS;
      } catch(e) {
        console.error(e);

        this.state = STATES.ERROR;
      }
    },
  },
};
</script>
