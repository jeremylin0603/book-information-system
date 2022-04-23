<template>
  <div>
    <div class="base_input_wrap_root">
      <div class="title" :class="{ required_mark: props.isRequired }">{{ props.title }}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="sass" scoped>
.base_input_wrap_root
  display: flex
  .title
    width: fit-content
    min-width: 120px
    text-align: left
  .required_mark
    &::after
      content: '*'
      margin-left: 2px
      color: red
</style>
