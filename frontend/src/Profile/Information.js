import React, { Component } from "react";
import { connect } from 'react-redux';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      address: "",
      city: "",
      zipcode:"",
      province: "",
      country: "",
      phonenumber: "",
      companyname: "",
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBtnUpdate = this.handleBtnUpdate.bind(this);
    this.handleAddressInput = this.handleAddressInput.bind(this);
    this.handleCityInput = this.handleCityInput.bind(this);
    this.handleZipcodeInput = this.handleZipcodeInput.bind(this);
    this.handleProvinceInput = this.handleProvinceInput.bind(this);
    this.handleCountryInput = this.handleCountryInput.bind(this);
    this.handlePhoneNumberInput = this.handlePhoneNumberInput.bind(this);
    this.handleCompanyNameInput = this.handleCompanyNameInput.bind(this);
  }

  handleBtnUpdate() {
    this.setState({isOpen: true});
  }

  handleCancel() {
    this.setState({isOpen: false});
  }

  handleUpdate(event) {
    event.preventDefault();
    fetch('/updateprofil', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.UserId,
        address: this.state.address,
        city: this.state.city,
        zipcode: this.state.zipcode,
        province: this.state.province,
        country: this.state.country,
        phonenumber: this.state.phonenumber,
        companyname: this.state.companyname,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(x => {
      return x.text();
    }).then(res => {
      var parsed = JSON.parse(res);
      if(parsed.status) {
        this.setState({address: parsed.my_infos.address});
        this.setState({city: parsed.my_infos.city});
        this.setState({zipcode: parsed.my_infos.zipcode});
        this.setState({province: parsed.my_infos.province});
        this.setState({country: parsed.my_infos.country});
        this.setState({phonenumber: parsed.my_infos.phonenumber});
        this.setState({companyname: parsed.my_infos.companyname});
        console.log(parsed.status);
      }
    })
    this.setState({address: ""});
    this.setState({city: ""});
    this.setState({zipcode: ""});
    this.setState({province: ""});
    this.setState({country: ""});
    this.setState({phonenumber: ""});
    this.setState({companyname: ""});
    /*this.getInformations(); */ ////////////////////////////////////////////////////////////////////////////////
    this.setState({isOpen: false});
  }

  handleAddressInput(event) {
    this.setState({address: event.target.value});
  }

  handleCityInput(event) {
    this.setState({city: event.target.value});
  }

  handleZipcodeInput(event) {
    this.setState({zipcode: event.target.value});
  }
 
  handleProvinceInput(event) {
    this.setState({province: event.target.value});
  }

  handleCountryInput(event) {
    this.setState({country: event.target.value});
  }

  handlePhoneNumberInput(event) {
    this.setState({phonenumber: event.target.value});
  }

  handleCompanyNameInput(event) {
    this.setState({companyname: event.target.value});
  }
  
  getInformations = () => {
    fetch('/getprofil', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.UserId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(x => {
      return x.text();
    }).then(res => {
      var parsed = JSON.parse(res); //debugger
      if(parsed.status) {
        var infos = parsed.result.informations; //debugger
        this.setState({address: infos.address});
        this.setState({city: infos.city});
        this.setState({zipcode: infos.zipcode});
        this.setState({province: infos.province});
        this.setState({country: infos.country});
        this.setState({phonenumber: infos.phonenumber});
        this.setState({companyname: infos.companyname});
        this.props.dispatch({ type: "setCompanyName", payload: infos.companyname });
      } 
    })
  }
  
  componentDidMount() {
    this.getInformations();
  }

  render() { //<div class="unstackable two fields">
    const my_form = (
      <form className="ui form">
        <div className="field">
          <label>Address</label>
          <div className="ui input">
            <input type="text" placeholder="Address" value={this.state.address} 
              onChange={this.handleAddressInput}/>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>City</label>
            <div className="ui input">
              <input type="text" placeholder="City" value={this.state.city} 
                onChange={this.handleCityInput}/>
            </div>
          </div>
          <div className="field">
            <label>Zip code</label>
            <div className="ui input">
              <input type="text" placeholder="Zip code" value={this.state.zipcode}
                onChange={this.handleZipcodeInput}/>
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Province</label>
            <div className="ui input">
              <input type="text" placeholder="Province" value={this.state.province} 
                onChange={this.handleProvinceInput}/>
            </div>
          </div>
          <div className="field">
            <label>Country</label>
            <div className="ui input">
              <input type="text" placeholder="Country" value={this.state.country} 
                onChange={this.handleCountryInput}/>
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Phone number</label>
            <div className="ui input">
              <input type="tel" placeholder="Phone number" value={this.state.phonenumber} 
                onChange={this.handlePhoneNumberInput}/>
            </div>
          </div>
          <div className="field">
            <label>Company name (if you are a seller)</label>
            <div className="ui input">
              <input type="text" placeholder="Company name" value={this.state.companyname} 
                onChange={this.handleCompanyNameInput}/>
            </div>
          </div>
        </div>
        
        <button type="submit" className="ui green button" onClick={this.handleUpdate}>
          Submit
        </button>
        <button className="ui red button" onClick={this.handleCancel}>
          Cancel
        </button>
      </form>
    );
    const my_update = (
      <table className='ui grey table'>
        <thead>
          <tr>
            <th colSpan="3">My informations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="first_row">Address:</td>
            <td colSpan="2" id="second_row">{this.state.address}</td>
          </tr>
          <tr>
            <td id="first_row">&nbsp;</td>
            <td colSpan="2" id="second_row">
              {this.state.zipcode},&nbsp;{this.state.city}
            </td>
          </tr>
          <tr>
            <td id="first_row">&nbsp;</td>
            <td colSpan="2" id="second_row">
              ({this.state.province}),&nbsp;{this.state.country}</td>
          </tr>
          <tr>
            <td id="first_row">Téléphone: </td>
            <td colSpan="2" id="second_row">{this.state.phonenumber}</td>
          </tr>
          <tr>
            <td id="first_row">Company name: </td>
            <td colSpan="2" id="second_row">{this.state.companyname}</td>
          </tr>
          <tr>
            <td colSpan="3">
              <button id="first_row_btn" className='ui green button' onClick={this.handleBtnUpdate}>
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
    if(!this.state.isOpen) {
      return(<div>
        {my_update}
        </div>);
    } else {
      return(<div>
        <h3 className="ui header">My informations</h3>
        <div className="ui divider" />
          {my_form}
      </div>);
    }
  }
}

function mapStateToProps(state){
  return {
    LoggedIn: state.loggedIn,
    Pseudo: state.pseudo,
    BtnLogin: state.btnLogin,
    UserId: state.userId,
  }
}

///////////////////////////////////////////////////
export default connect(mapStateToProps)(Information);
///////////////////////////////////////////////////

/*
<div class="field">
          <div class="ui checkbox">
            <input type="checkbox" class="hidden" tabindex="0" />
            <label>Do you want to become a seller?</label>
          </div>
        </div>
*/