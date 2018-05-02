import * as React from 'react'
import './full-page.sass'

const FullPage: React.SFC<any> = ({ children, className, ...rest }) => {
  return (
    <div className={`full-page ${className || ''}`} {...rest}>
      {children}
    </div>
  )
}

export default FullPage
