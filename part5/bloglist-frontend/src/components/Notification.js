const Notification = ({ message, messageTypeError }) => {

  if (message === '' || messageTypeError === null) {
    return null
  } else if (messageTypeError === true) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else if (messageTypeError === false)
    return (
      <div className="info">
        {message}
      </div>
    )
}

export default Notification