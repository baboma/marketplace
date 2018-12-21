import React, { Component } from 'react';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pseudo: "",
      name: "",
      password1: "",
      password2: "",
      signup_resp: "",
      signup_resp_status: false,
      serverMsg: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handlePseudoChanged = this.handlePseudoChanged.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handlePwd1Changed = this.handlePwd1Changed.bind(this);
    this.handlePwd2Changed = this.handlePwd2Changed.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const getTooltip = (elements) => {        
      while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
          return elements;
        }
      }          
      return false;      
    }
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(
        { 
          pseudo: this.state.pseudo,
          email: this.state.email,
          name: this.state.name,
          password: this.state.password1,
      })
    }).then(x => {
      return x.text();
    }).then(res => {
      //debugger
      var parsed = JSON.parse(res); 
      //debugger
      if(parsed.status) {
        this.setState({signup_resp: parsed.message});
        this.setState({signup_resp_status: parsed.status});
      } else {
        this.setState({serverMsg: parsed.message});
        debugger
        var spanTag = document.getElementById('server_msg'),
            tooltipStyle = getTooltip(spanTag).style;
        tooltipStyle.display = "inline"; debugger
      }
    })
    this.setState({
      email: "",
      pseudo: "",
      name: "",
      password1: "",
      password2: "",
    })
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
            tooltipStyle.display = "iniline";
          }
        }, false); 
      }
    })();
  }

  handlePseudoChanged(event) {
    this.setState({pseudo: event.target.value});
    const getTooltip = (elements) => {        
      while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
          return elements;
        }
      }          
      return false;      
    }
    (function() { // Utilisation d'une IIFE pour éviter les variables globales.
      var pseudo = document.getElementById('pseudo'),
          tooltipStyle = getTooltip(pseudo).style;   
      if (pseudo.type === 'text') {
        //debugger;
        pseudo.addEventListener('keyup', () => {
          if (pseudo.value.length >= 6) {
            pseudo.className = "correct";
            tooltipStyle.display = "none";
          } else {
            pseudo.className = "incorrect";
            tooltipStyle.display = "inline";
          }
        }, false); 
      }
    })();
  }

  handleNameChanged(event) {
    this.setState({name: event.target.value});
    (function() { // Utilisation d'une IIFE pour éviter les variables globales.
      var name = document.getElementById('name');   
      if (name.type === 'text') {
        //debugger;
        name.addEventListener('keyup', () => {
          if (name.value.length >= 10) {
            name.className = "correct";
            //debugger;
          } else {
            name.className = "incorrect";
            //debugger
          }
        }, false); 
      }
    })();
  }

  handlePwd1Changed(event) {
    this.setState({password1: event.target.value});
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

  handlePwd2Changed(event) {
    this.setState({password2: event.target.value});
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
          pwd2 = document.getElementById('pwd2'),
          tooltipStyle = getTooltip(pwd2).style;
      if(pwd1.value === pwd2.value && pwd2.value !== '') {
        pwd2.className = "correct";
        tooltipStyle.display = "none";
      } else {
        pwd2.className = "incorrect";
        tooltipStyle.display = "inline";
      }    
    })();
  }

  handleLoginBtn() {
    this.props.dispatch({type: "setLoginBtn", payload: true});
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

  render() {
    if(this.state.signup_resp_status) {
      return (<div id="server_response">
        <br/><br/>
        <p>{this.state.signup_resp}</p>
        <br/><br/>
        <p>
          <button className="my_button" onClick={this.handleLoginBtn}>Log in</button>
        </p>
      </div>);
    } else {
      return(<div>
        <form id="my_form" onSubmit={this.handleSubmit}>
          <span><h1>SIGN UP</h1></span> 
          <br/>  
          <div id="server_msg"></div> 
          <span className="tooltip">
            {this.state.serverMsg}
          </span>
          <label className="form_col" htmlFor="email">
            Email
          </label>
          <input id="email" type="text" value={this.state.email} 
            onChange={this.handleEmailChanged} placeholder="email" required/>
          <span className="tooltip">
            Enter a valid e-mail.
          </span>
          <br/>
          <label className="form_col" htmlFor="pseudo">
            Pseudo
          </label>
          <input id="pseudo" type="text" value={this.state.pseudo} 
            onChange={this.handlePseudoChanged} placeholder="pseudo" required/>
          <span className="tooltip">
            At least 6 characters.
          </span>
          <br/>
          <label className="form_col" htmlFor="name">
            Name
          </label>
          <input id="name" type="text" value={this.state.name} 
            onChange={this.handleNameChanged} placeholder="First Name Last Name" required/>
          <span className="tooltip">
            At least 10 characters.
          </span>
          <br/>
          <label className="form_col" htmlFor="pwd1">
            Password
          </label>
          <input id="pwd1" type="password" value={this.state.password1} 
            onChange={this.handlePwd1Changed} placeholder="password" required/>
          <span className="tooltip">
            At least 8 characters.
          </span>
          <br/>
          <label className="form_col" htmlFor="pwd2">
            Confirm Password
          </label>
          <input id="pwd2" type="password" value={this.state.password2} 
            onChange={this.handlePwd2Changed} placeholder="password" required/>
          <span className="tooltip">
            The passwords do not match.
          </span>
          <br/>
          <input type="submit" value="Submit" />     
          <br/>   
        </form>
      </div>);
    }
  }
}

export default connect()(Signup);