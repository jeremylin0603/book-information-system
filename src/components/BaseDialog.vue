<template>
  <div class="base_dialog_root">
    <div class="mask" v-if="props.isDialogOpen" @click.self="emits('update:isDialogOpen', false)">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isDialogOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits<{
  (e: 'update:isDialogOpen', isDialogOpen: boolean): void
}>()
</script>
<style lang="sass" scoped>
.base_dialog_root
  width: 100%
  height: 100%

  .mask
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    +flex_center
    background-color: rgba(0, 0, 0, .5)
</style>
