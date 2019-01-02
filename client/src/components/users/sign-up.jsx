import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/users';
import { Link } from 'react-router-dom';
import history from "../../history";

class SignUp extends Component {
  handleSignUp(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const passwordConfirmation = this.refs.passwordConfirmation.value;

    if (email.length === 0 || password.length === 0 || passwordConfirmation.lenght === 0) {
      alert('Please fill out all fields');
    } else if (password !== passwordConfirmation) {
      alert('Passwords do not match');
    } else {
      const user = {
        email,
        username,
        password
      };

      this.props.signUp(user)
      .then(() => history.push('/sign-in'));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <form onSubmit={this.handleSignUp.bind(this)}>
            <h1>Sign up</h1>
            <input name="email" type="email" placeholder="Email" className="u-full-width" ref="email" autoFocus />
            <input name="username" type="text" placeholder="Username" className="u-full-width" ref="username" />
            <input name="password" type="password" placeholder="Password" className="u-full-width" ref="password" />
            <input name="confirm_password" type="password" placeholder="Confirm password" className="u-full-width" ref="passwordConfirmation" />
            <input name="submit" type="submit" className="button button-primary u-full-width" value="Sign up" />
          </form>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { signUp })(SignUp);
