import React, { useState, useEffect } from "react";
import "./Cart.css"
import "./ProductSection.css"

export default function Cart(props){
    const API = "http://localhost:5000/cart/items";
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        let xhrRequest = new XMLHttpRequest()
        xhrRequest.open('GET',API,true)
        xhrRequest.responseType = 'json'
        
        xhrRequest.onload = function(){
			console.log(xhrRequest.response.items)
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

			{
				data.map((item) => {
					let item_list = []
					if(item.type == "men") {item_list = props.men}
					else if(item.type == "women") {item_list = props.women}
					else {item_list = props.accessories}

					let prod_item = {}

					for(let record in item_list){
						if(parseInt(item_list[record].id) == parseInt(item.product_id)){
							prod_item = item_list[record]
							break
						}
					}

					return (
						<tr>
						<td>
							<div class="cart-info">
								<img src="images/buy-1.jpg" alt=""/>
								<div>
									<p>{prod_item.product}</p>
									<small>Price: {prod_item.price}</small>
									<a href="" onClick = {async () => {
										const API = "http://localhost:5000/user/deleteFromCart"

										const body = `user_id=${props.account}&product_id=${item.product_id}&type=${item.type}`
										const res = await fetch(API,{method:"POST",body: body,
																	"mode": "no-cors",headers: {
																	  'Content-Type': 'application/x-www-form-urlencoded'
																  }})
										alert("items remove from cart")
									}}>Remove</a>
								</div>
							</div>
						</td>
						<td><p>{item.quantity}</p></td>
						<td>{item.quantity*parseInt(prod_item.price)}</td>
					</tr>
					)
				})
			}
		</tbody></table>
	</div>
    )
}