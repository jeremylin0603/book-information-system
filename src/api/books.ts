import api from '@/utils/axios'

export interface GetBooksReq {
  page: number
  itemsPerPage: number
}

export interface GetBooksRes {
  'hydra:member': Array<BookInfo>
  'hydra:totalItems': number
}

// 僅對作業需求作最低限度類型聲明, '@id' 因取值麻煩, 轉成一般命名 'id'
export interface BookInfo {
  '@id'?: string
  id?: string
  title: string
  author: string
  isbn: string
  publicationDate: string
  description: string
}

export const getBooks = (params: GetBooksReq): BaseRes<GetBooksRes> => {
  return api.get('/books', params)
}
