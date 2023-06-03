import React, { Component } from "react";
import './ProductSection.css';



class Shop_women extends Component {
    constructor(props){
      super(props);
      this.state={
        text: [],
      }
      this.update()
    }
    //note: while using arrow functions we dont have to bind the function in constructor to use it in
    //any other function within the className component
    
    update = () => {
      console.log(this.props.items)
   
      this.props.items.map((item)=>{
        this.setState({
          text: this.state.text.push(item.quantity)
        })
      })
    }

    increment = (quantity,id) => {
      if(this.state.text[id] < quantity){
        const newText = [...this.state.text]

        newText[id]+=1

        this.setState({text: newText})
      }
      
      return null;
    }

    decrement = (id) => {
      if(this.state.text[id] > 1){
        const newText = [...this.state.text]

        newText[id]-=1

        this.setState({text: newText})
      }
      
      return null;
    }
  
    render() {
     
      return (
        <div style={{backgroundColor: "#f5f5f5"}}>
      <div className="product-section"  style={{"marginTop": "150px", height: "auto"}}>
      <h2 style={{marginBottom: "30px"}}>WOMEN'S</h2>

    
        <div className="product-cards" >
        {this.props.items.map((item) => {
                console.log(item.imageHash)
                console.log(this.state.text)
                return (
          <div className="product-card" key={item.id.toString()}>
            <img src={/* Fleek's IPFS gateway*/`https://ipfs.fleek.co/ipfs/${item.imageHash}`} />
            <h3></h3>
            <p>{item.product}<br/>{window.web3.utils.fromWei(item.price.toString(),'ether')}ETH</p>
            <div className="product-card1">
              <div className="red_button shop_now_button" style={{ color: "white", marginTop: "2px"}}    
              onClick={() => {
                            let Amount = item.price.toString()//amount already in Wei
                            
                            console.log(Amount);
                            this.props.buy(item.id.toString(),this.state.text[item.id], Amount);
                          }}
                        >Buy</div>
              <div className="quantity">
              <button  className="decrement-btn" onClick={() => this.decrement(item.id)}>-</button>
              <span type="number"   className="quantity-input">{this.state.text[item.id]}</span>
              <button className="increment-btn" onClick={() => this.increment(item.quantity,item.id)}>+</button>
              </div>
            </div>
          </div>)})}
        </div>
        
    
    </div>
      <footer className="footer" style={{backgroundColor: "#e5e5e5", marginTop: "200px"}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
              <ul className="footer_nav">
                <li><a href="#">Blog</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
              <ul>
                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-lg-12">
            <div className="footer_nav_container">
              <div className="cr" style={{paddingLeft: '300px'}}><span style={{paddingLeft: '200px'}}>Customer Service</span><br/>
              <span style={{paddingLeft: '175px'}}>For India +91 9660741407</span><br/>
              <span>We are open 7 days a week from 11:00 AM to 5:00 PM and from 9:00 PM to 1 AM</span> </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
    
      ) 
    }
  }
  
  export default Shop_women;