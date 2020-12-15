<template>
  <router-view v-slot="{ Component }">
    <Error v-if="error" />
    <Suspense timeout="0" v-else>
      <template #default>
        <component :is="Component" />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </router-view>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';

// Components
import Loading from './components/Loading.vue';
import Error from './components/Error.vue';

const error = ref(null);

onErrorCaptured(e => {
  error.value = e;

  return true;
});
</script>