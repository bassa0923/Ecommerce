import { Interweave } from "interweave";
import React from "react";
import Navigation from "../header/navigation";

class Pdp extends React.Component {
  state = {
    attributes: {
      size: '',
      color: '',
      capacity: '',
      withUSB: '',
      touchId: ''
    },
    imgIndex: 0
  }

  miniImage(){
    return(
      this.props.details.gallery.map((gallery, index) => {
        return(
          <img key={index} className="mini--mini--image" 
          src={gallery} 
          alt={this.props.details.id}
          onClick={() => this.imageIndex(index)}></img>
        )
      })
    )
  }

  showAttributes(){
    return(
      this.props.details.attributes.map(attributes => {
        return(
          <div key={attributes.name}>
            <div className="attributes--name">
              {attributes.name + ':'}
            </div>
            <div className="attributes--button">
              {this.showItems(attributes)}
            </div>
          </div>
        )
      })
    )
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

  showItems(attributes){
    return(
    attributes.items.map(items => {
      return(
        <button  
          key={items.displayValue}     
          className="attributes--button--button"
          style= {this.showColor(attributes.type, items.displayValue, attributes.name)}
          onClick={() => this.selectedAttributes(attributes.name, 
          items.displayValue)}>
          {attributes.type !== 'swatch'? items.displayValue : ''}
        </button>
      )
    })
    )
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

  imageIndex(index){
    this.setState({
      imgIndex: index
    })
  }
  
  updateCart(attributes, details){
    let attribute = [{...this.state.attributes}];
    let sum = 0;
    if( attribute[0].size !== ""){
      sum = sum + 1
    }
    if(attribute[0].color !== ""){
      sum = sum + 1
    }
    if(attribute[0].capacity !== ""){
      sum = sum + 1
    }
    if(attribute[0].withUSB !== ""){
      sum = sum + 1
    }
    if(attribute[0].touchId !== ""){
      sum = sum + 1
    }
    if(this.props.details.attributes.length === sum){
    this.props.addToCart(attributes)
    this.props.addToCartInfo(details)
    }
  }
  
  addToCart(){
    return(
    this.props.details.inStock?
      <button className="details--cart" 
        onClick={() => this.updateCart(this.state.attributes, this.props.details)}>
        ADD TO CART
      </button>:
      'This item is out of stock'
    )
  }

  render(){
    if(this.props.details.id)
    return(
      <div>
        <Navigation 
          currency={this.props.categoryAll.products[0].prices}
          onhandleChange={this.props.onhandleChange}
          onvalueChange={this.props.onvalueChange}
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
      <div className="mini--image">
        {this.miniImage()}
      </div>
      <div className="details">
        <img className="details--image" 
        src={this.props.details.gallery[this.state.imgIndex]}
        alt={this.props.details.id}>
        </img>
      <div className="details--info">
        <div className="details--brand">
          {this.props.details.brand}
        </div>
        <div className="details--name">
          {this.props.details.name}
        </div>
        {this.showAttributes()}
      <div className="details--price">
        <div className="details--price--price">
          PRICE: 
        </div>
        <div className="details--price--amount">
          {this.props.details.prices[this.props.index].currency.symbol}
          {this.props.details.prices[this.props.index].amount} 
        </div>                           
      </div>
        {this.addToCart()}
        <div className="details--description">
          <Interweave content={this.props.details.description}></Interweave>
        </div>
      </div>
    </div>
  </div>
    )
    return null;
  }
}

export default Pdp;