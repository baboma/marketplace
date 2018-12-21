import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <div id="my_footer">
        <footer>
          <div id="footer">
            <img src="images/picto-cell.png" alt="picto cellulaire"/>
            <span>+1 514-296-5030</span>
          </div>
          <div id="footer">
            <img src="images/picto-email.png" alt="picto enveloppe"/>
            <span><a href="mailto:munungu.andy@gmail.com">munungu.andy@gmail.com</a></span>
          </div>
          <div id="footer">
            <img src="images/picto-linkedin.png" alt="picto linked"/>
            <span><a href="https://www.linkedin.com/in/andy-munungu">www.linkedin.com/in/andy-munungu</a></span>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;