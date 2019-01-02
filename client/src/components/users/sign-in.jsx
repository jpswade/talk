import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/users';
import { Link } from 'react-router-dom';
import history from "../../history";

class SignIn extends Component {
  handleSignIn(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (email.length === 0 || password.length === 0) {
      alert('Please fill out all fields');
    } else {
      const user = {
        email,
        password
      };

      this.props.signIn(user)
      .then(
        history.push(window.previousLocation && window.previousLocation.pathname !== '/sign-up' ? window.previousLocation : '/')
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <form onSubmit={this.handleSignIn.bind(this)}>
            <h1>Sign in</h1>
            <input name="email" type="email" placeholder="Email" className="u-full-width" ref="email" autoFocus />
            <input name="password" type="password" placeholder="Password" className="u-full-width" ref="password" />
            <input name="submit" type="submit" className="button button-primary u-full-width" value="Sign in" />
          </form>
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { signIn })(SignIn);
