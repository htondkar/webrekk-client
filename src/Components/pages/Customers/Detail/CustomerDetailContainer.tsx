import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export type CustomerDetailContainerProps = RouteComponentProps<{
  customerID: string
}>

class CustomerDetailContainer extends React.Component<
  CustomerDetailContainerProps,
  never
> {
  render() {
    return <div>CustomerDetailContainer | id: {this.props.match.params.customerID}</div>
  }
}

export default withRouter(CustomerDetailContainer)
