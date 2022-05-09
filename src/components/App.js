import React, { Component } from "react";
import Web3 from "web3";
import OnSale from "../abis/OnSale.json";
import Navbar from "./Navbar";
import Main from "./Main";
import MyProducts from "./MyProducts";
import MyOrders from "./MyOrders";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    window.ethereum.on('accountsChanged', function () {
      window.location.reload()
    })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
 
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async getContract() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    console.log(accounts[0]);
    // Network ID

    const networkId = await web3.eth.net.getId();
    const networkData = OnSale.networks[networkId];
    if (networkData) {
      const onSale = await new web3.eth.Contract(
        OnSale.abi,
        networkData.address
      );
      console.log(onSale);
      return onSale;
    } else {
      return false;
    }
  }

  async loadBlockchainData() {
    if (this.getContract() !== false) {
      const contract = await this.getContract();
      console.log(contract);
      this.setState({ onSale: contract });
      const itemCount = await contract.methods.itemCount().call();
      this.setState({ itemCount: itemCount });
      this.setState({
        items: [],
      });
      for (var i = 1; i <= itemCount; i++) {
        const item = await contract.methods.items(i).call();
        console.log(item);
        console.log(parseInt(item.quantity.toString()));
        if (parseInt(item.quantity.toString()) !== 0) {
          this.setState({
            items: [...this.state.items, item],
          });
        }
      }
      console.log(this.state.items[0]);

      const myProducts = await contract.methods
        .getProducts()
        .call({ from: this.state.account });
      console.log(myProducts);

      this.setState({
        products: [],
      });

      myProducts.map((product) => {
        this.setState({
          products: [...this.state.products, product],
        });
      });

      const myOrders = await contract.methods
        .getOrders()
        .call({ from: this.state.account });
      console.log(myOrders);
      
      this.setState({
        orders: [],
      });

      myOrders.map((order) => {
        this.setState({
          orders: [...this.state.orders, order],
        });
      });
      this.setState({ loading: false });
    } else {
      window.alert("SocialNetwork contract not deployed to detected network.");
    }
  }

  addItem(product, price, quantity,imageHash) {
    this.setState({ loading: true });
    console.log("happened 1");
    this.state.onSale.methods
      .addItem(product, price, quantity,imageHash)
      .send({ from: this.state.account })
      .on("receipt", (receipt) => {
        console.log("happened 2");
        this.loadBlockchainData();
        
      });
  }

  buy(id, Amount) {
    this.setState({ loading: true });
    this.state.onSale.methods
      .buy(id)
      .send({ from: this.state.account, value: Amount })
      .on("receipt", (receipt) => {
        console.log("happened 2");

        this.loadBlockchainData();
      
      });
  }

  approve(id) {
    this.setState({ loading: true });
    this.state.onSale.methods
      .paymentApproved(id)
      .send({ from: this.state.account })
      .on("receipt", (receipt) => {
        console.log("happened 2");
        this.loadBlockchainData();
        
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      onSale: null,
      itemCount: 0,
      items: [],
      products: [],
      orders: [],
      loading: true,
    };

    this.addItem = this.addItem.bind(this);
    this.buy = this.buy.bind(this);
    this.approve = this.approve.bind(this);
  }

  render() {
    return (
      <div >
        <Navbar account={this.state.account} />
        <div>
        &emsp;
        <Routes>
          <Route
            path="/myproducts"
            element={<MyProducts products={this.state.products} />}
          />
          <Route
            path="/myorders"
            element={
              <MyOrders orders={this.state.orders} approve={this.approve} />
            }
          />
          <Route
            path="/"
            element={
              this.state.loading ? (
                <div id="loader" className="text-center mt-5">
                  <p>Loading...</p>
                </div>
              ) : (
                <div id="loader" className="text-center mt-5">
                <Main
                  items={this.state.items}
                  addItem={this.addItem}
                  buy={this.buy}
                />
                </div>
              )
            }
          />
        </Routes>
        </div>
      </div>
    );
  }
}

export default App;
