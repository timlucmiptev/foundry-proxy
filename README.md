# Proxies in Foundry: Example Code
Foundry does not have the tools for interacting with Ethereum proxy
contracts that Hardhat does. However, doing so is still very possible.
In this repo, I've collected examples of how to deal with proxies in
Foundry.

## Intuition
TransparentProxy is deployed by a ProxyAdmin contract. The owner of the
implementation contract's functions and the owner of ProxyAdmin are the
same.

### deploying
1. Deploy a `ProxyAdmin` instance, with your wallet as `admin`
2. Deploy the implementation contract and get its address
3. Deploy the TransparentProxy, setting the ProxyAdmin as the admin

### upgrading
The below example uses Hardhat on Optimism.

1. Deploy the new implementation contract and get its address
2. Get the address of the `ProxyAdmin`, as in example below
3. Call `upgrade(PROXY_ADDR, IMPL_ADDR)` on the `ProxyAdmin`
```
const proxyAddress = '0x10948Fd0beBb798d5eeb315c00B747D6436173b7'
const adminStorageSlot = '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103'
await hre.ethers.provider.getStorage(proxyAddress, adminStorageSlot)
```

## notes
implementing this repo:
https://github.com/MatinR1/UpgradeableTest/tree/master

