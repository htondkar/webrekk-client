import axios, { AxiosInstance } from 'axios'
import { GlobalSettings } from '../settings'

class Api {
  private readonly http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: GlobalSettings.apiURL,
      timeout: 4000,
    })
  }

  getAllCustomers = () => {
    return this.http.get('customers')
  }

  getOneCustomers = customerID => {
    return this.http.get(`customers/${customerID}`)
  }

  createNewCustomer = values => {
    return this.http.post(`customers`, values)
  }

  editCustomer = (customerID, values) => {
    return this.http.patch(`customers/${customerID}`, values)
  }

  removeCustomer = customerID => {
    return this.http.delete(`customers/${customerID}`)
  }
}

export default new Api()
