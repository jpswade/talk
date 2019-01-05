import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import UsersReducer from './users';
import PostsReducer from './posts';
import CommentsReducer from './comments';
import ErrorReducer from './error';

export default (history) => combineReducers({
  router: connectRouter(history),
  users: UsersReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
  error: ErrorReducer
});
