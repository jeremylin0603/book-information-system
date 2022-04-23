<template>
  <div class="home_view_root">
    <BaseHeader title="The book shelf" right-button-text="Create" @click:right-button="handleCreate"></BaseHeader>
    <main class="main">
      <div class="block_wrap" v-for="bookInfo in bookInfoGroup" :key="bookInfo.isbn">
        <BookInfoBlock
          :title="bookInfo.title"
          :author="bookInfo.author"
          :img-url="imgUrl"
          @click="handleBookInfoClick(bookInfo)"
        ></BookInfoBlock>
      </div>
    </main>
    <div v-if="pageSetting.hasNextPage" class="load_more" @click="getBooksInfo">Load More</div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/router'
import { setBookInfo } from '@/utils/storage'

import BaseHeader from '@/components/BaseHeader.vue'
import BookInfoBlock from '@/components/BookInfoBlock.vue'

import useBooksInfo from './composables/useBooksInfo'

import type { BookInfo } from '@/api/books'
const imgUrl = 'https://picsum.photos/800/600'

const { pageSetting, bookInfoGroup, getBooksInfo } = useBooksInfo()

const router = useRouter()
const handleBookInfoClick = (bookInfo: BookInfo) => {
  // 考量專案大小和網址長度, 在 route-query, vuex, storage 三者跳轉傳參方式中選擇了較方便的 storage
  setBookInfo(bookInfo)
  router.push({ name: RouterNameEnum.detailView })
}

const handleCreate = () => {
  console.log('click create')
}
</script>

<script lang="ts">
import * as TempRouter from '@/router'
// setup script 的坑, 無法捕捉 setup-SFC 的 fileName 來讓 keep-alive 識別
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
