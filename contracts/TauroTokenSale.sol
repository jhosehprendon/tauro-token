pragma solidity ^0.5.16;
import "./TauroToken.sol";

contract TauroTokenSale {
  address admin;
  TauroToken public tokenContract;
  uint256 public tokenPrice;

  constructor(TauroToken _tokenContract, uint256 _tokenPrice) public {
      admin = msg.sender;
      tokenContract = _tokenContract;
      tokenPrice = _tokenPrice;
  }
}