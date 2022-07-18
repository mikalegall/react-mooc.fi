import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('add new blog title (place holder)') // This component has a State and its value
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
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          Author: <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          Url: <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
