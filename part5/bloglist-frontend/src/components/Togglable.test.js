import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('TOGGLABLE: ', () => {

  let container

  beforeEach(() => {

    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
            togglable content
        </div>
      </Togglable>
    ).container

  })


  test('Renders its children', () => {
    screen.getByText('togglable content')
  })


  test('At start the children are not displayed', () => {
    //<div style={showWhenVisible} className="togglableContent">
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })


  test('After clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    //<div style={showWhenVisible} className="togglableContent">
    const div = container.querySelector('.togglableContent')

    expect(div).not.toHaveStyle('display: none') // display: ''
    //expect(div).toHaveStyle('display: block')
  })

})
