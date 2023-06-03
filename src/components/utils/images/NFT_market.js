import React, { Component } from 'react';
import './NFTMarket.css';

class NFT_Market extends Component {
  render() {
    return (
      <div className="nft-market">
        <h1 className="nft-market-title">NFT Market</h1>
        <div className="nft-market-grid">
          {/* Render NFT items */}
          <div className="nft-item">
            <img src="C:/Users/adity/trfl/public/assets/nft market images/auras.avif" alt="NFT" className="nft-item-image" />
            <h3 className="nft-item-name">NFT Name</h3>
            <p className="nft-item-description">NFT Description</p>
            <p className="nft-item-price">Price: 0.5 ETH</p>
            <button className="nft-item-button">Buy Now</button>
          </div>
          {/* Repeat NFT items for the grid */}
          {/* Example:
          <div className="nft-item">
            ...
          </div>
          */}
        </div>
      </div>
    );
  }
}

export default NFT_Market;