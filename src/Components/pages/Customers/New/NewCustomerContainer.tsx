import * as React from 'react'
import FullPage from '../../../common/FullPage/FullPage'
import Animate from 'grommet/components/Animate'
import Heading from 'grommet/components/Heading'

import './new-customer.sass'
import { getAnimationSetting } from '../../../common/animation/animationSettings'
import { newCustomerMessages } from './messages'
import CustomerCreateUpdateForm from '../CustomerForms/CustomerCreateUpdateForm'
import api from '../../../../api/api'
import UserNotifier from '../../../../Notification/Notification'
import { withRouter, RouteComponentProps } from 'react-router-dom'

type NewCustomerContainerProps = RouteComponentProps<never>

class NewCustomerContainer extends React.Component<NewCustomerContainerProps, any> {
  preProcessFormValues = values => ({
    ...values,
    name: {
      first: values.firstName,
      last: values.lastName,
    },
  })

  onSubmit = async values => {
    try {
      await api.createNewCustomer(this.preProcessFormValues(values))
      UserNotifier.withSuccess(newCustomerMessages.newCustomerSuccess)
      this.props.history.push('/customers')
    } catch (error) {
      UserNotifier.withSuccess(newCustomerMessages.newCustomerFail)
      console.log(error)
    }
  }

  render() {
    return (
      <FullPage className="new-customer">
        <Animate enter={getAnimationSetting({})} keep={true}>
          <Heading tag="h3">{newCustomerMessages.title}</Heading>
        </Animate>

        <Animate enter={getAnimationSetting({ delay: 750 })} keep={true}>
          <CustomerCreateUpdateForm onSubmit={this.onSubmit} />
        </Animate>
      </FullPage>
    )
  }
}

export default withRouter(NewCustomerContainer)
