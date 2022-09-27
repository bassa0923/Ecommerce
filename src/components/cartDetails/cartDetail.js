import React from 'react'
import Navigation from '../header/navigation';
import imagesLeft from '../header/images/left.png'
import imagesRight from '../header/images/right.png'
class Cart extends React.Component {
  state={
    imageIndex: 0
  }

  productsSum(amount){
    let sum = 0;
    amount.map(amount => {
      return(
      sum = amount + sum
    )
    })
    return(
      sum
    )
  }
  renderAttributes(detail, index){
    return(
      detail.attributes.map(attribute => {
        return(
          <div key={attribute.name}>
            <div className="cart--name">
              {attribute.name + ':'}
            </div>
          <div className='cart--items'>
            {this.renderItems(attribute, index)}
            </div>
          </div>
        )
      })
    )
  }

  renderItems(attribute, index){
    return(
      attribute.items.map(item => {
        return(
          <div key={item.displayValue}
                className="cart--displayValue"
                style= {this.showColor(attribute.type, 
                item.displayValue,index, attribute.name)}>
            {attribute.type !== 'swatch'? 
              <span className="cart--other">
                {this.checkType(item.displayValue)}
              </span>:
                <span className="cart--swatch">
                  {''}
                </span>}
          </div>
        )
      })
    )
  }
  showColor(type, displayValue, index, name){
    if(type === 'swatch' && this.props.selectedAttributes[index].color === displayValue)
      return(
      {border:  '3px solid #5ECE7B', backgroundColor: displayValue}
        )
    if(type === 'swatch'){
      return(
      {backgroundColor: displayValue, borderColor: 'white', borderCollapse: 'seperate'}
    )}
    if(this.props.selectedAttributes[index].size === displayValue)
      return(
          { color: 'white', backgroundColor: 'black'}
        )
        
    if(this.props.selectedAttributes[index].capacity === displayValue)
      return(
        {backgroundColor: 'black', color: 'white'}
        )
    if(this.props.selectedAttributes[index].withUSB === displayValue &&  
        name === 'With USB 3 ports')
      return(
        {backgroundColor: 'black', color: 'white'}
        )
    if(this.props.selectedAttributes[index].touchId === displayValue && 
        name === 'Touch ID in keyboard')
      return(
        {backgroundColor: 'black', color: 'white'}
        )
    }
    checkType(value) {
      if(value === 'Small'){
        return(
          value.substring(0, 1)
        )
      }
      if(value === 'Medium'){
        return(
          value.substring(0, 1)
        )
      }
      if(value === 'Large'){
        return(
          value.substring(0, 1)
        )
      }
      if(value === 'Extra Large'){
        return(
          value = 'EL'
        )
      }
      else return value;
    }
  
  
  render(){
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
      <div className='cart'>cart</div>
      <div className='cart--cart'>
        {this.props.cartDetails.map((detail, index) => {
          return(
            <div key={index} className="cart--attributes">
              <div className="cart--values">
                <div  className="cart--detailsName">
                  {detail.name}
                </div>
              <div className="cart--amount">
                {`${detail.prices[this.props.index].currency.symbol}
                  ${detail.prices[this.props.index].amount}`}
              </div>
            <div>
              {this.renderAttributes(detail, index)}
                </div>
              </div>
            <div className="cart--add">
              <button className="cart--sum" 
                      onClick={() => this.props.add(index)}>+</button>
                <div className="cart--number">
                  {this.props.productsAmount[index]}
                </div>
              <button className="cart--reduce" 
                      onClick={() => this.props.reduce(index)}>-</button>
            </div>
              <div className="cart--image">
                {console.log(this.props.imageIndex[index])}
                <img  className="cart--img"
                      src={detail.gallery[this.props.imageIndex[index]]}
                      alt={'product'}>
                </img>
              </div>
            {detail.gallery.length > 1? <div className="cart--changeImage">
              <img className="cart--left" src={imagesLeft} alt={'left arrow'}
                onClick={() => this.props.changeImg('left', detail.gallery.length, index)}>
              </img>
              <img className="cart--right" src={imagesRight} alt={'right arrow'}
                onClick={() => this.props.changeImg('right', detail.gallery.length, index)}>
                </img>
              <div>
            </div>
          </div> :''}
        </div>
              )
          })}
        <div className='cart--additional'>
        <div className='cart--tax'>
          {`Tax 21%:  ${parseFloat(this.props.total * 21 / 100).toFixed(2)}$`}
        </div>
        <div className='cart--quantity'>
          {`Quantiny: ${this.productsSum(this.props.productsAmount)}`}
        </div>
        <div className='cart--total'>
          {`Total: ${parseFloat(this.props.total).toFixed(2)}$`}
        </div>
        <button className='cart--button'>ORDER</button>
        </div>
      </div>
    </div>
  )}
}


export default Cart;

