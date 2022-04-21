<template>
  <div>Hello World!</div>
  <pre>{{ showData }}</pre>
</template>
<script setup lang="ts">
import { getBooks } from '@/api/books'
import { ref } from 'vue'
const showData = ref({})
getBooks({
  page: 10,
  itemsPerPage: 10
}).then(res => {
  showData.value = res.data['hydra:member']
})
</script>
<style lang="sass"></style>
