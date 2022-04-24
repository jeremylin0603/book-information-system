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
import * as api from '@/api/books'

import BaseHeader from '@/components/BaseHeader.vue'
import BookInfoBlock from './BookInfoBlock.vue'
import UpdateBook from '@/components/UpdateBook.vue'

import useBooksInfo from './composables/useBooksInfo'

import type { BookInfo } from '@/api/books'
const imgUrl = 'https://picsum.photos/800/600'

const { pageSetting, bookInfoGroup, getBooksInfo, initBooksInfo } = useBooksInfo()

const router = useRouter()
const handleBookInfoClick = (bookInfo: BookInfo) => {
  const id = getBookId(bookInfo.id as string)
  router.push({ name: RouterNameEnum.detailView, params: { id } })
}

const getBookId = (id: string) => {
  const targetId = id.split('/')[2]
  return targetId
}

const handleBookInfoCreate = async (createObj: BookInfo) => {
  await api.createBookDetail(createObj)
  initBooksInfo()
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
