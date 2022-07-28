import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// TEST CASES https://testing-library.com/docs/queries/about/#types-of-queries
//getBy Text: throws an error if not found
// #This is useful for ensure that something is defined
// ## expect(elementFooBar).toBeDefined()
//queryBy Text: return null if not found
// #This is useful for asserting an element that is not present
// ## expect(elementFooBar).toBeNull()
//findBy Text: return Promise (rejected after default timeout of1000 ms)
// #This is useful for async / await cases
// ##
// React + Redux https://redux.js.org/usage/writing-tests#connected-components

describe('BLOG:', () => {

  let blog

  beforeEach(() => {

    blog = {
      id: 1,
      title: 'Component testing is done with react-testing-library',
      author: 'Mika Le Gall',
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#rendering-the-component-for-tests',
      likes: 1973,
      viewAll: false
    }

  })

  const controlDbItemView = () => {
    blog = { ...blog, viewAll: !blog.viewAll }
  }

  test('Render blog content', () => {

    //React Testing Library render() # npm install --save-dev @testing-library/react
    //Normally React components are rendered to the DOM. The render method we used
    //renders the components in a format that is suitable for tests without rendering them
    //to the DOM.
    render(<Blog blog={blog} />)

    //https://testing-library.com/docs/queries/about/#debugging
    screen.debug()

    //React Testing Library: screen-object
    //We use screen's method getByText to search for an element that has
    //the item's content and ensure that it exists
    //https://fullstackopen.com/en/part5/testing_react_apps#about-finding-the-elements
    const element = screen.getByText(
      'gal',
      { exact: false } // substring match & // ignore case (not case sensitive)
      // Regex
      // https://testing-library.com/docs/queries/about/#textmatch-examples
    )

    // queryBy... returns null if not found
    const url = screen.queryByText(
      'fullstackopen',
      { exact: false }
    )

    const likes = screen.queryByText(
      '1973',
      { exact: false }
    )

    // getBy... throws an error if not found
    const title = screen.getByText(
      'Component testing is done with react-testing-library',
      { exact: false }
    )

    const author = screen.getByText(
      'Mika',
      { exact: false }
    )

    expect(element).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })


  test('Clicking the button shows more lines from DB item', async () => {

    render(
      <Blog blog={blog} controlDbItemView={controlDbItemView} />
    )

    //https://fullstackopen.com/en/part5/testing_react_apps#clicking-buttons-in-tests
    const button = screen.getByText('View', { exact: false })
    //https://fullstackopen.com/en/part5/testing_react_apps#about-finding-the-elements

    //A session is started to interact with the rendered component
    //https://testing-library.com/docs/user-event/setup/
    const user = userEvent.setup()

    await user.click(button)

    render(<Blog blog={blog} />)

    //Throws an error if not found
    const url = screen.getByText(
      'fullstackopen',
      { exact: false }
    )
    // Throws an error if not found
    const likes = screen.getByText(
      '1973',
      { exact: false }
    )

    expect(url).toBeDefined()
    expect(likes).toBeDefined()

  })


  test('Click twice the like button', async () => {

    render(
      <Blog blog={blog} controlDbItemView={controlDbItemView} />
    )

    const buttonToggleView = screen.getByText('View', { exact: true })
    const user = userEvent.setup()
    await user.click(buttonToggleView)


    // Event handler is a mock function defined with Jest
    const mockHandlerLike = jest.fn()

    render(<Blog blog={blog} addLikes={mockHandlerLike}/>)

    const likeButton = screen.getByText('Like', { exact: true })
    await user.click(likeButton)
    await user.click(likeButton)

    //The expectation of the test verifies that the mock function has been called exactly twice
    expect(mockHandlerLike.mock.calls).toHaveLength(2)

  })

})