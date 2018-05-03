import sampleData from '../data/sampleData'
import { syncAction, aSyncAction } from '../stores/index'
import api from '../api/api'

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
  firstName: string
  lastName: string
}

export type CustomersStateType = {
  customers: ICustomer[]
  isLoading: boolean
}

export type CustomerStoreType = {
  state: CustomersStateType
  reducers: { [key: string]: syncAction<CustomersStateType> }
  effects: { [key: string]: aSyncAction<CustomersStateType> }
}

export const Customer: CustomerStoreType = {
  state: {
    isLoading: false,
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
    replaceCustomers(state, customers) {
      return { ...state, customers }
    },
    startLoading(state, payload) {
      return {
        ...state,
        isLoading: true,
      }
    },
    endLoading(state, payload) {
      return {
        ...state,
        isLoading: false,
      }
    },
  },
  effects: {
    async fetchAllCustomers() {
      this.startLoading()

      const response = await api.getAllCustomers()
      const customers = response.data as ICustomer[]
      this.replaceCustomers(customers)

      this.endLoading()
    },
  },
}
