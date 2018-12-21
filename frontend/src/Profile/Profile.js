import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order';
import Product from './Product';
import Information from './Information';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      date: "",
      isClicked: "informations",
    }
    this.getUserInfos = this.getUserInfos.bind(this);
    this.handleInfos = this.handleInfos.bind(this);
    this.handleOrders = this.handleOrders.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
  }

  getUserInfos() {
    //debugger
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify({
        pseudo: this.props.Pseudo,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(x => {
      return x.text();
    }).then(res => {
      //debugger
      var parsed = JSON.parse(res);
      if(parsed.status){
        this.setState({name: parsed.result.name});
        this.setState({email: parsed.result.email});
        this.setState({date: parsed.result.date_insc});
      }
    })
  }

  componentDidMount() {
    this.getUserInfos();
  }

  handleInfos() {
    this.setState({isClicked: "informations"});
  }

  handleOrders() {
    this.setState({isClicked: "orders"});
  }

  handleProducts() {
    this.setState({isClicked: "products"});
  }

  render() {
    var response = null;
    if(this.state.isClicked === "informations") {
      response = (<div>
        <Information />
      </div>
      );
    }
    if(this.state.isClicked === "orders") {
      response = (<div>
        <Order />
      </div>
      );
    }
    if(this.state.isClicked === "products") {
      response = (<div>
        <Product />
      </div>
      );
    }
    return(<div className="my_profile">
      <div id="my_header" className='ui text container'>
        <div className='ui left aligned container'>
          <h2 className='ui header'>{this.state.name}</h2>
          <h2 className='ui header'>{this.state.email}</h2>
        </div>
        <div className='ui right aligned container'>
          joined: {new Date(this.state.date).toDateString()}
        </div>     
        <div className='ui divider' />   
      </div>
      <div id="my_main">
        <div id="my_nav">
          <button id="my_profilebtn" className='ui basic button' onClick={this.handleInfos}>
            Informations
          </button>
          <button id="my_profilebtn" className='ui basic button' onClick={this.handleOrders}>
            Orders
          </button>
          <button id="my_profilebtn" className='ui basic button' onClick={this.handleProducts}>
            Products
          </button>
        </div>
        <div id="my_article">
          {response}
        </div>
      </div>
    </div>);
  }
} 

function mapStateToProps(state) {
  return {
    LoggedIn: state.loggedIn,
    Pseudo: state.pseudo,
    BtnLogin: state.btnLogin,
    //LoggedOut: state.loggedOut,
    //BtnProfile: state.btnProfile,
  }
}

///////////////////////////////////////////////////
export default connect(mapStateToProps)(Profile);
///////////////////////////////////////////////////