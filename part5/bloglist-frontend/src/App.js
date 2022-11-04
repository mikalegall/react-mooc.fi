import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [messageTypeError, setMessageTypeError] = useState('')


  //useEffect( () => ..., [])
  // useEffect takes 2 args (first is the actual code and second is for setup triggers)
  // When ever Component is rendered also Effect is executed but empty array [] means 'render only onces'
  // We can have multiple effect hooks
  useEffect(() => {
    const loggedUserString = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserString) {
      const loggedUserJSON = JSON.parse(loggedUserString)
      setUser(loggedUserJSON)
      blogService.setToken(loggedUserJSON.token)
    }

    //return window.localStorage.removeItem('loggedBlogAppUser')

  }, [])

  // We can have multiple effect hooks
  useEffect(() => {
    const loggedUserString = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserString) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])


  //Enables access to another component's functions via
  // foo.current.bar()
  //e.g. blogFormRef.current.toggleVisibility()
  // https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}> {/* Reusable component with different label */}
      <BlogForm createBlog={addBlog} /> {/* addBlog = form onSubmit -->
                                      --> axios.post(baseUrl, newObject, config) */}
    </Togglable>
  )

  const addBlog = (props) => {
    blogFormRef.current.toggleVisibility() //Located inside Togglable: useImperativeHandle()

    blogService
      .create(props.blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(`A new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`)
        setMessageTypeError(false)

        setTimeout(() => {
          setMessage(null)
          setMessageTypeError(null)
        }, 5000)

      })

  }



  const loginFormRef = useRef()

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}> {/* Reusable component with different label */}
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={setUsername}
        handlePasswordChange={setPassword}
        handleLogin={handleLoginFormSubmit} /* handleLoginFormSubmit = form onSubmit --> axios.post(baseUrl, newObject, config) */
      />
    </Togglable>
  )

  const handleLoginFormSubmit = async () => {
    loginFormRef.current.toggleVisibility()

    try {
      const user = await loginService.login(
        {
          username,
          password,
        }
      )

      // local storage can be viewed on the console by typing
      //window.localStorage straight to the open console
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      //Quick and dirty debug can be done also (e.g. in TypeScript)
      //@ts-ignore
      //window.myVariable = someVariable;

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('DEBUG: Login exception = ', exception)
      setMessage('Wrong username or password')
      setMessageTypeError(true)

      setTimeout(() => {
        setMessage(null)
        setMessageTypeError(null)
      }, 5000)
    }

  }


  const logOut = () => (
    window.localStorage.removeItem('loggedBlogAppUser')
  )

  const controlDbItemView = (props) => {
    const blog = blogs.find(b => b.id === props)
    const changedBlog = { ...blog, viewAll: !blog.viewAll }
    setBlogs(blogs.map(blog => blog.id !== props ? blog : changedBlog))
  }
  // const controlDbItemView = (props) => {
  //   const blog = blogs.find(b => b.id === props) // Find returns the whole object of first appearence
  //   const changedBlog = { ...blog, viewAll: !blog.viewAll } // Spread syntax + add new field by dot-notation

  //   blogService
  //     .update(props, changedBlog)
  //     .then(returnedBlog => {
  //       setBlogs(blogs.map(blog => blog.id !== props ? blog : returnedBlog))
  //     })
  //     .catch(error => {
  //       console.log('Promise was rejected = ', error)

  //       setMessage(`Updating blog '${blog.title}' ends up to an error = `)
  //       setMessageTypeError(true)

  //       setTimeout(() => {
  //         setMessage(null)
  //         setMessageTypeError(null)
  //       }, 5000)
  //     })

  // }



  const addLikes = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        returnedBlog['viewAll'] = true
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log('Promise was rejected = ', error)

        setMessage(`Updating blog '${blog.title}' ends up to an error = `)
        setMessageTypeError(true)

        setTimeout(() => {
          setMessage(null)
          setMessageTypeError(null)
        }, 5000)
      })

  }


  const removeItem = (blog) => {
    const { id, title, author } = blog

    if (window.confirm(`Remove blog '${title}' by '${author}' `)) {

      blogService.remove(id)

      setBlogs(blogs.filter(b =>
        b.id !== id
      ))

    }

  }


  return (
    <div>
      {
        user === null ?
          <>
            <h2>Login</h2>

            <Notification message={message} messageTypeError={messageTypeError} />

            {loginForm()}
          </>
          :
          <>
            <h2>blogs</h2>

            <Notification message={message} messageTypeError={messageTypeError} />

            {user.name} logged in <button id="logout-button" onClick={() => logOut()}>logout</button>

            {blogForm()}

            {/* {blogs.sort((firstItem, secondItem) => firstItem.likes - secondItem.likes) */}
            {blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} controlDbItemView={controlDbItemView} addLikes={addLikes} removeItem={removeItem} />
              )
            }
          </>
      }
    </div>
  )
}

export default App
