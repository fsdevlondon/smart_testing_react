/* eslint react/jsx-no-bind: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

const Login = ({ username, password, handleSubmit, handleChange }) => (
  <form className="form-signin">
    <FormGroup>
      <h2 className="form-signin-heading">Please sign in</h2>
    </FormGroup>

    <FormGroup>
      <FormControl
        className="form-control"
        id="email"
        type="string"
        value={username}
        onChange={handleChange.bind(null, 'username')}
        placeholder="Enter email"
      />
      <FormControl
        className="form-control"
        id="password"
        type="password"
        value={password}
        onChange={handleChange.bind(null, 'password')}
        placeholder="Password"
      />
    </FormGroup>

    <Button bsSize="large" bsStyle="primary" onClick={handleSubmit}>
      Sign in
    </Button>
  </form>
)

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default Login
