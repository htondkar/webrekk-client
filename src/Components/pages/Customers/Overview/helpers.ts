import { ICustomer } from '../../../../models/Customer'
import compose from 'ramda/es/compose'
import map from 'ramda/es/map'
import countBy from 'ramda/es/countBy'
import prop from 'ramda/es/prop'
import toLower from 'ramda/es/toLower'

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
