<template>
  <div class="home_view_root">
    <BaseHeader title="The book shelf" right-button-text="Create" @click:right-button="handleCreate"></BaseHeader>
    <main class="main">
      <BookInfoBlock
        v-for="bookInfo in bookInfoGroup"
        :key="bookInfo.isbn"
        :title="bookInfo.title"
        :author="bookInfo.author"
        :img-url="imgUrl"
        @click="handleBookInfoClick(bookInfo)"
      ></BookInfoBlock>
    </main>
    <pre>{{ bookInfoGroup }}</pre>
  </div>
</template>
<script setup lang="ts">
import { getBooks } from '@/api/books'
import { ref } from 'vue'

import BaseHeader from '@/components/BaseHeader.vue'
import BookInfoBlock from '@/components/BookInfoBlock.vue'

import type { BookInfo } from '@/api/books'
const imgUrl = 'https://picsum.photos/800/600'

type BookInfoGroup = Array<BookInfo>

const bookInfoGroup = ref<BookInfoGroup>({} as BookInfoGroup)

getBooks({
  page: 1,
  itemsPerPage: 30
})
  .then(res => {
    bookInfoGroup.value = res.data['hydra:member']?.map(createBookInfo)
  })
  .catch(err => {
    throw err
  })

const createBookInfo = ({
  title = '',
  author = '',
  isbn = '',
  publicationDate = '',
  description = ''
} = {}): BookInfo => {
  return {
    title,
    author,
    isbn,
    publicationDate,
    description
  }
}

const handleBookInfoClick = (bookInfo: BookInfo) => {
  console.log(bookInfo)
}

const handleCreate = () => {
  console.log('click create')
}
</script>
<style lang="sass" scoped>
.home_view_root
  .main
    display: grid
    .book_info_block_root
      cursor: pointer
</style>
