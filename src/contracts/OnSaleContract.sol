pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract OnSale {


    uint public itemCount = 0;
    uint public oredrCount;

    mapping(uint => userItem) public items;
    mapping(address => mapping(uint => sellerData) ) pendingAmount;
    mapping(address => productInfo[]) products;
    mapping(address => orderInfo[])  orders;

    struct userItem {
        uint id;
        string product;
        uint price;
        uint quantity;
        string imageHash;
        address payable seller;
    }


    struct sellerData {
        uint amount;
        address payable seller;
    }

    struct productInfo {
        string product;
        string imageHash;
        uint price;
        uint quantity;
    }

    struct orderInfo{
        uint id;
        string product;
        uint price;
        uint quantity;
        string imageHash;
        address seller;
    }

    event itemAdded (
        uint id,
        string product,
        uint price,
        uint quantity,
        address  seller
    );

    event productBought (
        uint id,
        address buyer,
        uint amount
    );

    function addItem(string memory _product, uint _price, uint _quantity,string memory _imageHash) public {
        itemCount++;
        items[itemCount] = userItem(itemCount,_product,_price,_quantity,_imageHash,msg.sender);
        products[msg.sender].push(productInfo(_product,_imageHash,_price,_quantity));
        emit itemAdded(itemCount, _product, _price, _quantity, msg.sender);
    }

    function buy(uint _id) public payable {
        userItem memory itemSelected = items[_id];
        
        require(msg.value >= itemSelected.price *(1 ether), "insufficient balance");
        
        pendingAmount[msg.sender][_id] = sellerData(msg.value,itemSelected.seller);

        emit productBought(itemSelected.id,msg.sender,msg.value);
        
        items[_id].quantity-=1;
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
              orderInfo(_id,itemSelected.product,itemSelected.price,1,itemSelected.imageHash,itemSelected.seller)
              );
        }else{
            orders[msg.sender][index].quantity+=1;
        }
        
    }

    function getProducts() public view returns(productInfo [] memory) {
        return products[msg.sender];
    }

    function getOrders() public view returns(orderInfo [] memory){
        return orders[msg.sender];
    }

    function paymentApproved(uint _id) public {
        sellerData memory sellerdata = pendingAmount[msg.sender][_id];
        uint amount = sellerdata.amount;
        address payable seller = sellerdata.seller;
        address(seller).transfer(amount);
        delete pendingAmount[msg.sender][_id];
    }


}

