import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Shop extends Component {
 
  render() {
    return (
      <div>
         <div  style={{"marginTop": "150px", height: "500px"}}>
        <div className="banner">
        <div className="container" style={{padding: "80px"}}>
          <div className="row">
            <div className="col-md-4">
              <div className="banner_item align-items-center" style={{backgroundImage:"url(assets/images/banner_1.jpg)"}}>
                <div className="banner_category">
                  <Link to="/shop/women">women's</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="banner_item align-items-center" style={{backgroundImage:"url(assets/images/banner_2.jpg)"}}>
                <div className="banner_category">
                <Link to="/shop/accessories">accessories's</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="banner_item align-items-center" style={{backgroundImage:"url(assets/images/banner_3.jpg)"}}>
                <div className="banner_category">
                <Link to="/shop/men">men's</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
        
     
    <footer class="footer" style={{backgroundColor: "#e5e5e5"}}>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
            <ul class="footer_nav">
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
            <ul>
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-skype" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row" >
        <div class="col-lg-12">
          <div class="footer_nav_container">
            <div class="cr" style={{paddingLeft: '300px'}}><span style={{paddingLeft: '200px'}}>Customer Service</span><br/>
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

export default Shop;