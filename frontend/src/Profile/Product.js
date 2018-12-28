import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      isClicked: false,
      productName: "",
      brandName: "",
      productDesc: "",
      productPrice: 0,
      productQty: 0,
      productCat: "",
      selectedFile: null,
      products: [],
    }
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleProductName = this.handleProductName.bind(this);
    this.handleBrandName = this.handleBrandName.bind(this);
    this.handleProductDescription = this.handleProductDescription.bind(this);
    this.handleProductQuantity = this.handleProductQuantity.bind(this);
    this.handleProductCategory = this.handleProductCategory.bind(this);
    this.handleUploadProduct = this.handleUploadProduct.bind(this);
    this.getSellerProducts = this.getSellerProducts.bind(this);
    this.handleproductPrice = this.handleproductPrice.bind(this);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleFileSelected(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('product_img');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    
    this.setState({selectedFile: event.target.files[0]});
  }

  handleProductName(event) {
    this.setState({productName: event.target.value});
  }

  handleBrandName(event) {
    this.setState({brandName: event.target.value});
  }

  handleProductDescription(event) {
    this.setState({productDesc: event.target.value});
  }

  handleProductQuantity(event) {
    this.setState({productQty: parseInt(event.target.value)});
  }

  handleProductCategory(event) {
    this.setState({productCat: event.target.value});
  }

  handleproductPrice(event) {
    this.setState({productPrice: parseFloat(event.targer.value)})
  }

  handleUploadProduct(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('user_id', this.props.UserId);
    formData.append('product_name', this.state.productName);
    formData.append('product_price', this.state.productPrice);
    formData.append('brand_name', this.state.brandName);
    formData.append('product_desc', this.state.productDesc);
    formData.append('product_qty', this.state.productQty);
    formData.append('product_cat', this.state.productCat);
    formData.append('productImage', this.state.selectedFile);
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    }).then(x => {
      return x.text();
    }).then(res => {
      const parsed = JSON.parse(res);
      if(parsed.status) {
        console.log(parsed.msg)
      }
    });
    /*this.setState({productName: ""});
    this.setState({brandName: ""});
    this.setState({productDesc: ""});
    this.setState({productQty: 0});
    this.setState({productCat: ""});
    this.setState({selectedFile: null});
    document.getElementById('product_img').src = "";*/
    this.close();
  }

  getSellerProducts() {
    fetch('/sellerProducts', {
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
      var parsed = JSON.parse(res);
      if(parsed.status) {
        this.setState({products: parsed.result.products});
        //debugger
      } else {
        console.log('no products found...');
      }
    })
  }

  componentDidMount() {
    setInterval(this.getSellerProducts, 500);
  }

  render() {
    const { open, dimmer } = this.state;
    const my_modal = (
      <Modal dimmer={dimmer} open={open} onClose={this.close}>
        <Modal.Header>Add an item</Modal.Header>
        <Modal.Content image>
          <div id="img_upload_icon">
            <div id="product_img_border">
              <img id="product_img" alt=""/>
            </div>
            <button id="upload_icon" className="ui green icon button" 
              onClick={() => this.fileinput.click()}>
              <i aria-hidden="true" className="upload icon"></i>
            </button>
          </div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <Modal.Description>
            <div className="ui_form" className="ui padded segment">
              <div className="equal width fields">
                <div className="field" id="field">
                  <div className="ui input">
                    <input type="file" id="productImage" placeholder="Product Image" hidden 
                      onChange={this.handleFileSelected} ref={Input => this.fileinput = Input}/>
                  </div>
                </div>
                <div className="field" id="field">
                  <label htmlFor="first-name">Product name</label>
                  <div className="ui input">
                    <input type="text" id="first-name" placeholder="Product name" 
                      onChange={this.handleProductName} required/>
                  </div>
                </div>
                <div className="field" id="field">
                  <label htmlFor="brand-name">Price</label>
                  <div className="ui input">
                    <input type="text" id="product-price" placeholder="Product price" 
                      onChange={this.handleProductPrice} required/>
                  </div>
                </div>
                <div className="field" id="field">
                  <label htmlFor="brand-name">Brand</label>
                  <div className="ui input">
                    <input type="text" id="brand-name" placeholder="Brand name" 
                      onChange={this.handleBrandName} required/>
                  </div>
                </div>
              </div>
              <div className="field" id="field" className="ui form">
                <label htmlFor="control-opinion">Description</label>
                <textarea id="control-opinion" placeholder="Description" autoheight="true" rows="3" 
                  onChange={this.handleProductDescription} required/>
              </div>
              <div className="equal width fields">
                <div className="field" id="field">
                  <label htmlFor="quantity">Quantity</label>
                  <div className="ui input">
                    <input type="number" id="quantity" placeholder="Quantity" 
                      onChange={this.handleProductQuantity} required/>
                  </div>
                </div>
                <div className="field" id="field">
                  <label htmlFor="category">Category</label>
                  <div className="ui input">
                    <input type="text" id="category" placeholder="Category" 
                      onChange={this.handleProductCategory} required/>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button className='ui green button' onClick={this.handleUploadProduct}>Add</Button>
          <Button  className='ui red button' onClick={this.close}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    ); 
    //<div className="one wide column" key={'div03'+ind}></div>
    const my_products = (<div className="ui celled grid">
      {this.state.products.map((product, ind) => {
        return(<div className="row" key={'div01'+ind}>
          <div className="three wide column" key={'div02'+ind}>
            <img src={"uploads\\"+product.productimage} className="ui image" alt=""/>
          </div>
          
          <div id="thirteen_wide" className="thirteen wide column" key={'div03'+ind}>
            <p id="contents">
              <p className="ui blue label">
                <b>Product name</b>:
              </p>
              <p className="ui label">
                {product.productname}
              </p>
            </p>
            <p id="contents">
              <p className="ui blue label">
                <b>Brand</b>:
              </p>
              <p className="ui label">
                {product.brandname}
              </p>
            </p>
            <p id="contents">
              <p className="ui blue label">
                <b>Description</b>:
              </p>
              <p className="ui label">
                {product.productdesc}
              </p>
            </p>
            <p id="contents">
              <p className="ui blue label">
                <b>Quantity</b>:
              </p>
              <p className="ui label">
                {product.productqty}
              </p>
            </p>
            <p id="contents">
              <p className="ui blue label">
                <b>Category</b>:
              </p>
              <p className="ui label">
                {product.productcat}
              </p>
            </p>
            <p id="contents">
              <p className="ui blue label">
                <b>Added on</b>:
              </p>
              <p className="ui label">
                {new Date(product.posted_date).toDateString()}
              </p>
            </p>
            <div className="ui small basic buttons">
              <button className="ui icon button">
                <i aria-hidden="true" className="green edit outline icon"></i>
              </button>
              <button className="ui icon button">
                <i aria-hidden="true" className="red trash alternate outline icon"></i>
              </button>
            </div>
          </div>

        </div>);
      })}<br/>
    </div>);
    
    return(<div>
      <h3 className="ui header">My products</h3>
      <div className="ui divider" />
      <button className='ui blue inverted button' onClick={this.show(true)}>
        Add item
      </button>
      {my_modal}
      <br/><br/>
      {my_products}
      <br/><br/>
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
export default connect(mapStateToProps)(Product);
///////////////////////////////////////////////////