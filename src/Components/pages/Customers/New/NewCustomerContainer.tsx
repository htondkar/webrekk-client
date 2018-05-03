import * as React from 'react'
import FullPage from '../../../common/FullPage/FullPage'
import Animate from 'grommet/components/Animate'
import Heading from 'grommet/components/Heading'

import './new-customer.sass'
import { getAnimationSetting } from '../../../common/animation/animationSettings'
import { newCustomerMessages } from './messages'
import CustomerCreateUpdateForm from '../CustomerForms/CustomerCreateUpdateForm'

type NewCustomerContainerProps = {}

export default class NewCustomerContainer extends React.Component<
  NewCustomerContainerProps,
  any
> {
  onSubmit = values => {
    console.log(values)
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
