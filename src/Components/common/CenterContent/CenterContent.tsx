import * as React from 'react'

import './center-content.sass'

const CenterContent = ({ children, ...rest }) => {
  return (
    <div className="center-content" {...rest}>
      {children}
    </div>
  )
}

export default CenterContent
