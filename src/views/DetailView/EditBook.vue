<template>
  <div class="edit_book_root">
    <div class="button" @click="openDialog">Edit</div>
    <BaseDialog v-model:is-dialog-open="isDialogOpen">
      <div class="form_container">
        <div class="close_icon">X</div>
        <BaseInputWrap
          v-for="(config, key) in formData"
          :key="key"
          :title="config.title"
          :is-required="config.isRequired"
          :show-err-msg="missingRequiredData.includes(key)"
        >
          <input :type="config.inputType" v-model="config.value" />
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

interface FormEl {
  title: string
  inputType: string
  isRequired: boolean
  value: string
}

interface FormData {
  title: FormEl
  author: FormEl
  publicationDate: FormEl
  isbn: FormEl
  description: FormEl
}

const formData = ref<FormData>({} as FormData)
const initFormData = () => {
  formData.value = createFormData(props.bookInfo)
  missingRequiredData.value = []
}
watch(() => props.bookInfo, initFormData)

const createFormData = (bookInfo: BookInfo): FormData => {
  const _bookInfo = deepClone<BookInfo>(bookInfo)

  return {
    title: {
      title: 'Name',
      isRequired: true,
      inputType: 'text',
      value: _bookInfo.title
    },
    author: {
      title: 'Author',
      isRequired: true,
      inputType: 'text',
      value: _bookInfo.author
    },
    publicationDate: {
      title: 'Pub date',
      isRequired: true,
      inputType: 'text',
      value: _bookInfo.publicationDate
    },
    isbn: {
      title: 'ISBN',
      isRequired: false,
      inputType: 'text',
      value: _bookInfo.isbn
    },
    description: {
      title: 'Description',
      isRequired: true,
      inputType: 'text',
      value: _bookInfo.description
    }
  }
}

// missingRequiredData 存放必填但未填的 key, 供錯誤提示顯示
const missingRequiredData = ref<Array<string>>([])
const handleSave = async () => {
  // 驗證必填資料
  missingRequiredData.value = checkRequiredData(formData.value)
  if (missingRequiredData.value.length > 0) return

  // 比對相異資料並轉成 request data
  const formDataForDiff = Object.entries(formData.value).reduce((acc, [key, config]) => {
    acc[key] = config.value
    return acc
  }, {} as BaseObj)
  const diffData = getDiffData(props.bookInfo, formDataForDiff)

  // 若資料有變化則做 api 請求
  if (Object.keys(diffData).length !== 0) {
    await api.editBookDetail(props.id, diffData)
    emits('update:bookInfo')
  }
  closeDialog()
}

// 回傳所有必填但沒有填值的資料
const checkRequiredData = (formData: FormData): Array<string> => {
  return Object.entries(formData).reduce((acc, [key, config]) => {
    const isRequired = config.isRequired
    const isEmptyValue = config.value.length === 0
    if (isRequired && isEmptyValue) acc.push(key)
    return acc
  }, [] as Array<string>)
}

// 回傳有異動的物件資料
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
watch(isDialogOpen, isDialogOpen => {
  if (!isDialogOpen) initFormData()
})
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
