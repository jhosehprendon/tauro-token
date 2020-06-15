pragma solidity ^0.5.16;

contract TauroToken {
  string public name = 'TauroToken';
  string public symbol = 'TAU';
  string public standard = 'Tauro Token v1.0';
  uint256 public totalSupply;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;

  constructor(uint256 _initialSupply) public {
    //  alocate initial supply
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }

  // Transfer
  function transfer(address _to, uint256 _value) public returns(bool success) {
    // Execption if account doesn't have enough funds
    require(balanceOf[msg.sender] >= _value, "Invalid amount");
    // Transfer the balance
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    // Transfer events
    emit Transfer(msg.sender, _to, _value);

    return true;
  }
}