import React, { Component } from 'react';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import Cart from './Cart';
import Profile from '../Profile/Profile';
import Home from './Home';
import { connect } from 'react-redux';

class Section extends Component {

  render() {
    if(this.props.btnClicked === "accueil") { // || this.props.btnClicked === undefined
      return (
        <div id="my_section">
          <section>
            <Home />
          </section>
        </div>
      );
    }
    if(this.props.btnClicked === "signin" || this.props.BtnLogin) {
      return (
        <div id="my_section">
          <section>
            <Login />
          </section>
        </div>
      );
    }
    if(this.props.btnClicked === "signup") {
      return (
        <div id="my_section">
          <section>
            <Signup />
          </section>
        </div>
      );
    }
    if(this.props.btnClicked === "cart") {
      this.props.dispatch({type: "setCartBtn", payload: true});
      return (
        <div id="my_section">
          <section>
            <Cart />
          </section>
        </div>
      );
    }    
    if(this.props.btnClicked === "profile") {
      return (
        <div id="my_section">
          <section>
            <Profile />
          </section>
        </div>
      );
    }    
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
export default connect(mapStateToProps)(Section);
///////////////////////////////////////////////////