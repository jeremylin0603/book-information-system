<template>
  <div class="modify_view_root">
    <pre>{{ bookInfo }}</pre>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as api from '@/api/books'

import type { BookInfo } from '@/api/books'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const bookInfo = ref<BookInfo>({} as BookInfo)
api.getBookDetail(props.id).then(({ data }) => {
  bookInfo.value = data
})
</script>
<style lang="sass" scoped>
// .modify_view_root
</style>
