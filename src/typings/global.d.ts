/* eslint-disable @typescript-eslint/no-empty-interface */
// 新建 global.d.ts 文件用來聲明全域命名空間
// 目的為解決 .d.ts file 有 import 聲明語句時，檔案會被當成一個 module 而非全域聲明，造成不能 import 其他類型進 .d.ts file
// 參考連結: https://juejin.cn/post/6981281393812701191
import { AxiosResponse } from 'axios'

declare namespace GlobalType {
  interface G_AxiosResponse<D> extends AxiosResponse<D> {}
}

/** export =
 * TS 可以轉成 CommonJS & AMD 模塊，但在兩者不兼容的情況下 TS 衍生出自己的 export 聲明方式
 */
export = GlobalType

/** export as namespace GlobalType
 * 將指定的命名空間做全域掛載，可當變數使用
 */
export as namespace GlobalType
