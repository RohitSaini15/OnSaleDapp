import React, { Component } from "react";
import Identicon from "identicon.js";
import Web3 from "web3";
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props){
    super(props)
    console.log(this.props.account)
    this.loadWeb3 = this.loadWeb3.bind(this)
  }

  async loadWeb3() {
    if (window.ethereum) {
    
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      return accounts;
      
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
   
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  render() {
    
    return (
      
      /*<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand">OnSale</Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/myproducts">
                My Products
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/myorders">
                My Orders
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/nftmarket">
                NFT Market
              </Link>
            </li>
          </ul>
        
        <ul className="navbar-nav px-3">
          <li className="nav-item active">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            &emsp;
            {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
        </div>
      </nav>*/

<header className="header trans_300">

<div className="top_nav">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="top_nav_left">please connect your wallet </div>
                </div>
                <div className="col-md-6 text-right">
                  <div className="top_nav_right">
                  <button
                          className="btn btn-dark btn-sm float-right pt-0"
                          style={{marginTop:"10px"}}
                          onClick={async(event) => {
                            const accounts = await this.loadWeb3()
                            this.props.setAccount(accounts)
                          }}
                        >
                        CONNECT
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
<div className="main_nav_container">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-right">
        <div className="logo_container">
          <Link to="/">On<span>Sale</span></Link>
        </div>
        <nav className="navbar">
          <ul className="navbar_menu">
            <li><Link to="/home">home</Link></li>
            <li><Link to="/shop">shop</Link></li>
            <li><Link to="/orders">orders</Link></li>
            <li><Link to="/contact">contact</Link></li>
            <li><Link to="/nftmarket">NFT Market</Link></li>
          </ul>
          <ul className="navbar_user">
            <li><Link to="#"><i className="fa fa-search" aria-hidden="true"></i></Link></li>
            <li>   {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}</li>
            <li  style={{"margin": "10px"}}> <small aria-hidden="true" id="account">{this.props.account}</small></li>
            <li className="checkout">
              <Link to="#">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span id="checkout_items" className="checkout_items">2</span>
              </Link>
            </li>
          </ul>
          <div className="hamburger_container">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </nav>
      </div>
    </div>
  </div>
</div>
</header>
    );
  }
}

export default Navbar;



