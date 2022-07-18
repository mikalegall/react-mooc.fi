import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }


  const handleLoginFormSubmit = (event) => {
    event.preventDefault()
    handleLogin(event)
  }


  return (
    <>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
        username
          <input
            type="text"
            value={username} /* Input-field will be controlled by variable 'username' from App-State */
            name="Username"
            onChange={({ target }) => handleUsernameChange(target.value)} /* Handler from App-State setUsername() will run changes on variable 'username' when input-field is changing */
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

}

LoginForm.displayName = 'LoginForm'
export default LoginForm