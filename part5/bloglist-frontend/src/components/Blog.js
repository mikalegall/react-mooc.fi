
const Blog = ({ blog, controlDbItemView, addLikes, removeItem }) => {

  const { id, title, url, likes, author, viewAll } = blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    viewAll
      ?
      <div key={blog.id} style={blogStyle} className="viewAllBlogContent">
        {title} <button onClick={() => controlDbItemView(id)}>{viewAll ? 'Hide' : 'View'}</button>
        <br />
        {url}
        <br />
        Likes {likes} <button onClick={ () => addLikes(id)}>Like</button>
        <br />
        {author}
        <br />
        <button onClick={ () => removeItem(blog)}>Remove</button>
      </div>
      :
      <div key={blog.id} className="viewBlogTitle">
        {title}
        <br />
        {author}
        <br />
        <button onClick={() => controlDbItemView(id)}>{viewAll ? 'Hide' : 'View'}</button>
        <br />
      </div>
  )


}

export default Blog