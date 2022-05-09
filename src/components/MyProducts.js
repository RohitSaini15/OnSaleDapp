import React, { Component } from "react";

class MyProducts extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              {this.props.products.map((product, key) => {
                return (
                  <div className="card mb-4" key={key}>
                    <ul id="postList" className="list-group list-group-flush">
                
                        
                        <img src={`https://ipfs.infura.io/ipfs/${product.imageHash}`} width="475px" height="300px" style={{objectFit: "cover"}} />
                    
                      <li className="list-group-item py-2">
                      <p>{product.product}</p>
                        <small className="float-left mt-1 text-muted">
                          Price: {product.price.toString()} ETH &nbsp;
                        </small>
                        &emsp;&emsp;
                        <small className="float-left mt-1 text-muted">
                          Quantity: {product.quantity.toString()}
                        </small>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default MyProducts;
