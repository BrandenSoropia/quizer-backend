import React, { Component } from 'react';
import PropTypes from 'prop-types';
import services from '../services';
import styled from 'styled-components';

const EnterIdText = styled.h1`
    color:gray;
    font-size:3em;
`

const LoginInputField = styled.input`
    color: green;
    font-size: 1.5em;
    font-variant: none;
    width: 300px;
    border: 1px solid gray;
    border-bottom: 3px solid gray;
    border-radius: 10px;
    padding: 12px 20px;
`

const LoginButton = styled.input`
    color: white;
    font-size:2em;
    font-variant: small-caps;
    border: none;
    border-radius: 40px;
    padding: 20px 50px;
    background-color: #00be46;
`

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { login_key: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ login_key: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { login_key } = this.state;
    const { setUserId } = this.props;

    services
      .login(login_key)
      .then(id => {
        if (!id) return;
        setUserId(id);
      })
      .catch(error => {
        alert('Sorry, we had trouble logging you in.');
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <EnterIdText>Enter your ID:</EnterIdText>
          <p />
          <LoginInputField
            type="text"
            value={this.state.login_key}
            onChange={this.handleChange}
          />
        </label>
        <p />
        <LoginButton type="submit" value="login" />
      </form>
    );
  }
}

LoginForm.propTypes = {
  login_key: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default LoginForm;
