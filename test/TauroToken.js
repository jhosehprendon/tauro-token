var TauroToken = artifacts.require('TauroToken')

contract('TauroToken', (accounts) => {
    it('sets the total supply upon deployment', async () => {
      const tokenInstance = await TauroToken.deployed()
      const totalSupply = await tokenInstance.totalSupply()
      assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1M')
    })
})