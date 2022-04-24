<template>
  <div class="detail_view_root">
    <BaseHeader :title="bookInfo.title" left-button-text="Back" @click:left-button="handleBackBtn">
      <template #right>
        <UpdateBook
          button-text="Edit"
          :id="props.id"
          :book-info="bookInfo"
          @update:book-info="handleBookInfoUpdate"
        ></UpdateBook>
      </template>
    </BaseHeader>

    <main class="main">
      <div class="img_wrap">
        <img class="img" :src="imgUrl" />
      </div>

      <div class="info_wrap">
        <div class="title mb-10">{{ bookInfo.title }}</div>
        <div class="author mb-10">{{ bookInfo.author }}</div>
        <div class="time mb-10">Published on {{ bookInfo.publicationDate }}</div>
        <div class="description mb-10">{{ bookInfo.description }}</div>
        <div class="isbn">ISBN: {{ bookInfo.isbn }}</div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import * as api from '@/api/books'
import { getTime } from '@/utils/time'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/router'

import BaseHeader from '@/components/BaseHeader.vue'
import UpdateBook from '../../components/UpdateBook.vue'

import useBooksInfo from '@/views/HomeView/composables/useBooksInfo'

import type { BookInfo, UpdateBookInfoReq } from '@/api/books'

const imgUrl = 'https://picsum.photos/800/600'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const bookInfo = ref<BookInfo>({} as BookInfo)
const { createBookInfo } = useBooksInfo()
const initBookDetail = () => {
  api.getBookDetail(props.id).then(({ data }) => {
    const _bookInfo = createBookInfo(data)
    _bookInfo.publicationDate = formatDate(_bookInfo.publicationDate)
    bookInfo.value = _bookInfo
  })
}

onMounted(initBookDetail)

const formatDate = (d: string) => {
  const { year, month, date, hour, minutes } = getTime(d)
  return `${year}/${month}/${date} ${hour}:${minutes}`
}

const handleBookInfoUpdate = async (reqData: UpdateBookInfoReq) => {
  await api.editBookDetail(props.id, reqData)
  initBookDetail()
}

const router = useRouter()
const handleBackBtn = () => {
  router.push({ name: RouterNameEnum.homeView })
}
</script>
<style lang="sass" scoped>
$main_height: 226px
.mb-10
  margin-bottom: 10px
.detail_view_root
  .main
    display: flex
    margin: 0 auto
    +size(462px, $main_height)

    .img_wrap
      +flex_center
      +size($main_height)
      min-width: $main_height
      .img
        max-width: 100%
        max-height: 100%

    .info_wrap
      .title
        font-size: 18px
      .author
        font-size: 12px
        color: #333
</style>
