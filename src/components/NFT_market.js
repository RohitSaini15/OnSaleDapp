import React, { Component } from 'react';
import './NFTMarket.css';

class NFT_Market extends Component {
  render() {
    return (
      <div className="nft-market">
        <h1 className="nft-market-title">NFT Market</h1>
        <div className="nft-market-grid">
      
          <div className="nft-item">
            <img src="assets/nft market images/auras.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Aura</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>
      
          <div className="nft-item">
            <img src="assets/nft market images/behind the veil.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Behind the veil</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/Born 2 Die.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Born 2 Die</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/chimera.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Chimera</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/Dori.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Dori</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/easy demon club.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Easy Demon Club</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/Girl with Dragon.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Girl with Dragon</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/Graceful Princess.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Graceful Princess</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>
          <div className="nft-item">
            <img src="assets/nft market images/Lord Shiva.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">Lord Shiva</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

          <div className="nft-item">
            <img src="assets/nft market images/VIP Monkey.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">VIP Monkey</h3>
            <p className="nft-item-price">Price: 0.00001 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>

        </div>
      </div>
    );
  }
}

export default NFT_Market;