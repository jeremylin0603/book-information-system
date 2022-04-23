<template>
  <div class="base_header_root">
    <div v-if="useLeftButton" class="left_block">
      <slot name="left">
        <div class="button" @click="handleLeftButton">
          {{ props.leftButtonText }}
        </div>
      </slot>
    </div>

    <div class="mid_block">
      <slot name="title">
        <div class="title">{{ props.title }}</div>
      </slot>
    </div>

    <div v-if="useRightButton" class="right_block">
      <slot name="right">
        <div class="button" @click="handleRightButton">
          {{ props.rightButtonText }}
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  leftButtonText: {
    type: String,
    default: ''
  },
  rightButtonText: {
    type: String,
    default: ''
  }
})

const emits = defineEmits<{
  (e: 'click:leftButton'): void
  (e: 'click:rightButton'): void
}>()

const handleLeftButton = () => emits('click:leftButton')
const handleRightButton = () => emits('click:rightButton')

const isEmptyString = (string: string) => {
  if (typeof string === 'string') return string.length === 0
  return false
}

const useLeftButton = !isEmptyString(props.leftButtonText)
const useRightButton = !isEmptyString(props.rightButtonText)
</script>

<style lang="sass" scoped>
$header_height: 40px

.base_header_root
  display: grid
  grid-template-columns: 100px auto 100px
  grid-template-areas: "button-left title button-right"
  height: $header_height
  border: solid 1px #333

  .left_block, .right_block, .mid_block
    text-align: center
    line-height: $header_height
  .left_block
    grid-area: button-left
  .right_block
    grid-area: button-right
  .mid_block
    grid-area: title

  .button
    border: solid 1px #333
    cursor: pointer
</style>
