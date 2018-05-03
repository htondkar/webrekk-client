import sampleData from '../data/sampleData'
import { syncAction } from '../stores/index'

export const genderDict = {
  m: 'Male',
  w: 'Female',
}

export interface ICustomer {
  birthday: string
  customerID: number
  customerLifetimeValue: number
  gender: string | 'm' | 'w'
  lastContact: string | null
  name: {
    first: string
    last: string
  }
}

export type CustomersStateType = {
  customers: ICustomer[]
}

export type CustomerStoreType = {
  state: CustomersStateType
  reducers: { [key: string]: syncAction<CustomersStateType> }
  effects: { [key: string]: syncAction<CustomersStateType> }
}

export const Customer: CustomerStoreType = {
  state: {
    customers: sampleData,
  },
  reducers: {
    addCustomer(state, payload: ICustomer) {
      return { ...state, customers: [...state.customers, payload] }
    },
    editCustomer(state, payload) {
      const { customerID, ...data } = payload
      console.log(customerID, data)
      return state
    },
  },
  effects: {},
}
