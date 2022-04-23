<template>
  <div class="book_info_block_root">
    <div class="img_wrap">
      <img class="img" :src="props.imgUrl" />
    </div>
    <div class="info_wrap">
      <div class="title">{{ props.title }}</div>
      <div class="author">{{ props.author }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
})
</script>

<style lang="sass" scoped>
.book_info_block_root
  display: flex
  width: 360px
  height: 160px
  border: solid 1px #333

  .img_wrap
    display: flex
    align-items: center
    width: 160px
    min-width: 160px
    .img
      width: 100%

  .info_wrap
    display: flex
    flex-direction: column
    justify-content: center
    padding: 0 10px
    .title
      font-size: 18px
      font-weight: 600
</style>
