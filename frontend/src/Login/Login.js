import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      serverMsg: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();

    /*const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);*/
    //debugger
    const getTooltip = (elements) => {        
      while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
          return elements;
        }
      }          
      return false;      
    }
    //debugger
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ 
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(x => {
      //debugger
      return x.text(); 
    }).then(res => {
      //debugger
      var parsed = JSON.parse(res); 
      //debugger
      if(parsed.status){
        this.props.dispatch({ type: "setLoggedIn", payload: parsed.status });
        this.props.dispatch({ type: "setUserId", payload: parsed.result.id });
        this.props.dispatch({ type: "setPseudo", payload: parsed.result.pseudo });
      } else {
        this.setState({serverMsg: parsed.message});
        var spanTag = document.getElementById('server_msg');
        getTooltip(spanTag).style.display = "inline";
      }
    })
    this.setState({
      email: "",
      password: ""
    })
  }

  deactivateTooltips = () => {
    var spans = document.getElementsByTagName('span'),
        spansLength = spans.length;  
    for (var i = 0 ; i < spansLength ; i++) {
      if (spans[i].className === 'tooltip') {
        spans[i].style.display = 'none';
      }
    }       
  }

  componentDidMount() {
    this.deactivateTooltips();
  }

  handleEmailChanged(event) {
    this.setState({email: event.target.value});
    const getTooltip = (elements) => {        
      while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
          return elements;
        }
      }          
      return false;      
    }
    (function() { // Utilisation d'une IIFE pour éviter les variables globales.
      var email = document.getElementById('email'), 
          tooltipStyle = getTooltip(email).style;
      var RegEx = /^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/;
      if (email.type === 'text') {
        //debugger;
        email.addEventListener('keyup', () => {
          if (RegEx.test(email.value)) {
            email.className = "correct";
            tooltipStyle.display = "none";
          } else {
            email.className = "incorrect";
            tooltipStyle.display = "inline";
          }
        }, false); 
      }
    })();
  }

  handlePasswordChanged(event) {
    this.setState({password: event.target.value}); 
    const getTooltip = (elements) => {        
      while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
          return elements;
        }
      }          
      return false;      
    }
    (function() { // Utilisation d'une IIFE pour éviter les variables globales.
      var pwd1 = document.getElementById('pwd1'), 
          tooltipStyle = getTooltip(pwd1).style;   
      if (pwd1.type === 'password') {
        //debugger;
        pwd1.addEventListener('keyup', () => {
          if (pwd1.value.length >= 8) {
            pwd1.className = "correct";
            tooltipStyle.display = "none";
          } else {
            pwd1.className = "incorrect";
            tooltipStyle.display = "inline";
          }
        }, false); 
      }
    })();
  }  

  render() {
    return(<div>
      <form id="my_form" onSubmit={this.handleSubmit}> 
        <span><h1>LOGIN</h1></span> 
        <br/> 
        <div id="server_msg"></div>
        <span className="tooltip">
          {this.state.serverMsg}
        </span>
        <label className="form_col" htmlFor="email">
          Email
        </label>
        <input id="email" type="text" value={this.state.email} 
          onChange={this.handleEmailChanged} placeholder="e-mail" required/>
        <span className="tooltip">
          Enter a valid e-mail.
        </span>
        <br/>
        <label className="form_col" htmlFor="pwd1">
          Password
        </label>
        <input id="pwd1" type="password" value={this.state.password} 
          onChange={this.handlePasswordChanged} placeholder="password" required/>
          <span className="tooltip">
          At least 8 characters.
        </span>
        <br/>
        <input type="submit" value="Submit" />     
        <br/>   
      </form>
    </div>)
  }
}

export default connect()(Login);