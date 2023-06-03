import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component {
  
  render() {
   
    return (
        <div>
        <div className="main_slider" style={{backgroundImage:"url(assets/images/slider_1.jpg)"}}>
        <div className="container fill_height">
          <div className="row align-items-center fill_height">
            <div className="col">
              <div className="main_slider_content">
                <h6>Spring / Summer Collection 2023</h6>
                <h1>Experience the Decentralised Fashion</h1>
                <div className="red_button shop_now_button"><Link to="/shop">shop now</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <footer class="footer">
       <div class="container">
         <div class="row">
           <div class="col-lg-6">
             <div class="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
               <ul class="footer_nav">
                 <li><a href="https://www.vogue.com/fashion/trends">Blog</a></li>
                 <li><Link to="/contact">Contact us</Link></li>
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

export default Home;