import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from '../Page/Section';
import Footer from '../Page/Footer';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: "accueil",
    }
    this.handleHomeButton = this.handleHomeButton.bind(this);
    this.handleSigninButton = this.handleSigninButton.bind(this);
    this.handleSignupButton = this.handleSignupButton.bind(this);
    this.handleCartButton = this.handleCartButton.bind(this);
  }

  handleHomeButton() {
    this.setState({isClicked: "accueil"});
  }

  handleSigninButton() {
    this.setState({isClicked: "signin"});
  }

  handleSignupButton() {
    this.setState({isClicked: "signup"});
  }

  handleCartButton() {
    this.setState({isClicked: "cart"});
  }

  render() {
    const my_header = (<div id="my_header"> 
      <header>
        <br/><br/>
        <div id="my_logo">
          <img src="images/logomarketplace.png" width="400px" height="84px" alt="logo market place"/>
        </div>
        <br/><br/>
        <div id="nav_bar">
          <button className="my_button" onClick={this.handleHomeButton}>Home</button>
          <button className="my_button" onClick={this.handleSigninButton}>Sign in</button>
          <button className="my_button" onClick={this.handleSignupButton}>Sign up</button>
          <button className="my_button" onClick={this.handleCartButton}><img src="images/carts.png" 
            alt="picto cart"/></button>
          <span id="cart_num_item">0</span>
        </div>
        <br/><br/>
        <div id="search_bar">
          
        </div>
      </header>
    </div>);
    //////////////////////////////////////////////
    // <div className="ui action input">
    // <input type="text" placeholder="Search..."/>
    // <button className="ui button">Search</button>
    // </div>
    /////////////////////////////////////////////
    /*if(this.state.isClicked === undefined) {
      return (<div id="my_home_page">
        {my_header}
        <br/><br/>
        <Section />
        <br/><br/>
        <Footer />
      </div>);
    } else {*/
      return (<div id="my_home_page">
        {my_header}
        <br/><br/>
        <Section btnClicked={this.state.isClicked}/>
        <br/><br/>
        <Footer />
      </div>);
    //}
  }
}

function mapStateToProps(state){
  return {
    LoggedIn: state.loggedIn,
    Pseudo: state.pseudo,
    BtnLogin: state.btnLogin,
    //LoggedOut: state.loggedOut,
  }
}

///////////////////////////////////////////////////
export default connect(mapStateToProps)(Main);
///////////////////////////////////////////////////