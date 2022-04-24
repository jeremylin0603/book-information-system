<template>
  <div class="home_view_root">
    <BaseHeader title="The book shelf">
      <template #right>
        <UpdateBook button-text="Create" @create:book-info="handleBookInfoCreate"></UpdateBook>
      </template>
    </BaseHeader>

    <main class="main">
      <div class="block_wrap" v-for="bookInfo in bookInfoGroup" :key="bookInfo.isbn">
        <BookInfoBlock
          :title="bookInfo.title"
          :author="bookInfo.author"
          :img-url="imgUrl"
          @click="routeToBookDetail(bookInfo.id)"
        ></BookInfoBlock>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/router'
import * as api from '@/api/books'

import BaseHeader from '@/components/BaseHeader.vue'
import BookInfoBlock from './BookInfoBlock.vue'
import UpdateBook from '@/components/UpdateBook.vue'

import useBooksInfo from './composables/useBooksInfo'

import type { BookInfo } from '@/api/books'
const imgUrl = 'https://picsum.photos/800/600'

const { pageSetting, bookInfoGroup, getBooksInfo, initBooksInfo } = useBooksInfo()

const router = useRouter()
const routeToBookDetail = (bookInfoId: string) => {
  const targetId = getBookId(bookInfoId as string)
  router.push({ name: RouterNameEnum.detailView, params: { id: targetId } })
}

const getBookId = (bookInfoId: string) => {
  const targetId = bookInfoId.split('/')[2]
  return targetId
}

const handleBookInfoCreate = async (createObj: BookInfo) => {
  const { data } = await api.createBookDetail(createObj)
  initBooksInfo()
  routeToBookDetail(data['@id'] as string)
}

// TODO: 做個載入動畫
let isLoading = ref<boolean>(false)
const handleScrollEvent = async () => {
  // 需阻擋載入中狀態, 否則會多次觸發 callback fn
  if (isLoading.value) return
  // 若已載完所有資料則移除事件註冊
  if (!pageSetting.value.hasNextPage) {
    window.removeEventListener('scroll', handleScrollEvent)
  }

  // 滾動過的距離
  const { scrollY } = window
  // 螢幕高度
  const screenHeight = window.screen.height
  // 頁面總高度
  const pageTotalHeight = document.body.scrollHeight
  // 若滾動過的距離 + 螢幕高度 >= 頁面總高度, 則視同觸及底部
  const isCloseBottom = scrollY + screenHeight >= pageTotalHeight
  if (isCloseBottom) {
    isLoading.value = true
    await getBooksInfo()
    isLoading.value = false
  }
}
window.addEventListener('scroll', handleScrollEvent)
</script>

<script lang="ts">
import * as TempRouter from '@/router'
// 額外設置 name 屬性供 keep-alive 識別
// setup-SFC 目前無法自動捕捉 fileName 來設定 name 屬性
// ref issue: https://github.com/vuejs/core/issues/4993
export default {
  name: TempRouter.RouterNameEnum.homeView
}
</script>

<style lang="sass" scoped>
.home_view_root
  .main
    display: grid
    grid-template-columns: repeat(3, 1fr)
    column-gap: 10px
    row-gap: 20px
    padding: 20px 20px 0px
    margin: 0 auto
    .block_wrap
      +flex_center()
      .book_info_block_root
        cursor: pointer
  .load_more
    width: 200px
    height: 40px
    margin: 30px auto
    text-align: center
    line-height: 40px
    background-color: #333
    color: #FFF
    cursor: pointer
</style>
