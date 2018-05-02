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
}

const CustomersOverview: React.SFC<CustomersOverviewProps> = ({
  list,
  onSort,
  sortAscending,
}) => {
  return (
    <Table>
      <TableHeader
        labels={['ID', 'Name', 'Gender', 'Customer Value']}
        sortIndex={3}
        onSort={onSort}
        sortAscending={sortAscending}
      />

      <tbody>
        {list.map(customer => (
          <TableRow key={customer.customerID}>
            <td>{customer.customerID}</td>
            <td>{`${customer.name.first} ${customer.name.last}`}</td>
            <td>{genderDict[customer.gender]}</td>
            <td>{customer.customerLifetimeValue}</td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  )
}

export default CustomersOverview
