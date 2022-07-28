import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BLOGFORM calls the event handler it received as props with the right details', async () => {
  const user = userEvent.setup()
  const mockHandlerCreateBlog = jest.fn()

  /* <input id='blog-input-title' />
  Any CSS selector can be used with this method for searching elements in tests
  const { container } = render(<BlogForm createNote={mockHandlerCreateBlog} />)
  const inputTitle = container.querySelector('#blog-input-title')
  */

  render(<BlogForm createBlog={mockHandlerCreateBlog} />)

  //https://testing-library.com/docs/queries/byplaceholdertext/
  ////Tests gets the access to the the input field using the function getByPlaceholderText
  //https://fullstackopen.com/en/part5/testing_react_apps#about-finding-the-elements 
  const inputTitle = screen.getByPlaceholderText('Write blog title here')
  const inputAuthor = screen.getByPlaceholderText('Write blog author here')
  const inputUrl = screen.getByPlaceholderText('Write blog url here')
  const sendButton = screen.getByText('create')

  //https://testing-library.com/docs/user-event/utility/#type
  //Method type of the userEvent is used to write text to the input field
  //https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms 
  await user.type(inputTitle, 'Testing a form: This is blog TITLE')
  await user.type(inputAuthor, 'Testing a form: This is blog AUTHOR')
  await user.type(inputUrl, 'Testing a form: This is blog URL')
  await user.click(sendButton)

  //The expectation of the test verifies that the mock function has been called exactly once.
  expect(mockHandlerCreateBlog.mock.calls).toHaveLength(1)

  //The expectation of the test checks, that the event handler is called with the right parameters
  //- that a blog with the correct content is created when the form is filled
  expect(mockHandlerCreateBlog.mock.calls[0][0].blogObject.title).toBe('Testing a form: This is blog TITLE')
  expect(mockHandlerCreateBlog.mock.calls[0][0].blogObject.author).toBe('Testing a form: This is blog AUTHOR')
  expect(mockHandlerCreateBlog.mock.calls[0][0].blogObject.url).toBe('Testing a form: This is blog URL')
})