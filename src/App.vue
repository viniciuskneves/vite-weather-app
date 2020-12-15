<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <template #default>
        <component :is="Component" />
      </template>
    </Suspense>
  </router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
