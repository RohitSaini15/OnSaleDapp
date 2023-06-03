import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './ProductSection.css';

class Orders extends Component {

    render() {
     
        return (
          <div>
        {this.props.orderState?(
            <div className="product-section"  style={{"marginTop": "150px", height: "auto"}}>
        
            <div className="product-cards" >
            
            {this.props.orders.map((order) => {
              
                    return (
              <div className="product-card" key={order.id.toString()}>
                <img src={/* Fleek's IPFS gateway*/`https://ipfs.fleek.co/ipfs/${order.imageHash}`} />
                <h3></h3>
                <p>{order.product}<br/>{window.web3.utils.fromWei(order.price.toString(),'ether')}ETH</p>
                <div className="product-card1">
                  <div className="red_button shop_now_button" style={{ color: "white", marginTop: "2px"}}    
                  onClick={() => {
                                this.props.approve(order.id.toString())
                              }}
                            >Approve</div>
                </div>
              </div>)})}
            </div>
            
        
        </div>
        ):(
            
        <div class="deal_ofthe_week" style={{"marginTop": "150px", height: "auto"}}>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="deal_ofthe_week_img">
                <img src="assets/images/deal_ofthe_week.png" alt="" />
              </div>
            </div>
            <div class="col-lg-6 text-right deal_ofthe_week_col">
              <div class="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
                <div class="section_title">
                  <h2>You haven't order anything yet</h2>
                </div>
                
                <div class="red_button deal_ofthe_week_button"><Link to="/shop">order now</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        )}
        
        <footer className="footer" style={{backgroundColor: "#e5e5e5"}}>
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
 
export default Orders;