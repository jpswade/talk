import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import configureStore from './store';
import history from "./history";

import App from './components/app';
import PostsIndex from './containers/posts/PostsContainer';
import PostDetail from './containers/posts/PostDetailContainer';
import PostNew from './containers/posts/PostNewContainer';
import SignUp from './components/users/sign-up';
import SignIn from './components/users/sign-in';

import { SIGN_IN } from './actions/constants';

const initialState = {};
const store = configureStore(initialState, history);

const payload = JSON.parse(localStorage.getItem('currentUser'));

if(payload) {
  store.dispatch({ payload, type: SIGN_IN });
}

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={PostsIndex}/>
        <Route path="/index" component={PostsIndex}/>
        <Route path="/posts/new" component={PostNew} />
        <Route path="/posts/:id/show" component={PostDetail} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </App>
    </ConnectedRouter>
  </Provider>
);
