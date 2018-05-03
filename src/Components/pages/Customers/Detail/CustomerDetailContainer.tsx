import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import FullPage from '../../../common/FullPage/FullPage'
import Animate from 'grommet/components/Animate'
import Heading from 'grommet/components/Heading'
import { getAnimationSetting } from '../../../common/animation/animationSettings'
import { customerDetailMessages } from './messages'
import CustomerCreateUpdateForm from '../CustomerForms/CustomerCreateUpdateForm'
import { connect } from 'react-redux'
import { CustomersStateType } from '../../../../models/Customer'

import './edit-customer.sass'
import api from '../../../../api/api'
import UserNotifier from '../../../../Notification/Notification'

export type CustomerDetailContainerProps = {
  Customer: CustomersStateType
} & RouteComponentProps<{
  customerID: string
}>

class CustomerDetailContainer extends React.Component<
  CustomerDetailContainerProps,
  never
> {
  onSubmit = async values => {
    try {
      await api.editCustomer(this.props.match.params.customerID, values)
      UserNotifier.withSuccess(customerDetailMessages.editCustomerSuccess)
    } catch (error) {
      UserNotifier.withError(customerDetailMessages.editCustomerFail)
    }
  }

  removeCustomer = async () => {
    try {
      await api.removeCustomer(this.props.match.params.customerID)
      UserNotifier.withSuccess(customerDetailMessages.removeSuccess)
      this.props.history.push('/customers')
    } catch (error) {
      UserNotifier.withError(customerDetailMessages.removeFail)
    }
  }

  getInitialValues = () => {
    const finder = customer =>
      customer.customerID === parseInt(this.props.match.params.customerID, 10)
    const theCustomer = this.props.Customer.customers.find(finder)

    if (!theCustomer) {
      return {}
    }

    return {
      ...theCustomer,
      firstName: theCustomer.name.first,
      lastName: theCustomer.name.last,
    }
  }

  render() {
    return (
      <FullPage className="edit-customer">
        <Animate enter={getAnimationSetting({})} keep={true}>
          <Heading tag="h3">{customerDetailMessages.title}</Heading>
        </Animate>

        <Animate enter={getAnimationSetting({ delay: 750 })} keep={true}>
          <CustomerCreateUpdateForm
            onSubmit={this.onSubmit}
            initialValues={this.getInitialValues()}
            editMode={true}
            onRemove={this.removeCustomer}
          />
        </Animate>
      </FullPage>
    )
  }
}

const mapState = state => ({
  Customer: state.Customer,
})

const mapDispatch = ({ Customer: { editCustomer } }) => ({
  editCustomer,
})

const connector = connect<
  { Customer: CustomersStateType },
  {},
  CustomerDetailContainerProps
>(mapState, mapDispatch)

export default withRouter(connector(CustomerDetailContainer))
