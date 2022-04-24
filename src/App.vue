<template>
  <!-- v-slot 可以將指定參數暴露給 router-view 的 slot 子元素 -->
  <router-view v-slot="{ Component }">
    <!-- include: only components with names matched by `include` will be cached. -->
    <keep-alive :include="cachedViews">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import useCachedViews from '@/composables/useCachedView'

const { cachedViews } = useCachedViews()
</script>

<style lang="sass">
#app
  min-width: 1150px
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
</style>
