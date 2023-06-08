import React, { useState, useEffect } from "react";
import "./Cart.css"

export default function Cart(){
    const API = "http://localhost:5000/cart/items";
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        let xhrRequest = new XMLHttpRequest()
        xhrRequest.open('GET',API,true)
        xhrRequest.responseType = 'json'
        
        xhrRequest.onload = function(){
            setData(xhrRequest.response.items)
        }

        xhrRequest.send()
    }


    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div class="small-container cart-page">
		<table>
			<tbody><tr>
				<th>Product</th>
				<th>Quantity</th>
				<th>Subtotal</th>
			</tr>
			<tr>
				<td>
					<div class="cart-info">
						<img src="images/buy-1.jpg" alt=""/>
						<div>
							<p>Red Printed T-shirt</p>
							<small>Price: 0.002ETH</small>
							<a href="">Remove</a>
						</div>
					</div>
				</td>
				<td><input type="number" value="1"/></td>
				<td>$50.00</td>
			</tr>
			<tr>
				<td>
					<div class="cart-info">
						<img src="images/buy-2.jpg" alt=""/>
						<div>
							<p>Red Printed T-shirt</p>
							<small>Price: 0.0001ETH</small>
							<a href="">Remove</a>
						</div>
					</div>
				</td>
				<td><input type="number" value="1"/></td>
				<td>$50.00</td>
			</tr>
			<tr>
				<td>
					<div class="cart-info">
						<img src="images/buy-3.jpg" alt=""/>
						<div>
							<p>Red Printed T-shirt</p>
							<small>Price: 0.001ETH</small>
							<a href="">Remove</a>
						</div>
					</div>
				</td>
				<td><input type="number" value="1"/></td>
				<td>$50.00</td>
			</tr>
		</tbody></table>
	</div>
    )
}