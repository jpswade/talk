import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './store';
import history from "./history";

import App from './components/app';
import PostsIndex from './containers/posts/PostsContainer';
import PostDetail from './containers/posts/PostDetailContainer';
import PostNew from './containers/posts/PostNewContainer';
import SignUp from './components/users/sign-up';
import SignIn from './components/users/sign-in';

export default (
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route exact path="/" component={PostsIndex}/>
        <Route path="/index" component={PostsIndex}/>
        <Route path="/posts/new" component={PostNew} />
        <Route path="/posts/:id/show" component={PostDetail} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </App>
    </Router>
  </Provider>
);
