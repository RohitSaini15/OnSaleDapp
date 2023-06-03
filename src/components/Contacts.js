import React, { Component } from "react";
import backgroundImage from './utils/images/Contact_men.jpg';

class Contacts extends Component {

    render(){
        return(
            <div style={{ backgroundImage: `url(${backgroundImage})`,height: "800px", backgroundSize: 'cover',
            backgroundPosition: 'center',"marginTop": "150px", }}>
                <div className="about-us" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", height: "400px" }}>
                    <div style={{ marginLeft: "10%" }}>
                        <h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "32px", fontWeight: "bold", color: "#000" }}>About Us</h2>
                        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", lineHeight: "1.5", color: "#000", maxWidth: "600px" }}>Welcome to OnSale, a decentralized clothing brand built on blockchain technology. Our platform empowers creators and provides fair compensation, while our commitment to transparency and sustainability ensures high-quality, eco-friendly products. Join us in revolutionizing the fashion industry and creating a more equitable world.</p>
                    </div>
                </div>
                <div style={{marginLeft: "150px"}}>
                <p style={{ color: 'black', marginTop: '1rem' }}>123 Main Street, Anytown, USA 12345</p>
                <p style={{ color: 'black' }}>Phone: (123) 456-7890</p>
                <p style={{ color: 'black' }}>Email: info@onsale.com</p>
                </div>
            </div>
        )
        
    }
}

export default Contacts;