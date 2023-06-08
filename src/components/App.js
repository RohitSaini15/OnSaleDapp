import React, { Component} from "react";
import Web3 from "web3";
import OnSale from "../abis/OnSale.json";
import Navbar from "./Navbar";
import Contacts from "./Contacts"
import Home from "./Home";
import Shop from "./Shop";
import Orders from "./Orders";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import NFT_market from "./NFT_market";
import Shop_women from "./Shop_women";
import Shop_men from "./Shop_men";
import Shop_accessories from "./Shop_accessories";
import Cart from "./Cart";
import Form from "./Form";

class App extends Component {
  async componentWillMount() {
    //await this.loadWeb3();
    if(window.ethereum){
    window.ethereum.on('accountsChanged', function () {
      window.location.reload()
    })

    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    }
    await this.loadBlockchainData();
  }
  
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      onSale: null,
      itemCount: 0,
      items_women: [],
      items_men: [],
      items_accessories: [],
      orders: [],
      orderState:false,
      loading: true,
    };

    this.buy = this.buy.bind(this);
    this.addToCart = this.addToCart.bind(this)
    this.approve = this.approve.bind(this);
    this.setAccount = this.setAccount.bind(this);
  }


  /*async loadWeb3() {
    if (window.ethereum) {
      // declared Web3 instance as a global variable
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
 
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }*/

  async getContract() {

    //assigning instance of Web3 as a global variable so that it can be used across components 
    //window.web3 = new Web3('https://goerli.infura.io/v3/05ee904673ee4d5ba2b9896819dd1f0a');
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const web3 = window.web3
    /* Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    console.log(accounts[0]);*/
    
    //const networkId = await web3.eth.net.getId();
    //const networkData = OnSale.networks[networkId];
    /*if (networkData) {
      const onSale = new web3.eth.Contract(
        OnSale.abi,
        '0x54C6c535A1908F640b73eA8689C60dAE14C35df9'
      );
      console.log(onSale);
      return onSale;
    } else {
      return false;
    }*/

    const onSale = new web3.eth.Contract(
      OnSale.abi,
      "0x65F3aA4070b22870c9D3Bf8f7AfF44c607F1901e"
    );
    console.log(onSale);
    return onSale;
  }

  async loadBlockchainData() {
    if (this.getContract() !== false) {
      const contract = await this.getContract();
      console.log(contract);
      this.setState({ onSale: contract });
      const itemCount = await contract.methods.itemCount().call();
      this.setState({ itemCount: itemCount });
      this.setState({
        items_women: [],
      });
      this.setState({
        items_men: [],
      });
      this.setState({
        items_accessories: [],
      });
      for (var i = 1; i <= itemCount; i++) {
        const item = await contract.methods.items(i).call();
        console.log(item);
        console.log(parseInt(item.quantity.toString()));
        if (parseInt(item.quantity.toString()) !== 0) {
          if(item.category.toString()=="women"){
            item.id = this.state.items_women.length
            this.setState({
              items_women: [...this.state.items_women, item],
            });
          }else if(item.category.toString()=="men"){
            item.id = this.state.items_men.length
            this.setState({
              items_men: [...this.state.items_men, item],
            });
          }else{
            item.id = this.state.items_accessories.length
            this.setState({
              items_accessories: [...this.state.items_accessories, item],
            });
          }
          
        }
      }
      console.log(this.state.items_women);

      

      const myOrders = await contract.methods
        .getOrders()
        .call({ from: this.state.account });
      console.log(myOrders);
      
      this.setState({
        orders: [],
      });

      myOrders.map((order) => {
        this.setState({orderState: true})
        this.setState({
          orders: [...this.state.orders, order],
        });
      });
      this.setState({ loading: false });
    } else {
      window.alert("SocialNetwork contract not deployed to detected network.");
    }
  }

  setAccount(accounts){
    this.setState({ account: accounts[0] });
  }

 
  async buy(id, quantity, Amount) {

    const API = "http://localhost:5000/user/checkDetails"
    const query = `user_id=${this.state.account}`

    const url = `${API}?${query}`

    const res = await fetch(url)
    const jsonData = await res.json()

    // console.log("buyid")
    // console.log(jsonData)
    
    if (jsonData.user){
      console.log("buy fn called ")
      //this.setState({ loading: true });
      console.log(id,quantity,Amount)
      console.log(this.state.onSale)
      console.log(this.state.account)
      this.state.onSale.methods
        .buy(id,quantity)
        .send({ from: this.state.account, value: Amount, gas: 300000 })
        .on("receipt", (receipt) => {
          console.log(`item bought ${receipt}`);
  
          this.loadBlockchainData();
        
        });
    } else{
      this.props.navigate("/form")
    }
  }

  async addToCart(product_id,quantity,type){
      const API = "http://localhost:5000/user/addToCart"

      const body = `user_id=${this.state.account}&product_id=${product_id}&quantity=${quantity}&type=${type}`
      const res = await fetch(API,{method:"POST",body: body,
                                  "mode": "no-cors",headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }})
      alert("items added in cart")
  }

  approve(id) {
    this.setState({ loading: true });
    this.state.onSale.methods
      .paymentApproved(id)
      .send({ from: this.state.account })
      .on("receipt", (receipt) => {
        console.log(`approved ${receipt}`);
        this.loadBlockchainData();
        
      });
  }

  render() {
    return (
      <div className="MainDiv">
        <Navbar account={this.state.account} setAccount={this.setAccount} />
        
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route
            path="/home"
            element={
              <Home />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders orders={this.state.orders} approve={this.approve} orderState={this.state.orderState}/>
            }
          />
        
          <Route
            path="/shop"
            element={
              <Shop/>
            }
          />
          <Route
            path="/shop/women"
            element={
              <Shop_women items={this.state.items_women}  buy={this.buy} addToCart={this.addToCart}/>
            }
          />
           <Route
            path="/shop/men"
            element={
              <Shop_men items={this.state.items_men}  buy={this.buy} addToCart={this.addToCart}/>
            }
          />
           <Route
            path="/shop/accessories"
            element={
              <Shop_accessories items={this.state.items_accessories}  buy={this.buy} addToCart={this.addToCart}/>
            }
          />
          <Route
            path="/contact"
            element={
              <Contacts />
            }
          />
          <Route
            path="/nftmarket"
            element={
              <NFT_market/>
            }
          />

          <Route
            path="/nftmarket"
            element={
              <NFT_market/>
            }
          />

          <Route
            path="/user/cart"
            element={
              <Cart items={this.state.items_accessories}/>
            }
          />

          <Route
            path="/form"
            element={
              <Form account = {this.state.account}></Form>
            }
          />
         
        </Routes>
        
      </div>
    );
  }
}

export function AppWithRouter(props){
  const navigate = useNavigate()
  return (<App navigate = {navigate}></App>)
}

export default App;
