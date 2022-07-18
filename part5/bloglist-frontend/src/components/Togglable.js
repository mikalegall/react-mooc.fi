import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

//const Togglable = (props) => {
const Togglable = forwardRef((props, ref) => {

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  }
  )

  return (
    <div>
      {/*
        Inline Style
        https://fullstackopen.com/osa2/tyylien_lisaaminen_react_sovellukseen#inline-tyylit
        */}
      <div style={hideWhenVisible}> {/* display: 'none' */}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}> {/* display: '' */}
        {props.children} {/* 'Togglable' is reusable component so 'props.children' is
                              anything that has been placed between
                              <Togglable>
                                <FooBar /> // Like e.g. <LoginForm /> or <NoteForm />
                              </Togglable> */}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable