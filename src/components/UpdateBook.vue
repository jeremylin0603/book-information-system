<template>
  <div class="edit_book_root">
    <div class="button" @click="openDialog">{{ props.buttonText }}</div>

    <BaseDialog v-model:is-dialog-open="isDialogOpen">
      <div class="form_container">
        <div class="close_icon" @click="closeDialog">X</div>
        <BaseInputWrap
          v-for="(config, key) in formData"
          :key="key"
          :title="config.title"
          :is-required="config.isRequired"
          :show-err-msg="missingRequiredData.includes(key)"
        >
          <!-- TODO: publicationDate 換成好用一點的時間套件, 或有空寫一個 -->
          <Datepicker
            v-if="config.inputType === 'datepicker'"
            v-model="config.value"
            startingView="day"
            minimumView="time"
            inputFormat="yyyy/MM/dd hh:mm"
          />
          <input v-if="config.inputType === 'input'" type="text" v-model="config.value" />
          <textarea v-if="config.inputType === 'textarea'" cols="16" rows="4" v-model="config.value"></textarea>
        </BaseInputWrap>

        <div class="button" @click="handleSave">Save</div>
      </div>
    </BaseDialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { deepClone } from '@/utils/format'

import BaseDialog from '@/components/BaseDialog.vue'
import BaseInputWrap from '@/components/BaseInputWrap.vue'
import Datepicker from 'vue3-datepicker'

import type { BookInfo, UpdateBookInfoReq } from '@/api/books'
import type { PropType } from 'vue'

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  },
  bookInfo: {
    type: Object as PropType<BookInfo>,
    default: null
  }
})

const emits = defineEmits<{
  (e: 'update:bookInfo', formData: UpdateBookInfoReq): void
  (e: 'create:bookInfo', formData: BookInfo): void
}>()

interface FormEl {
  title: string
  inputType: string
  isRequired: boolean
  value: string | Date
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
onMounted(initFormData)
watch(() => props.bookInfo, initFormData)

const createFormData = (bookInfo: BookInfo): FormData => {
  const _bookInfo = deepClone<BookInfo>(bookInfo)

  return {
    title: {
      title: 'Name',
      isRequired: true,
      inputType: 'input',
      value: _bookInfo?.title
    },
    author: {
      title: 'Author',
      isRequired: true,
      inputType: 'input',
      value: _bookInfo?.author
    },
    publicationDate: {
      title: 'Pub date',
      isRequired: true,
      inputType: 'datepicker',
      value: new Date(_bookInfo?.publicationDate)
    },
    isbn: {
      title: 'ISBN',
      isRequired: false,
      inputType: 'input',
      value: _bookInfo?.isbn
    },
    description: {
      title: 'Description',
      isRequired: true,
      inputType: 'textarea',
      value: _bookInfo?.description
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

  const isUpdate = props.bookInfo !== null
  if (isUpdate) {
    const updateData = getDiffData(props.bookInfo, formDataForDiff)
    if (Object.keys(updateData).length !== 0) {
      emits('update:bookInfo', updateData)
    }
  } else {
    emits('create:bookInfo', formDataForDiff as BookInfo)
  }

  closeDialog()
}

// 回傳所有必填但沒有填值的資料
const checkRequiredData = (formData: FormData): Array<string> => {
  return Object.entries(formData).reduce((acc, [key, config]) => {
    const isRequired = config.isRequired
    const isEmptyValue = !config.value || config.value.length === 0

    if (isRequired && isEmptyValue) acc.push(key)
    return acc
  }, [] as Array<string>)
}

// 回傳有異動的物件資料
const getDiffData = (before: BaseObj, after: BaseObj) => {
  const requestObj: BaseObj = {}
  Object.entries(after).forEach(([key, afterVal]) => {
    const beforeVal = before[key]
    if (afterVal !== beforeVal) requestObj[key] = afterVal
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

    .close_icon
      text-align: right
      cursor: pointer
</style>
