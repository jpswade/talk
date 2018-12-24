import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import Textarea from 'react-textarea-autosize';

const breakPattern = /<br\s*[/]?>/gi;

const hrStyles = {
  margin: '10px 0px'
};

const timeAgoStyles = {
  fontStyle: 'italic',
  color: '#B1B1B1'
};

const clearStyles = {
  clear: 'both'
};

const gravatarStyles = {
  'height': '30px',
  'display': 'inline-block'
};

const commentLiStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  marginLeft: '50px',
  listStyle: 'none'
};

const commentBodyStyles = {
  margin: '0px'
};

const commentAuthorStyles = {
  fontStyle: 'italic',
  float: 'right',
  color: '#B1B1B1'
};

const deleteCommentStyles = {
  marginLeft: '10px',
  float: 'right',
  border: 0,
  padding: '10px',
  margin: 0
};

const updateCommentStyles = {
  marginLeft: '10px',
  float: 'right',
  border: 0,
  padding: '10px',
  margin: 0
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

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = { editing: false, body: '' }
  }

  onEditComment() {
    const { comment } = this.props;
    this.setState({editing: true, body: comment.body.replace(breakPattern, "\n")});
  }

  onUpdateComment(event) {
    event.preventDefault();

    const comment = {
      id: this.props.comment.id,
      body: this.state.body
    }

    this.props.onUpdateComment(comment);

    this.setState({editing: false});
    this.props.comment.body = this.state.body.replace(breakPattern, "\n");
  }

  onDeleteComment(event) {
    event.preventDefault();

    const comment = {
      id: this.props.comment.id,
      body: this.state.body
    };

    this.props.onDeleteComment(comment);
  }

  render() {
    const { comment, isAuthor } = this.props;
    const { editing, body } = this.state;
    comment.body = comment.body.replace(breakPattern, "\n");

    return (
      <li style={commentLiStyles}>
        <p style={commentBodyStyles}>
          {editing ? (
            <Textarea className="u-full-width" value={body} onChange={event => {this.setState({body: event.target.value})}} />
          ):<div dangerouslySetInnerHTML={{ __html: md.render(comment.body) }}></div>}
        </p>
        <hr style={hrStyles}/>
        <TimeAgo date={+comment.createdAt} style={timeAgoStyles}/>
        {isAuthor ? (
          editing ? (
            <div>
              <button style={deleteCommentStyles} onClick={() => {this.setState({editing: false, body: comment.body})}}>
                <i className="fa fa-times"></i>
              </button>
              <button style={updateCommentStyles} onClick={this.onUpdateComment.bind(this)}>
                <i className="fa fa-check"></i>
              </button>
            </div>
          ): (
            <div>
              <button style={deleteCommentStyles} onClick={this.onDeleteComment.bind(this)}>
                <i className="fa fa-trash"></i>
              </button>
              <button style={updateCommentStyles} onClick={this.onEditComment.bind(this)}>
                <i className="fa fa-pencil-square-o"></i>
              </button>
            </div>
          )
        ) : null}
              <span style={commentAuthorStyles}>
                <img style={gravatarStyles}
                     src={comment.author.gravatar}
                     alt={comment.author.username}/>
                ● {comment.author.username}
              </span>
        <div style={clearStyles}></div>
      </li>
    )
  }
}