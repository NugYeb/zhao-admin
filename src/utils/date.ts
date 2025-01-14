import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.locale('zh-cn')

export const dateTimeFormat = (date: string): string => {
  return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
}

export const dateFormat = (date: string): string => {
  return dayjs.utc(date).local().format('YYYY-MM-DD')
}

export const relativeCurrentTime = (date: string): string => {
  return dayjs.utc(date).local().fromNow()
}
