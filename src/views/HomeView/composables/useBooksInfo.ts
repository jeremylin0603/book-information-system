import { ref, onMounted, reactive } from 'vue'
import { getBooks } from '@/api/books'

import type { BookInfo, GetBooksReq } from '@/api/books'
import { Ref } from 'vue'

interface PageSetting extends GetBooksReq {
  hasNextPage: boolean
}

type BookInfoGroup = Array<BookInfo>

interface FnReturn {
  pageSetting: PageSetting
  bookInfoGroup: Ref<BookInfoGroup>
  getBooksInfo: () => Promise<void>
}

export default function useBooksInfo(): FnReturn {
  const bookInfoGroup = ref<BookInfoGroup>([] as BookInfoGroup)

  const pageSetting = reactive<PageSetting>({
    page: 0,
    itemsPerPage: 30,
    hasNextPage: true
  })

  const getBooksInfo = async () => {
    if (pageSetting.hasNextPage) {
      pageSetting.page++
      const { page, itemsPerPage } = pageSetting
      const data = await apiGetBooks({ page, itemsPerPage })
      const booksInfo = data['hydra:member']?.map(createBookInfo)
      bookInfoGroup.value.push(...booksInfo)
      pageSetting.hasNextPage = checkHasNextPage(pageSetting, data['hydra:totalItems'])
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

  onMounted(getBooksInfo)

  return {
    pageSetting,
    bookInfoGroup,
    getBooksInfo
  }
}
