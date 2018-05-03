import { ICustomer } from '../../../../models/Customer'
import { compose, map, countBy, prop, toLower } from 'ramda'

export const customerOverviewHelpers = {
  search(
    customerList: ICustomer[],
    search: string
  ): Array<{ value: number; label: string }> {
    return customerList
      .filter(customer =>
        `${customer.firstName} ${customer.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map(customer => ({
        value: customer.customerID,
        label: `${customer.firstName} ${customer.lastName}`,
      }))
  },

  sort(
    customers: ICustomer[],
    sortByKey: keyof ICustomer,
    sortAscending: boolean
  ): ICustomer[] {
    const sorter = sortAscending
      ? (customerA, customerB) =>
          customerA.customerLifetimeValue - customerB.customerLifetimeValue
      : (customerA, customerB) =>
          customerB.customerLifetimeValue - customerA.customerLifetimeValue

    return customers.sort(sorter)
  },

  getStats: compose(
    map(([gender, count]) => ({
      value: count,
      label: gender,
      colorIndex: gender === 'm' ? 'graph-1' : 'graph-2',
    })),
    Object.entries,
    countBy(toLower),
    map(prop('gender'))
  ),
}
