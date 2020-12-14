<template>
  <form @submit.prevent="onSubmit">
    <label for="city" class="mr-2">City</label>
    <input id="city" type="text" name="city" v-model="city" class="mr-4" />
    <button :disabled="disabled" class="py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Search</button>
  </form>
</template>

<script>
export default {
  name: 'AppForm',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      city: '',
      lastCity: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.city !== this.lastCity) {
        this.$emit('onNewCity', { city: this.city });

        this.lastCity = this.city;
      }
    },
  },
}
</script>