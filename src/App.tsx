import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import CustomerDetailContainer from './Components/pages/Customers/Detail/CustomerDetailContainer'
import CustomersOverviewContainer from './Components/pages/Customers/Overview/CustomersOverviewContainer'
import Welcome from './Components/pages/Welcome/Welcome';

import './styles/index.scss'
import 'grommet/scss/vanilla/index.scss'

const App: React.SFC<{}> = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} component={Welcome} />
      <Route path="/customers" exact={true} component={CustomersOverviewContainer} />
      <Route path="/customers/:customerId" component={CustomerDetailContainer} />
    </Switch>
  </Router>
)

export default App
