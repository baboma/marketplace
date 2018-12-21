import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';

class Cart extends Component {

  render() {
    if(!this.props.LoggedIn) {
      return(<div>
        <Login />
      </div>);
    } else {
      return(<div>
        <h1>Votre panier est encore vide</h1>
      </div>);
    }
  }
} 

function mapStateToProps(state){
  return {
    LoggedIn: state.loggedIn,
    Pseudo: state.pseudo,
    BtnLogin: state.btnLogin,
    BtnCart: state.btnCart,
    //LoggedOut: state.loggedOut,
  }
}

///////////////////////////////////////////////////
export default connect(mapStateToProps)(Cart);
///////////////////////////////////////////////////