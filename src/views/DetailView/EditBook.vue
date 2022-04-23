<template>
  <div class="edit_book_root">
    <div class="button" @click="openDialog">Edit</div>
    <BaseDialog v-model:is-dialog-open="isDialogOpen">
      <div class="block"></div>
    </BaseDialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import BaseDialog from '@/components/BaseDialog.vue'
const isDialogOpen = ref<boolean>(false)
const openDialog = () => {
  isDialogOpen.value = true
}
</script>
<style lang="sass" scoped>
.edit_book_root
  .button
    cursor: pointer
    border: solid 1px #333

  .block
    +size(300px)
    background-color: blue
</style>
