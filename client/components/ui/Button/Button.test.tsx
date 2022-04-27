import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '@ui/index'

const mockFn = jest.fn()

describe('<Button />', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined()
  })
  it('should render correctly', () => {
    const tree = shallow(<Button>Text</Button>)
    expect(tree).toMatchSnapshot()
  })
  it('should respond to click events', () => {
    const tree = shallow(<Button onClick={mockFn}>Text</Button>)
    tree.simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
  it('should have an icon', () => {
    // const search = <Button icon="create">Create</Button>
    // const payment = <Button icon="delete">Payment</Button>
    //
    // expect(renderer.create(search).toJSON()).toMatchSnapshot()
    // expect(renderer.create(payment).toJSON()).toMatchSnapshot()
    // expect(renderer.create(lock).toJSON()).toMatchSnapshot()
    // expect(renderer.create(star).toJSON()).toMatchSnapshot()
  })
})
