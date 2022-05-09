import React, { Component } from "react";
import Identicon from "identicon.js";

class MyOrders extends Component {
    render(){
        return (
            <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                  <div className="content mr-auto ml-auto">
                    <p>&nbsp;</p>
              { this.props.orders.map((order) => {
       
                return(
                  
                  <div className="card mb-4" key={order.id.toString()} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(order.seller, 30).toString()}`}
                      />
                      <small className="text-muted">{order.seller}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                        
                        <img src = {`https://ipfs.infura.io/ipfs/${order.imageHash}`} width="475px" height="300px" style={{objectFit: "cover"}}  />
                      

                      <li key={order.id.toString()} className="list-group-item py-2">
                      <p>{order.product}</p>
                        <small className="float-left mt-1 text-muted">
                          Price: {order.price.toString()} ETH &nbsp;
                        </small>
                        <small className="float-left mt-1 text-muted">
                          Quantity: {order.quantity.toString()}
                        </small>
                        &emsp;&emsp;
                        <button
                          className="btn btn-dark btn-sm float-right pt-0"
                          name={order.id.toString()}
                          onClick={(event) => {
                              this.props.approve(event.target.name)
                          }}
                        >
                          Approve Payment
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}

                    </div>
          </main>
        </div>
      </div>);
    }
}

export default MyOrders;