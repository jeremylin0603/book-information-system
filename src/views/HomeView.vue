<template>
  <pre>{{ showData }}</pre>
</template>
<script setup lang="ts">
import { getBooks } from '@/api/books'
import { ref } from 'vue'

import type { BookInfo } from '@/api/books'
const showData = ref({})

getBooks({
  page: 1,
  itemsPerPage: 30
})
  .then(res => {
    showData.value = res.data['hydra:member']?.map(createBookInfo)
  })
  .catch(err => {
    throw err
  })

const createBookInfo = ({ title = '', author = '', isbn = '', publicationDate = '', description = '' }): BookInfo => {
  return {
    title,
    author,
    isbn,
    publicationDate,
    description
  }
}
</script>
<style lang="sass"></style>
