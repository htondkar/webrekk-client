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
        `${customer.name.first} ${customer.name.last}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map(customer => ({
        value: customer.customerID,
        label: `${customer.name.first} ${customer.name.last}`,
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
  getStats(customers: ICustomer[]) {
    const { m, w } = compose(countBy(toLower), map(prop('gender')))(customers)
    return [
      {
        value: m,
        label: 'Male',
        colorIndex: 'graph-1',
      },
      {
        value: w,
        label: 'Female',
        colorIndex: 'graph-2',
      },
    ]
  },
}
