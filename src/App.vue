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

<script>
import { ref, onErrorCaptured } from 'vue';

// Components
import Loading from './components/Loading.vue';
import Error from './components/Error.vue';

export default {
  name: 'App',
  components: { Loading, Error },
  setup() {
    const error = ref(null);

    onErrorCaptured(e => {
      error.value = e;

      return true;
    });

    return { error };
  }
}
</script>
