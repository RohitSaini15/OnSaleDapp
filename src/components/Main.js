import React, { Component } from "react";
import Identicon from "identicon.js";
import { create } from 'ipfs-http-client'

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.items);
  
    this.uploadToIpfs = this.uploadToIpfs.bind(this);

    this.state = {
      buffer: null
    }
  }

  captureFile = (event) => {
    console.log("called 1")
    event.preventDefault()
    //process file for IPFS...
    const file = event.target.files[0]
    console.log(file)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      console.log("called 2")
      this.setState({buffer: Buffer(reader.result)})
    }
 
  }

 async uploadToIpfs() {
    const client = create('https://ipfs.infura.io:5001/api/v0')
    try {
      console.log("called 3")
      console.log(this.state.buffer)
      const added = await client.add(this.state.buffer)
      console.log(added.path)
      return added.path
      
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row justify-content-md-center">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const product = this.product_name.value;
                  const price = this.price.value;
                  const quantity = this.quantity.value;
                  const imageHash = await this.uploadToIpfs()
                  console.log(imageHash)
                  this.props.addItem(product, price, quantity,imageHash);
                }}
              >
                <div className="form-group mr-sm-2">
                &emsp;
                  <label>
                    Product Name
                    <input
                      id="product_name"
                      type="text"
                      ref={(input) => {
                        this.product_name = input;
                      }}
                      className="form-control"
                      required
                    />
                  </label>
                  &emsp;&emsp;
                  <label>
                    Product Image
                    <input
                      type="file"
                      onChange={this.captureFile}
                      className="form-control"
                      required
                    />
                  </label>
                  
                  <label>
                    Price
                    <input
                      id="price"
                      type="text"
                      ref={(input) => {
                        this.price = input;
                      }}
                      className="form-control"
                      required
                    />
                  </label>&emsp;
                  <label>
                    Quantity
                    <input
                      id="quantity"
                      type="text"
                      ref={(input) => {
                        this.quantity = input;
                      }}
                      className="form-control"
                      required
                    />
                  </label>
                </div>
                <br/>
                <button
                  type="submit"
                  className="btn btn-outline-dark btn-block"
                >
                  Add Item
                </button>
              </form>
              &nbsp;
              {this.props.items.map((item) => {
                console.log(item.imageHash)
                console.log(`https://ipfs.infura.io/ipfs/${item.imageHash}`)
                return (
                  <div className="card mb-4" key={item.id.toString()}>
                    <div className="card-header">
                      <img
                        className="mr-2"
                        width="30"
                        height="30"
                        src={`data:image/png;base64,${new Identicon(
                          item.seller,
                          30
                        ).toString()}`}
                      />
                      &emsp;
                      <small className="text-muted">{item.seller}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                    
                       
                        <img src = {`https://ipfs.infura.io/ipfs/${item.imageHash}`} width="475px" height="300px" style={{objectFit: "cover"}}  />
                      
                      <li
                        key={item.id.toString()}
                        className="list-group-item py-2"
                      >
                          <p>{item.product}</p>
                        <small className="float-left mt-1 text-muted">
                       
                          Price: {item.price.toString()} ETH &nbsp;
                        </small>
                        <small className="float-left mt-1 text-muted">
                          Quantity: {item.quantity.toString()}
                        </small>&emsp;
                        <button
                          className="btn btn-dark btn-sm float-right pt-0"
                          name={item.id.toString()}
                          onClick={(event) => {
                            let Amount = window.web3.utils.toWei(
                              item.price.toString(),
                              "Ether"
                            );
                            console.log(event.target.name, Amount);
                            this.props.buy(event.target.name, Amount);
                          }}
                        >
                          Buy
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
