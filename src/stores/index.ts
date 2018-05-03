import { init } from '@rematch/core'
import { Customer } from '../models/Customer'
import { reducer as formReducer } from 'redux-form'

export type syncAction<T> = (...args: any[]) => T
export type aSyncAction<T> = (...args: any[]) => Promise<T> | Promise<void>

const store = init({
  models: { Customer },
  redux: {
    reducers: {
      form: formReducer,
    },
  },
})

export default store
