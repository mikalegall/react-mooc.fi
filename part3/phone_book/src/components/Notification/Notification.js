import './notification.css'

const Notification = ({ message }) => {
    if (message.error === undefined) {
      return null
    }
  
    return (
        message.error ?
        <div className="errorMessage">
            {message.content}
        </div> 
        :
        <div className="message">
            {message.content}
        </div>
)
  }

  export default Notification