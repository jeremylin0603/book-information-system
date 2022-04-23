<template>
  <div class="modify_view_root">
    <pre>{{ bookInfo }}</pre>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getBookInfo } from '@/utils/storage'

import type { BookInfo } from '@/api/books'

const bookInfo: BookInfo = getBookInfo()
</script>
<style lang="sass" scoped>
// .modify_view_root
</style>
