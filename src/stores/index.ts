import { init } from '@rematch/core'
import { Customer } from '../models/Customer'

export type syncAction<T> = (...args: any[]) => T

const store = init({
  models: { Customer },
})

export default store
