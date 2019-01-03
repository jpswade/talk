import 'whatwg-fetch';

import { QUERY_URL } from './index';

import {
  ERROR,
  CREATE_POST,
  GET_POSTS,
  GET_POST,
  GET_COMMENTS,
  UPDATE_POST,
  DELETE_POST
} from './constants';

export function createPost(post) {
  const query = { "query":
    `mutation createPost {
      post: createPost (
        title: "${post.title}",
        body: "${post.body}"
        jwt: "${post.jwt}"
      )
      {
        id
        title
        body
      }
    }`
  };

  return (dispatch) => fetch(`${QUERY_URL}`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_POST,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getPosts() {
  const query = { 'query':
    `{
      posts {
        id
        title
        createdAt
        updatedAt
        author {
          id
          username
          gravatar
        }
        comments {
          id
          body
          createdAt
          updatedAt
        }
      }
    }`
  };

  return (dispatch) => fetch(`${QUERY_URL}`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_POSTS,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getPost(id) {
  const query = { 'query':
    `{
      post(id: "${id}") {
        id
        title
        body
        createdAt
        updatedAt
        author {
          id
          username
          gravatar
        }
        comments {
          id
          body
          createdAt
          updatedAt
          author {
            id
            username
            gravatar
          }
        }
      }
    }`
  };

  return (dispatch) => fetch(`${QUERY_URL}`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => json.errors ? Promise.reject(json.errors[0]) : json) 
  .then(json => {
    let payload = json;
    dispatch({
      type: GET_POST,
      payload: payload
    });
    if (payload.data.post) {
      payload = {
        data: {
          comments: payload.data.post.comments
        }
      };
    }
    return payload;
  })
  .then(payload => dispatch({
    type: GET_COMMENTS,
    payload: payload
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updatePost(post) {
  const query = { "query":
    `mutation updatePost {
      post: updatePost (
        id: "${post.id}"
        title: "${post.title}"
        body: "${post.body}"
        jwt: "${post.jwt}"
      )
      {
        id
      }
    }`
  };

  return (dispatch) => fetch(`${QUERY_URL}`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_POST,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function deletePost(post) {
  const query = { "query":
    `mutation deletePost {
      post: deletePost (
        id: "${post.id}"
        jwt: "${post.jwt}"
      )
      {
        id
      }
    }`
  };

  return (dispatch) => fetch(`${QUERY_URL}`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: DELETE_POST,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
