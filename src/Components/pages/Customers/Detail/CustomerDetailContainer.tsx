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
import { evolve } from 'ramda'

import './edit-customer.sass'
import api from '../../../../api/api'
import UserNotifier from '../../../../Notification/Notification'
import { parseServerErrors } from '../../../../helpers/formHelpers'
import { SubmissionError } from 'redux-form'

export type CustomerDetailContainerProps = {
  Customer: CustomersStateType
} & RouteComponentProps<{
  customerID: string
}>

class CustomerDetailContainer extends React.Component<
  CustomerDetailContainerProps,
  never
> {
  preProcessValues = evolve({
    birthday: value => new Date(value).toISOString(),
  })

  onSubmit = async values => {
    try {
      await api.editCustomer(
        this.props.match.params.customerID,
        this.preProcessValues(values)
      )
      UserNotifier.withSuccess(customerDetailMessages.editCustomerSuccess)
    } catch (error) {
      UserNotifier.withError(customerDetailMessages.editCustomerFail)
      const errors = parseServerErrors(error.response.data.message)
      throw new SubmissionError(errors)
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

    const birthdayDate = new Date(theCustomer.birthday)
    const birthday = `${birthdayDate.getFullYear()}-${birthdayDate.getMonth()}-${birthdayDate.getDate()}`
    return {
      ...theCustomer,
      birthday,
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
