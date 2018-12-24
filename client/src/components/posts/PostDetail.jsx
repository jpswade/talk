import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import Textarea from 'react-textarea-autosize';

const breakPattern = /<br\s*[/]?>/gi;

const postUlStyles = {
  marginBottom: '10px'
};

const postLiStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  listStyle: 'none'
};

const postTitleStyles = {
  fontSize: '20px',
  marginBottom: '0px'
};

const deletePostStyles = {
  marginLeft: '10px',
  float: 'right'
};

const editPostStyles = {
  marginLeft: '10px',
  float: 'right'
};

const postAuthorStyles = {
  fontStyle: 'italic',
  float: 'right',
  color: '#B1B1B1'
};

const hrStyles = {
  margin: '10px 0px'
};

const clearStyles = {
  clear: 'both'
};

const noDataAvailableStyles = {
  marginTop: '20px',
  textAlign: 'center'
};

const timeAgoStyles = {
  fontStyle: 'italic',
  color: '#B1B1B1',
  float: 'left'
};

const gravatarStyles = {
  'height': '30px',
  'display': 'inline-block'
};

const md = new MarkdownIt({
  linkify: true,
  html: true,
  breaks: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {
        // Don't fail
      }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
  },
});

export default class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {editing: false, title: '', body: ''};
  }

  onEditPost() {
    const { post } = this.props;
    this.setState({editing: true, title: post.title, body: post.body.replace(breakPattern, "\n")});
  }

  onUpdatePost(event) {
    event.preventDefault();
    this.props.onUpdatePost(this.state);

    this.setState({editing: false});
    this.props.post.title = this.state.title;
    this.props.post.body = this.state.body.replace(breakPattern, "\n");
  }

  onDeletePost(event) {
    event.preventDefault();
    this.props.onDeletePost(this.state);
  }

  render() {
    const { post, isAuthor } = this.props;
    const { editing, title, body } = this.state;
    post.body = post.body.replace(breakPattern, "\n");

    return (
      <div className="row">
        <div className="twelve columns">
          {post ? (
            <div>
              <ul style={postUlStyles}>
                <li key={`post-${post.id}`} style={postLiStyles}>
                  <h1 style={postTitleStyles}>
                    {editing ? (
                      <input className="u-full-width" type="text" value={title}
                             onChange={event => {this.setState({title: event.target.value})}}/>
                    ) : post.title}
                  </h1>
                  <hr style={hrStyles}/>
                  {editing ? (
                    <Textarea className="u-full-width" value={body}
                              onChange={event => {this.setState({body: event.target.value})}}/>
                  ) : <div dangerouslySetInnerHTML={{ __html: md.render(post.body) }}></div>}
                  <hr style={hrStyles}/>
                  <TimeAgo date={+post.createdAt} style={timeAgoStyles}/>
                  {isAuthor ? (
                    editing ? (
                      <div>
                        <button style={deletePostStyles}
                                onClick={() => {this.setState({editing:false, body: post.body})}}>
                          <i className="fa fa-times"></i>
                        </button>
                        <button style={editPostStyles} onClick={this.onUpdatePost.bind(this)}>
                          <i className="fa fa-check"></i>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button style={deletePostStyles} onClick={this.onDeletePost.bind(this)}>
                          <i className="fa fa-trash"></i>
                        </button>
                        <button style={editPostStyles} onClick={this.onEditPost.bind(this)}>
                          <i className="fa fa-pencil-square-o"></i>
                        </button>
                      </div>
                    )
                  ) : null}
                  <span style={postAuthorStyles}><img style={gravatarStyles}
                                                      src={post.author.gravatar}
                                                      alt={post.author.username}/> ● {post.author.username}</span>
                  <div style={clearStyles}></div>
                </li>
              </ul>
            </div>
          ) : <div style={noDataAvailableStyles}>Seems like this post is not available <br /><Link to="/">Go back</Link>
          </div> }
        </div>
      </div>
    );
  }
}