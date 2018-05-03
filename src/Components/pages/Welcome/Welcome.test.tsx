import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Welcome from './Welcome'
import { shallow } from 'enzyme'

describe('Welcome page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Welcome />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders correct items', () => {
    const wrapper = shallow(<Welcome />)
    wrapper.find('h3').exists()
    wrapper.find('button').exists()
  })

  it('redirect when clicked on action button without crashing', () => {
    const wrapper = shallow(<Welcome />)
    setTimeout(() => wrapper.find('button').simulate('click'), 1000)
  })
})
