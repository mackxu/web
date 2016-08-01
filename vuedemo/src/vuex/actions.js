/**
 * actions 用在components中管理状态
 */
import { INCREMENT } from './mutations'

export const incrementCounter = ({dispatch}) => {
  dispatch(INCREMENT, 1)
}
