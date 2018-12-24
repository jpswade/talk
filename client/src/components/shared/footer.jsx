import React, { Component } from 'react';

const footerStyles = {
  borderTop: '1px solid #E1E1E1',
  padding: '10px',
  marginTop: '20px',
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  backgroundColor: 'white'
};

class Footer extends Component {
  render() {
    return (
      <footer style={footerStyles}>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              Serverless Forum
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
