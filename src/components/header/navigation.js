import React from "react";
import { Link } from "react-router-dom";
import logo from "../header/images/a-logo.png"
import card from "../header/images/card.png"
class Navigation extends React.Component{


    state={
      cliked: false,
    }

    checkSide(){
      if(this.state.cliked === true){
      document.body.addEventListener('click', (e) => {
          const clickTargetWidth = e.target.offsetWidth;
          const xCoordInClickTarget = e.clientX - e.target.getBoundingClientRect().left;
          if (clickTargetWidth / 2 > xCoordInClickTarget) {
            this.setState({ cliked: false })
        }
      }
    )}
    }
    navigate = (value) => {
      this.props.onhandleChange(value)
    }

    valueChange = (index) => {
      this.props.onvalueChange(index)
    }

    displayBlock() {
      this.setState({
        cliked: !this.state.cliked
      })
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

    renderAttributes(details, index){
      return(
      details.attributes.map(attribute => {
        return(
          <div key={attribute.name}>
            <div className="mini--cart--name">
              {attribute.name + ':'}
            </div>
            {this.renderItems(attribute, index)}
        </div>
        )
    }))
    }

    renderItems(attribute, index){
      return(
      <div className="mini--cart--items">
        {attribute.items.map(item => {
          return(
            <div className="mini--cart--displayValue"
                  key={item.displayValue}
                  style= {this.showColor(attribute.type, 
                  item.displayValue, index, attribute.name)}>
              {attribute.type !== 'swatch'? 
                <div className="cart--other">
                  {this.checkType(item.displayValue)}
                </div>:
                <span className="cart--swatch">
                  {''}
                </span>
              }
            </div>
          )
        })}
      </div>
      )
    }

    showColor(type, displayValue, index, name){
        if(type === 'swatch' && this.props.selectedAttributes[index].color === displayValue)
            return(
          {border: '3px solid #5ECE7B', backgroundColor: displayValue}
            )
      if(type === 'swatch'){
        return(
          {backgroundColor: displayValue, borderColor: 'white', }
        )}
            if(this.props.selectedAttributes[index].size === displayValue)
            return(
              {color: 'white', backgroundColor: 'black'}
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

      showButtonColor(category){
        if(category === this.props.value)
        return(
        {color: '#5ECE7B', borderBottom:  '3px solid #5ECE7B'}
        )
      }
      
  render(){
    return(
    <div className="header">
      {this.checkSide()}
        <div className="header--navigation">
        <Link to='/' style={{textDecoration: 'none'}}>
          <button className="header--all" 
          value="all"   
          style={this.showButtonColor('all')}
          onClick={e => this.navigate(e.target.value)}>
          ALL
          </button>
        </Link>
        <Link to='/clothes' style={{textDecoration: 'none'}}>
          <button className="header--clothes" 
            value="clothes"  
            style={this.showButtonColor('clothes')} 
            onClick={e => this.navigate(e.target.value)}>
            CLOTHES
          </button>
        </Link>
        <Link to='/tech' style={{textDecoration: 'none'}}>
          <button className="header--tech" 
            value="tech"  
            style={this.showButtonColor('tech')} 
            onClick={e => this.navigate(e.target.value)}>
            TECH
          </button>
        </Link>
        </div>
        <div className="header--actions">
          <select className="header--dropdown"
            onClick={e => this.valueChange(e.target.value)}>
            {this.props.currency.map((price, index) => {
            return(
              <option value={index} key={index}>
                {`${price.currency.symbol} ${price.currency.label}`}
              </option>
              )
            })
          }
          </select>
        <img className="header--cart" 
          src={card} 
          alt={'cart'}
          onClick={() => {this.displayBlock()}
        }/>
        {this.props.cartDetails.length > 0? <div  className="header--cart--amount">
          <span className="header--cart--total">
            {this.productsSum(this.props.productsAmount)}
          </span>
        </div>: ''}
        </div>
        {this.state.cliked? 
            <div className="mini--cart">
              <div className="mini--mini--cart">
                <div className="mini--cart--bag">
                  {`My Bag, `}
                <span className="bag--items">
                  {`${this.productsSum(this.props.productsAmount)} items `}
                </span>
                </div>
        {this.props.cartDetails.map((details, index) => {
          return(
            <div className="mini--cart--attributes" key={index}> 
              <div className="mini--cart--values">
                <div  className="mini--cart--detailsName">
                  {details.name}
                </div>
              <div className="mini--cart--amount">
                {`${details.prices[this.props.amountIndex].currency.symbol}${details.prices[this.props.amountIndex].amount}`
                }
              </div>
                <div>
                  {this.renderAttributes(details, index)}
                </div>
              </div>
      <div className="mini--cart--add">
          <button className="mini--cart--sum" 
            onClick={() => this.props.add(index)}>
            +
          </button>
      <div className="mini--cart--number">
          {this.props.productsAmount[index]}
      </div>
          <button className="mini--cart--reduce" 
            onClick={() => this.props.reduce(index)}>
            -
          </button>
      </div>
      <div className="mini--cart--image">
        <img className="mini--cart--img"
          src={details.gallery[0]}
          alt={details.name}>
        </img>
      </div>
      </div>
            )
              })}
              <div className="mini--cart--totals">
                <div className="mini--cart--total">Total</div>
                  <div className="mini--cart--totalAmount">
                    {`${parseFloat(this.props.total).toFixed(2)}$`}
                  </div>
              </div>
              <div className="mini--cart--button">
                <Link to='/cart'>
                  <button className="mini--cart--viewBag">VIEW BAG</button>
                </Link>
                  <button className="mini--cart--checkOut">CHECK OUT</button>
              </div>
            </div>
          </div>: null}
      <img className="header--logo" 
          src={logo}
          alt={'header-logo'}/>
      </div>
  )}
}


export default Navigation