<template>
  <div class="edit_book_root">
    <div class="button" @click="openDialog">Edit</div>
    <BaseDialog v-model:is-dialog-open="isDialogOpen">
      <div class="form_container">
        <div class="close_icon">X</div>
        <BaseInputWrap title="Name" is-required>
          <input type="text" v-model="bookInfo.title" />
        </BaseInputWrap>
        <BaseInputWrap title="Author" is-required>
          <input type="text" v-model="bookInfo.author" />
        </BaseInputWrap>
        <BaseInputWrap title="Pub date" is-required>
          <input type="text" v-model="bookInfo.publicationDate" />
        </BaseInputWrap>
        <BaseInputWrap title="ISBN">
          <input type="text" v-model="bookInfo.isbn" />
        </BaseInputWrap>
        <BaseInputWrap title="Description" is-required>
          <input type="text" v-model="bookInfo.description" />
        </BaseInputWrap>

        <div class="button" @click="handleSave">Save</div>
      </div>
    </BaseDialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { deepClone } from '@/utils/format'
import * as api from '@/api/books'

import BaseDialog from '@/components/BaseDialog.vue'
import BaseInputWrap from '@/components/BaseInputWrap.vue'

import type { BookInfo } from '@/api/books'
import type { PropType } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  bookInfo: {
    type: Object as PropType<BookInfo>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'update:bookInfo'): void
}>()

const bookInfo = ref<BookInfo>({} as BookInfo)
watch(
  () => props.bookInfo,
  data => {
    bookInfo.value = deepClone(data)
  }
)

const handleSave = async () => {
  const diffData = getDiffData(props.bookInfo, bookInfo.value)
  if (Object.keys(diffData).length === 0) {
    // block save behavior
    return
  }
  await api.editBookDetail(props.id, diffData)
  emits('update:bookInfo')
  closeDialog()
}

const getDiffData = (before: BaseObj, after: BaseObj) => {
  const requestObj: BaseObj = {}
  Object.entries(before).forEach(([key, beforeVal]) => {
    const afterVal = after[key]
    if (beforeVal !== afterVal) requestObj[key] = afterVal
  })
  return requestObj
}

const isDialogOpen = ref<boolean>(false)
const openDialog = () => (isDialogOpen.value = true)
const closeDialog = () => (isDialogOpen.value = false)
</script>
<style lang="sass" scoped>
.edit_book_root
  .button
    cursor: pointer
    border: solid 1px #333

  .form_container
    padding: 20px
    background-color: #FFF
</style>
