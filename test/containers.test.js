import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Feed from '../app/containers/feed'
import {store} from 'store'

Enzyme.configure({adapter: new Adapter()})

describe('Containers', () => {
  describe('Feed', () => {
    it('should greet users', () => {
      const wrapper = shallow(<Feed store={store} />)
      expect(wrapper).not.toEqual(null)
    })
  })
})
