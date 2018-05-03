import * as React from 'react'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import { ICustomer, genderDict } from '../../../../models/Customer'
import TableHeader from 'grommet/components/TableHeader'
// import EditIcon from 'grommet/components/icons/base/Edit'

type CustomersOverviewProps = {
  list: ICustomer[]
  onSort: (index: number, ascending: boolean) => void
  sortAscending: boolean
  onCustomerSelect: (customer: ICustomer) => void
}

const CustomersOverview: React.SFC<CustomersOverviewProps> = ({
  list,
  onSort,
  sortAscending,
  onCustomerSelect,
}) => {
  const onSelect = index => onCustomerSelect(list[index])

  return (
    <Table selectable={true} onSelect={onSelect}>
      <TableHeader
        labels={['ID', 'Name', 'Gender', 'Customer Value']}
        onSort={onSort}
        sortAscending={sortAscending}
      />

      <tbody>
        {list.map(customer => (
          <TableRow key={customer.customerID}>
            <td>{customer.customerID}</td>
            <td>{`${customer.firstName} ${customer.lastName}`}</td>
            <td>{genderDict[customer.gender]}</td>
            <td>{customer.customerLifetimeValue}</td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  )
}

export default CustomersOverview
