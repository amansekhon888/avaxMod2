// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract HomeSecuritySystem {
    
    address public owner;
    uint256 secretKey;
    mapping( address=>bool ) hasAccess;
    mapping( address=>bool ) insideHome;
    mapping( address=>bool ) isAdmin;

    constructor() {
        owner = msg.sender;
        secretKey = 12345;
        isAdmin[msg.sender] = true;
        hasAccess[msg.sender] = true;
        insideHome[msg.sender] = false;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function changeSecretKey( uint256 prevKey, uint256 newKey ) public onlyOwner{
        require(prevKey==secretKey,"secret key doesn't match");
        require(newKey>=12345 && newKey<=99999, "secret key should be of 5 digits");

        secretKey = newKey;
    }

    function giveAdminAccess( address addr ) public onlyOwner{
        isAdmin[addr] = true;
        hasAccess[addr] = true;
    }

    function giveAccess( address addr ) public{
        require(isAdmin[msg.sender],"only owner can give access");
        insideHome[addr] = false;
        hasAccess[addr] = true;
    }

    function openDoor( uint256 key ) public{
        require(hasAccess[msg.sender],"you don't have access to enter home");
        require(key==secretKey,"secret key doesn't match");

        insideHome[msg.sender] = !insideHome[msg.sender];
    }

    
    function getContractAddress() public view returns (address) {
        return address(this);
    }

}
