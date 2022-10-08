
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7; 
 
contract Wallet {
    address payable walletOwner;

    struct Transaction {
        uint256 id;
        string subject;
        uint256 amount;
        address sender;
        address reciever;
    }
    
     uint public historyCount;
    Transaction [] public history;
    constructor() {
        walletOwner = payable(msg.sender);
        historyCount = 0;
    }
 
    // EVENTS
    event Deposited(uint256 indexed amount, string message, address depositor);
    event Spending(uint256 indexed amount, string message, address to);
    //MODIFIERS

    modifier OwnerPrivillege() {
        require(msg.sender == walletOwner, "Only wallet owner can call this function");
        _;
    }

    
    function deposit() public payable {
        // recording the deposit
        history.push( Transaction( historyCount++, "Deposit", msg.value, msg.sender, address(this)));
        //event calling
        emit Deposited(msg.value, " Deposited by ", msg.sender);
    }

    // Transfer to my Metamask
    function withdraw(uint256 amount) public OwnerPrivillege {
        // Limit withdrawal amount
        require(amount <= 10 ether);
        // Ensure Wallet balance is greater than request
        require(address(this).balance >= amount, "Insufficient balance baby!");
          // Send the amount to the address that requested it
        walletOwner.transfer(amount);
        // recording the transaction
        history.push( Transaction(historyCount++, "Withdrawal", amount, address(this), walletOwner));
      
    }

    // Separate function for running give aways or
    // Paying  other people for services rendered to me
    function spend(address payable Individual, uint256 amount) public OwnerPrivillege {
        // Ensure Wallet balance is greater than request
        require(address(this).balance >= amount, "Insufficient balance baby!");

        Individual.transfer(amount);
        //record the transfer
        history.push( Transaction(historyCount++, "Transfer", amount, address(this), Individual));
        // event calling
        emit Spending(amount, " Is what You just sent to ", Individual);
    }

    // Accept any incoming amount
    function recieve() public payable {
        
        history.push( Transaction( historyCount++, "Recieved", msg.value, msg.sender, address(this)));
        //event calling
        emit Deposited(msg.value, " Fallback deposit made by ", msg.sender);
    }

    function balance () public view returns( uint256 ){
        return address(this).balance;
    }

    function showAddress () public view returns( address ){
        return address(this);
    }

    
    function getHistory() public view returns (Transaction[] memory) {
        return history;
    }
    
    function getTransaction(uint256 _id) public view returns (Transaction memory) {
        return history[_id - 1];
    }
          
    function sucide() public OwnerPrivillege {
        selfdestruct(walletOwner);
    }

    
}
