import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signin from '../Login/Signin';
import Signout from '../Login/Signout';

class Main extends Component {

  render() {
    if(!this.props.LoggedIn) {
      return(<div>
        <Signin />
        </div>);
    } else {
      return(<div>
        <Signout />
        </div>);
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
export default connect(mapStateToProps)(Main);
///////////////////////////////////////////////////