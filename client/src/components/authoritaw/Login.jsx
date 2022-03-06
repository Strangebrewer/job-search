import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login, clearError } from '../../redux/actions/authActions';
import { Error, Form } from './Signup';

import { Input, MainButton } from '../../styles/components';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function enterSandman(e) {
    e.preventDefault();
    await props.login({ username, password });
    setTimeout(() => props.clearError(), 5000);
  }

  return (
    <Form login>
      <h3>Login</h3>
      <Input
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter your username"
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
        disabled={!username || !password}
        onClick={enterSandman}
      >
        Abandon all hope...
      </MainButton>

      <button className="toggle-button" onClick={props.toggleForms}>register</button>
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
