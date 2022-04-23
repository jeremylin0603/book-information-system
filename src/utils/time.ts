export const getTime = (date: string) => {
  if (isNaN(Date.parse(date))) throw console.error('wrong date format at getTime function')

  const time = new Date(date)
  return {
    year: time.getFullYear(),
    month: dateMakeUpZero(time.getMonth() + 1),
    date: dateMakeUpZero(time.getDate()),
    hour: dateMakeUpZero(time.getHours()),
    seconds: dateMakeUpZero(time.getSeconds()),
    minutes: dateMakeUpZero(time.getMinutes())
  }
}

const dateMakeUpZero = (setDate: number) => {
  return setDate < 10 ? '0' + setDate : setDate
}
