require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const words = process.env.MNEMONIC.match(/[a-zA-Z]+/g).length
validLength = [12, 15, 18, 24]
if (!validLength.includes(words)) {
   console.log(`The mnemonic (${process.env.MNEMONIC}) is the wrong number of words`)
   process.exit(-1)
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
    networks: {
      "op-mainnet": {
        url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.OP_MAINNET_ALCHEMY_KEY}`,
        accounts: { mnemonic: process.env.MNEMONIC }
      },
     "op-goerli": {
        url: `https://opt-goerli.g.alchemy.com/v2/${process.env.OP_GOERLI_ALCHEMY_KEY}`,
        accounts: { mnemonic: process.env.MNEMONIC }
      },
      "goerli": {
        url: `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_KEY}`,
        accounts: { mnemonic: process.env.MNEMONIC }
      },
  }
};
