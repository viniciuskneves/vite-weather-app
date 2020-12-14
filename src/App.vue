<template>
  <div class="text-center p-4 prose mx-auto">
    <app-form @onNewCity="onNewCity" :disabled="isLoading" />
    <hr class="my-4">
    <main>
      <loading v-if="isLoading" />
      <success v-else-if="isSuccess" :city="weatherData.city" :weather="weatherData.weather" :temperature="weatherData.temperature" />
      <error v-else-if="isError" />
    </main>
  </div>
</template>

<script>
// Components
import AppForm from './components/AppForm.vue';
import Loading from './components/Loading.vue';
import Success from './components/Success.vue';
import Error from './components/Error.vue';

// Services
import { getCurrentWeather } from './services/openWeather.js';

const STATES = {
  INITIAL: '',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERRROR',
};

export default {
  name: 'App',
  components: {
    AppForm,
    Loading,
    Success,
    Error,
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
  methods: {
    async onNewCity({ city }) {
      this.state =  STATES.LOADING;

      try {
        const weatherData = await getCurrentWeather(city);

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
}
</script>
