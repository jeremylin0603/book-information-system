import api from '@/utils/axios'

interface GetBooksReq {
  page: number
  itemsPerPage: number
}

// 僅對作業需求作最低限度類型聲明
interface GetBooksRes {
  'hydra:member': Array<{
    title: string
    author: string
    isbn: string
    publicationDate: string
    description: string
  }>
}

export const getBooks = (params: GetBooksReq): BaseRes<GetBooksRes> => {
  return api.get('/books', params)
}
