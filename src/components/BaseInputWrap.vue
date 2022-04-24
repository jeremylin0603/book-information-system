<template>
  <div>
    <div class="base_input_wrap_root">
      <div class="input_wrap">
        <div class="title" :class="{ required_mark: props.isRequired }">{{ props.title }}</div>
        <slot></slot>
      </div>
      <div class="err_msg" v-show="showErrMsg">{{ props.errorMessage }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
// TODO: 把顯示 error msg 的邏輯收進來, blur 時驗證
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  showErrMsg: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: '資料不得為空值'
  }
})
</script>
<style lang="sass" scoped>
.base_input_wrap_root
  .input_wrap
    display: flex
    .title
      width: fit-content
      min-width: 120px
      text-align: left
    .required_mark
      &::after
        content: '*'
        margin-left: 2px
        color: red
  .err_msg
    font-size: 12px
    color: red
    line-height: 16px
</style>
