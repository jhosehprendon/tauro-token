var TauroToken = artifacts.require('TauroToken')

contract('TauroToken', (accounts) => {

  it('initializes contract with the corect values', async  () => {
    const tokenInstance = await TauroToken.deployed()
    const tokenName = await tokenInstance.name()
    assert.equal(tokenName, "TauroToken", "it has the correct name")
    const tokenSymbol = await tokenInstance.symbol()
    assert.equal(tokenSymbol, 'TAU')
  })

  it('allocates the initial supply upon deployment', async () => {
    const tokenInstance = await TauroToken.deployed()
    const totalSupply = await tokenInstance.totalSupply()
    assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1M')
    const adminBalance = await tokenInstance.balanceOf(accounts[0])
    assert.equal(adminBalance.toNumber(), 1000000, 'it alocates the initial supply to the admin account')
  })

  it('transfer ownership', async () => {
    const tokenInstance = await TauroToken.deployed()
    try {
      await tokenInstance.transfer.call(accounts[1], 99999999999999999999)
    } catch (err) {
      assert(err.reason, 'invalid number value', 'invalid number value transferred')
    }

    const transfer = await tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] })
    assert.equal(transfer, true, 'it returns true')

    const receipt = await tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] })

    assert.equal(receipt.logs.length, 1, 'triggers one event')
    assert.equal(receipt.logs[0].event, 'Transfer', 'should be Transfer event')
    assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from')
    assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to')
    assert.equal(receipt.logs[0].args._value, 250000, 'logs the amount transferred')

    const balanceReceiver = await tokenInstance.balanceOf(accounts[1])
    assert.equal(balanceReceiver.toNumber(), 250000, 'adds the amount to receiving account')
    const balanceSender = await tokenInstance.balanceOf(accounts[0])
    assert.equal(balanceSender.toNumber(), 750000, 'deducts amount from sending account')
  })
})