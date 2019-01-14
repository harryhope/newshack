import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from '../app/containers/home'

Enzyme.configure({adapter: new Adapter()})

describe('Containers', () => {
  describe('Home', () => {
    it('should greet users', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.find('span').text()).toEqual('Welcome Home')
    })
  })
})
