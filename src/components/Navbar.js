import React, { Component } from "react";
import Identicon from "identicon.js";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props){
    super(props)
    console.log(this.props.account)
  }
  render() {
    
    return (
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">OnSale</a>

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
      </nav>
    );
  }
}

export default Navbar;
