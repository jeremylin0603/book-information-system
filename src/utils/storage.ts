/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookInfo } from '@/api/books'

enum StorageKeys {
  modify = 'modify'
}

export const setBookInfo = (bookInfo: BookInfo) => {
  return setSessionStorage(StorageKeys.modify, bookInfo)
}

export const getBookInfo = () => {
  const bookInfo = sessionStorage.getItem(StorageKeys.modify)
  return JSON.parse(bookInfo as string)
}

const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}
