import { init } from '@rematch/core'
import { Customer } from '../models/Customer'
import { reducer as formReducer } from 'redux-form'

export type syncAction<T> = (...args: any[]) => T

const store = init({
  models: { Customer },
  redux: {
    reducers: {
      form: formReducer,
    },
  },
})

export default store
