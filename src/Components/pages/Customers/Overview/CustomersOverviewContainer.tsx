import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter'
import Animate from 'grommet/components/Animate'
import Button from 'grommet/components/Button'
import Heading from 'grommet/components/Heading'
import Search from 'grommet/components/Search'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { CustomersStateType } from '../../../../models/Customer'
import { syncAction } from '../../../../stores/index'
import { getAnimationSetting } from '../../../common/animation/animationSettings'
import FullPage from '../../../common/FullPage/FullPage'
import { routesDefinition } from '../../../routes/routes.def'
import CustomersOverview from './CustomersOverview'
import { customerOverviewHelpers } from './helpers'
import { customersOverviewMessages } from './messages'
import './customers-overview.sass'

export type CustomersOverviewProps = RouteComponentProps<never> & {
  addCustomer: syncAction<CustomersStateType>
  Customer: CustomersStateType
}

type CustomersOverviewState = {
  search: string
  sortAscending: boolean
}

class CustomersOverviewContainer extends React.Component<
  CustomersOverviewProps,
  CustomersOverviewState
> {
  constructor(props) {
    super(props)
    this.state = { search: '', sortAscending: false }
  }

  setSearchTerm = term => this.setState({ search: term })
  setSort = sortAscending => this.setState({ sortAscending })

  onSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    this.setSearchTerm(target.value)
  }

  onSearchResultSelect = ({ suggestion: { value: customerID } }) => {
    this.setSearchTerm('')
    this.props.history.push(`${routesDefinition.customers.edit}/${customerID}`)
  }

  onSort = (index, sortAscending: boolean) => {
    this.setSort(sortAscending)
  }

  getSearchSuggestions = () => {
    if (!this.state.search) {
      return []
    }

    return customerOverviewHelpers.search(
      this.props.Customer.customers,
      this.state.search
    )
  }

  getCustomersList = sortBy => {
    const { customers } = this.props.Customer
    const { sortAscending } = this.state
    return customerOverviewHelpers.sort(customers, sortBy, sortAscending)
  }

  render() {
    const customers = this.getCustomersList({ sortBy: 'customerLifetimeValue' })
    return (
      <FullPage className="customers-overview">
        <Animate enter={getAnimationSetting({})} keep={true}>
          <section className="customers-overview__toolbar">
            <Heading tag="h3">{customersOverviewMessages.title}</Heading>
            <Search
              placeHolder="Search"
              inline={true}
              fill={true}
              onDOMChange={this.onSearch}
              suggestions={this.getSearchSuggestions()}
              onSelect={this.onSearchResultSelect}
              value={this.state.search}
            />
            <Button
              label={customersOverviewMessages.action}
              path={routesDefinition.customers.new}
              accent={true}
            />
          </section>
        </Animate>

        <Animate enter={getAnimationSetting({ delay: 750 })} keep={true}>
          <CustomersOverview
            list={customers}
            onSort={this.onSort}
            sortAscending={this.state.sortAscending}
          />
        </Animate>

        <Animate enter={getAnimationSetting({ delay: 1000 })} keep={true}>
          <AnnotatedMeter
            type="bar"
            size="small"
            max={customers.length}
            series={customerOverviewHelpers.getStats(customers)}
          />
        </Animate>
      </FullPage>
    )
  }
}

const mapState = state => ({
  Customer: state.Customer,
})

const mapDispatch = ({ Customer: { addCustomer } }) => ({
  addCustomer,
})

const connector = connect<{ Customer: CustomersStateType }, {}, CustomersOverviewProps>(
  mapState,
  mapDispatch
)

export default withRouter(connector(CustomersOverviewContainer))
