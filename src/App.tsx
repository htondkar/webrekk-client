import 'grommet/scss/vanilla/index.scss'
import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import CustomerDetailContainer from './Components/pages/Customers/Detail/CustomerDetailContainer'
import NewCustomerContainer from './Components/pages/Customers/New/NewCustomerContainer'
import CustomersOverviewContainer from './Components/pages/Customers/Overview/CustomersOverviewContainer'
import Welcome from './Components/pages/Welcome/Welcome'
import store from './stores'
import './styles/index.scss'

const App: React.SFC<{}> = () => (
  <React.Fragment>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Welcome} />
          <Route path="/customers" exact={true} component={CustomersOverviewContainer} />
          <Route path="/customers/new" component={NewCustomerContainer} />
          <Route path="/customers/edit/:customerID" component={CustomerDetailContainer} />
        </Switch>
      </Router>
    </Provider>

    <Notifications />
  </React.Fragment>
)

export default App
