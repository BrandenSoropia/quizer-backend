import React, { Component } from 'react';
import PropTypes from 'prop-types';
import services from '../services';

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
          <h1>Enter your ID:</h1>
          <p />
          <input
            type="text"
            value={this.state.login_key}
            onChange={this.handleChange}
          />
        </label>
        <p />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

LoginForm.propTypes = {
  login_key: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default LoginForm;
