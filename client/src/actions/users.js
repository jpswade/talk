import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'connected-react-router';

import { QUERY_URL } from './index';
import { resetError } from './error';

import {
  ERROR,
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT
} from './constants';

export function signUp(user) {
  const query = { "query":
    `mutation signUp {
      user: signUp (
        email: "${user.email}"
        username: "${user.username}"
        password: "${user.password}"
      )
      {
        id
        username
        email
      }
    }`
  };

  return (dispatch) => fetch(`${QUERY_URL}`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: SIGN_UP,
    payload: json
  }))
  .then(() => dispatch(push('/sign-in')))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function signIn(user) {
  const query = { "query":
    `mutation signIn {
      user: signIn (
        email: "${user.email}",
        password: "${user.password}"
      )
      {
        id
        username
        email
        jwt
        gravatar
      }
    }`
  };

  return (dispatch) => {
    dispatch(resetError());

    return fetch(`${QUERY_URL}`, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(json => _.isEmpty(json.errors) ? json : Promise.reject(json.errors[0]))
    .then(payload => {
      dispatch({ payload, type: SIGN_IN });
      dispatch(push(window.previousLocation && window.previousLocation.pathname !== '/sign-up' ? window.previousLocation : '/'));
    })
    .catch(exception => dispatch({
      type: ERROR,
      payload: exception.message
    }));
  }
}

export function signOut() {
  return dispatch => {
    dispatch({ type: SIGN_OUT });
  }
}
