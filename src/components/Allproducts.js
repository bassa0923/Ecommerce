import React from "react";
import Navigation from "./header/navigation";
import { Link } from "react-router-dom";
import icon from "./header/images/Common.png"
class All extends React.Component {

  state={
    attributes: {
      size: '',
      color: '',
      capacity: '',
      withUSB: '',
      touchId: ''
    },
    attributesIndex: 0
  }

  componentDidUpdate(_prevProps, prevState){
    if(this.state.attributes !== prevState.attributes){
      this.props.addToCart(this.state.attributes)
  }
}


  imgColor(inStock){
    if(inStock === false){
      return(
        {background: '#FFFFFF',
        opacity: '0.5'}
      )
    }
  }

  addtoCart(product){
    if(product.attributes.length === 0){
      this.props.addToCartInfo(product);
      this.props.addToCart(this.state.attributes);
    }
    else{
      this.props.addToCartInfo(product)
      this.defaultAttributes(product)
  }
}

  defaultAttributes(product){
    product.attributes.map(attribute => {
      return(
        this.selectedAttributes(attribute.name, attribute.items[0].displayValue)
      )
    })
}

selectedAttributes(property, attribute){
  this.setState(prevState => {
    let attributes = Object.assign({}, prevState.attributes)
    if(property === 'Size')
      attributes.size = attribute
    if(property === 'Color')
      attributes.color = attribute
    if(property === 'Capacity')
      attributes.capacity = attribute
    if(property === 'With USB 3 ports')
      attributes.withUSB = attribute
    if(property === 'Touch ID in keyboard')
      attributes.touchId = attribute
    return {attributes}
  })
  
}
showColor(type, displayValue, name){
  if(type === 'swatch' && displayValue === this.state.attributes.color)
  return(
    {border:  '3px solid #5ECE7B', backgroundColor: displayValue, 
    width: '36px', height: '36px', padding: '4px'} 
  )
  if(type === 'swatch'){
  return(
    {backgroundColor: displayValue, width: '34px', height: '34px', marginRight: '8px', padding: '4px'}
  )}
  if(displayValue === this.state.attributes.size)
  return(
    {backgroundColor: 'black', color: 'white'}
  )
  if(displayValue === this.state.attributes.capacity)
  return(
    {backgroundColor: 'black', color: 'white'}
  )
  if(displayValue === this.state.attributes.withUSB && name === 'With USB 3 ports')
  return(
    {backgroundColor: 'black', color: 'white'}
  )
  if(displayValue === this.state.attributes.touchId && name === 'Touch ID in keyboard')
  return(
    {backgroundColor: 'black', color: 'white'}
  )
}

  productsRender(products){
    return(
      products.map((products) => {
      return(
        <div className="products" 
          key={products.id}>
          <div>
          <Link to="/details">
          <img  className="product--image"
            src={products.gallery[0]} 
            onClick={() => this.props.addDetails(products)}
            style= {this.imgColor(products.inStock)}
            alt={products.brand}
          />
          </Link>
          {products.inStock === true &&
          <div className="product--cart">
            <img  src={icon} 
                  onClick={() => this.addtoCart(products)}
                  alt={'add to cart'}>
            </img>
          </div>
          }
          </div>
          <div>
            {products.inStock === false && 
              <div className="outOfStock">
                OUT OF STOCK
              </div>
            }
          </div> 
          <div className="products--content">
            <div className="products--brand">
              {`${products.brand} ${products.name}`}
            </div> 
              {products.prices[this.props.index].currency.symbol}
              {products.prices[this.props.index].amount}
          </div>
        </div>
      )
    })
    )
  }

  render() {
      if(this.props.categoryAll.name === this.props.value) {
    return(
    <div>
    <Navigation 
        currency={this.props.categoryAll.products[0].prices}
        onhandleChange={this.props.onhandleChange}
        onvalueChange={this.props.onvalueChange}
        value={this.props.value}
        selectedAttributes={this.props.selectedAttributes}
        cartDetails={this.props.cartDetails}
        amountIndex={this.props.index}
        productsAmount={this.props.productsAmount}
        add={this.props.add}
        reduce={this.props.reduce}
        itemsPrices={this.props.itemsPrices}
        productsPrices={this.props.productsPrices}
        total={this.props.total}
    /> 
      <div className="category--name">
        {this.props.categoryAll.name}
      </div>
      <div className="products--render">
        {this.productsRender(this.props.categoryAll.products)}
      </div>
      </div>   
    )
  }
  return null;
  }
}


export default All;