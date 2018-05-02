import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export type CustomersOverviewProps = RouteComponentProps<never> & {}

class CustomersOverview extends React.Component<CustomersOverviewProps, never> {
  render() {
    return <div>CustomersOverview</div>
  }
}

export default withRouter(CustomersOverview)
