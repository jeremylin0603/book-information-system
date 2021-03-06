import { ref, onMounted, reactive } from 'vue'
import { getBooks } from '@/api/books'

import type { BookInfo, GetBooksReq } from '@/api/books'
import { Ref } from 'vue'

interface PageSetting extends GetBooksReq {
  hasNextPage: boolean
}

type BookInfoGroup = Array<BookInfo>

interface FnReturn {
  pageSetting: Ref<PageSetting>
  bookInfoGroup: Ref<BookInfoGroup>
  getBooksInfo: () => Promise<void>
  createBookInfo: (bookInfo: BookInfo) => BookInfo
  initBooksInfo: () => void
}

export default function useBooksInfo(): FnReturn {
  const bookInfoGroup = ref<BookInfoGroup>([] as BookInfoGroup)
  const pageSetting = ref<PageSetting>({} as PageSetting)

  const initBooksInfo = () => {
    createInitData()
    getBooksInfo()
  }

  const createInitData = () => {
    bookInfoGroup.value = []
    pageSetting.value = {
      page: 0,
      itemsPerPage: 30,
      hasNextPage: true
    }
  }

  const getBooksInfo = async () => {
    if (pageSetting.value.hasNextPage) {
      pageSetting.value.page++
      const { page, itemsPerPage } = pageSetting.value
      const params = {
        'order[publicationDate]': 'desc',
        page,
        itemsPerPage
      }
      const data = await apiGetBooks(params)
      const booksInfo = data['hydra:member']?.map(createBookInfo)
      bookInfoGroup.value.push(...booksInfo)
      pageSetting.value.hasNextPage = checkHasNextPage(pageSetting.value, data['hydra:totalItems'])
    }
  }

  const apiGetBooks = async (params: GetBooksReq) => {
    const { data } = await getBooks(params)
    return data
  }

  const createBookInfo = ({
    ['@id']: id = '',
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
      description,
      id
    }
  }

  const checkHasNextPage = (pageSetting: PageSetting, totalItems: number) => {
    const { page, itemsPerPage } = pageSetting
    const loadedItemsCount = page * itemsPerPage
    return loadedItemsCount < totalItems
  }

  onMounted(initBooksInfo)

  return {
    pageSetting,
    bookInfoGroup,
    getBooksInfo,
    createBookInfo,
    initBooksInfo
  }
}
