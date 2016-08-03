/**
 * actions 用在components中管理状态
 */
import { INCREMENT, PLUS } from './mutations'

export const incrementCounter = ({dispatch}, amount = 1) => {
  dispatch(INCREMENT, amount)
}

export const plusCounter = ({dispatch}, amount = 1) => {
  dispatch(PLUS, amount)
}
