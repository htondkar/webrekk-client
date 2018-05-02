import Animate from 'grommet/components/Animate'
import Button from 'grommet/components/Button'
import Heading from 'grommet/components/Heading'
import * as React from 'react'

import { getAnimationSetting } from '../../common/animation/animationSettings'
import CenterContent from '../../common/CenterContent/CenterContent'
import FullPage from '../../common/FullPage/FullPage'
import { routesDefinition } from '../../routes/routes.def'
import { welcomeMessages } from './messages'

import './welcome.sass'

const Welcome = () => (
  <FullPage className="welcome-page">
    <CenterContent>
      <Animate enter={getAnimationSetting({})} keep={true}>
        <Heading uppercase={true} strong={false} tag="h3" margin="large">
          {welcomeMessages.title}
        </Heading>
      </Animate>

      <Animate enter={getAnimationSetting({ delay: 750 })} keep={true}>
        <Button label={welcomeMessages.action} path={routesDefinition.customers.index} />
      </Animate>
    </CenterContent>
  </FullPage>
)

export default Welcome
