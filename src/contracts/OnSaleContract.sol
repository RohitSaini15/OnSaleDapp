// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

contract OnSale {

    uint public itemCount = 0;
    uint public oredrCount;
    address payable owner;

    mapping(uint => userItem) public items;
    mapping(address => mapping(uint => uint) ) public pendingAmount;
    mapping(address => orderInfo[])  orders;

    struct userItem {
        uint id;
        string category;
        string product;
        uint price;
        uint quantity;
        string imageHash;
    }

    struct orderInfo{
        uint id;
        string product;
        uint price;
        uint quantity;
        string imageHash;
    }

    event itemAdded (
        uint id,
        string product,
        uint price,
        uint quantity,
        address owner
    );

    event productBought (
        uint id,
        address buyer,
        uint amount
    );

    constructor(){
        owner = payable(msg.sender);
    }

    function addItem(string memory _category, string memory _product, uint _price, uint _quantity,string memory _imageHash) public {
        itemCount++;
        items[itemCount] = userItem(itemCount,_category,_product,_price,_quantity,_imageHash);
        emit itemAdded(itemCount, _product, _price, _quantity, msg.sender);
    }

    function buy(uint _id, uint _quantity) public payable {
        userItem memory itemSelected = items[_id];
        
        require(msg.value >= ((itemSelected.price/1 ether)*_quantity), "insufficient balance");
        
        pendingAmount[msg.sender][_id] = msg.value; 

        emit productBought(itemSelected.id,msg.sender,msg.value);
        
        items[_id].quantity-=_quantity;
        if( items[_id].quantity == 0){
            delete items[_id];
        }

        uint count = 0;
        uint index;
        for(uint i=0;i<orders[msg.sender].length;i++){
            if(orders[msg.sender][i].id != _id){
                count++;
            }else{
                index=i;
                break;
            }
              
        }

        if(count== orders[msg.sender].length){
            orders[msg.sender].push(
              orderInfo(_id,itemSelected.product,itemSelected.price,_quantity,itemSelected.imageHash)
              );
        }else{
            orders[msg.sender][index].quantity+=_quantity;
        }
        
    }

    function getOrders() public view returns(orderInfo [] memory){
        return orders[msg.sender];
    }

    function paymentApproved(uint _id) public {
        uint amountPending = pendingAmount[msg.sender][_id];
        owner.transfer(amountPending);
        delete pendingAmount[msg.sender][_id];
    }


}

