var TauroTokenSale = artifacts.require('TauroTokenSale')

contract('TauroTokenSale', (accounts) => {
  var tokenPrice = 1000000000000000 // in wei

  it('initializes contract with the corect values', async  () => {
    const tokenSaleInstance = await TauroTokenSale.deployed()
    const address = await tokenSaleInstance.address
    assert.notEqual(address, 0x0, 'has contract address')

    const addressTokenContract = await tokenSaleInstance.tokenContract()
    assert.notEqual(addressTokenContract, 0x0, 'it has a token contract address')

    const price = await tokenSaleInstance.tokenPrice()
    assert.equal(price, tokenPrice, 'token price is correct')
  })
})