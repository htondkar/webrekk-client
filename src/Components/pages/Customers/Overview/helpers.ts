import { ICustomer } from '../../../../models/Customer'

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
}
