import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
    }
    this.handleCartButton = this.handleCartButton.bind(this);
  }

  getAllProducts = () => {
    fetch('/allproducts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(x => {
      return x.text();
    }).then(res => {
      var products = [];
      //const myArray;
      var parsed = JSON.parse(res);
      if(parsed.status) {
        const myArray = parsed.prd.map(p => {
          return p.products
        });
        myArray.forEach(p => {
          if(p !== undefined) {
            products = products.concat(p);
          }
        })
        this.setState({allProducts: products});
      } else {
        console.log("The server does not respond...");
      }
    })
  }

  handleCartButton() {
    this.props.dispatch({});
  }

  componentDidMount() {
    setInterval(this.getAllProducts, 400);
    //this.getAllProducts();
  }

  render() {
    const nf = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const allproducts = (<div id="grid-4_xs-2" className="grid-4_xs-2">
      {this.state.allProducts.map((product, ind) => {
        return(<div className="col" key={"div01"+ind}>
          <div className="ui card" key={"div02"+ind}>
            <img src={"uploads\\"+product.productimage} className="ui centered image" alt="" width="150px"/>
            <div className="content" key={"div03"+ind}>
              <div className="header">{product.productname}</div>
              <div className="header">{nf.format(product.productprice)}</div>
              <div className="meta">{product.brandname}</div>
              <div className="header">Sold by:&nbsp;{product.productseller}</div>
              <div className="description">
                {product.productdesc}
              </div>
            </div>
            <div className="extra content" key={"div04"+ind}>
              
                <button className="ui inverted green button" onClick={this.handleCartButton}>
                  Add to cart
                </button>
              
            </div>
          </div>
        </div>);
      })}
    </div>);

    return(<div>
      {allproducts}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    LoggedIn: state.loggedIn,
    Pseudo: state.pseudo,
    BtnLogin: state.btnLogin,
    UserId: state.userId,
    //LoggedOut: state.loggedOut,
    //BtnProfile: state.btnProfile,
  }
}

///////////////////////////////////////////////////
export default connect(mapStateToProps)(Home);
///////////////////////////////////////////////////

