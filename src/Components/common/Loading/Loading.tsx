import * as React from 'react'

import './loading.scss'

const Loading: React.SFC<any> = ({ size = 'full-page' }) => (
  <div className={`loading-spinner-wrapper ${size}`}>
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default Loading
