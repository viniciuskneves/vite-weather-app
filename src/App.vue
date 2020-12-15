<template>
  <router-view v-slot="{ Component }">
    <Suspense timeout="0">
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
import Loading from './components/Loading.vue';

export default {
  name: 'App',
  components: { Loading },
}
</script>
