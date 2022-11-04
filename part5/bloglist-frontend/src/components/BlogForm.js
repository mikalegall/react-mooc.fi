import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('') // This component has a State and its value
  // 'title' will be controlled by this component
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    console.log('addBlog event = ', event)
    console.log('addBlog event.timeStamp = ', event.timeStamp)
    console.log('addBlog event.target (form) = ', event.target)
    // npm install json-server --save-dev
    // json-server -p3001 --watch db.json
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    createBlog({
      blogObject
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          <h2>Create a new blog</h2>
          Title: <input
            type="text"
            name="title"
            id='blog-input-title'
            placeholder='Write blog title here'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          Author: <input
            type="text"
            name="author"
            id='blog-input-author'
            placeholder='Write blog author here'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          Url: <input
            type="text"
            name="url"
            id='blog-input-url'
            placeholder='Write blog url here'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
