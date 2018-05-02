import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export type CustomerDetailContainerProps = RouteComponentProps<{
  customerId: string
}>

class CustomerDetailContainer extends React.Component<
  CustomerDetailContainerProps,
  never
> {
  render() {
    return <div>CustomerDetailContainer</div>
  }
}

export default withRouter(CustomerDetailContainer)
