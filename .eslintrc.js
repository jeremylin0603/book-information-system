module.exports = {
  root: true,
  env: {
    node: true
  },
  // vue 3.2 版本後 script setup 不用再 import defineEmits & defineProps, 因此宣告 globals 關閉錯誤警告
  // 參考連結：https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops-%E5%92%8C-defineemits
  globals: {
    defineEmits: true,
    defineProps: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {}
}
