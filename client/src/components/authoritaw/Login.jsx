import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login, clearError } from '../../redux/actions/authActions';
import { Error, Form } from './Signup';

import { Input, MainButton } from '../../styles/components';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function enterSandman(e) {
    e.preventDefault();
    await props.login({ email, password });
    setTimeout(() => props.clearError(), 5000);
  }

  return (
    <Form login>
      <h3>Login</h3>
      <Input
        type="text"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <MainButton
        color="nBlue"
        disabled={!email || !password}
        onClick={enterSandman}
      >
        Abandon all hope...
      </MainButton>

      {/* <button className="toggle-button" onClick={props.toggleForms}>register</button> */}
      <Error>{props.error}</Error>
    </Form>
  );
}

function mapStateToProps(state) {
  return {
    error: state.auth.loginError
  }
}

export default connect(mapStateToProps, { login, clearError })(Login);
