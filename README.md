# Proxies in Foundry: Example Code
Foundry does not have the tools for interacting with Ethereum proxy
contracts that Hardhat does. However, doing so is still very possible.
In this repo, I've collected examples of how to deal with proxies in
Foundry.

This uses `TransparentProxy` for now, with the `ProxyAdmin` contract
that it requires.

The `src` and `test` directories contain some examples of manipulating
UUPS proxies in tests.

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
2. Get the address of the `ProxyAdmin`, as below
3. Call `upgrade(PROXY_ADDR, IMPL_ADDR)` on the `ProxyAdmin`, as below

### Getting the ProxyAdmin address
Use `cast storage` to get the variable in Proxy's storage slot that
stores the `ProxyAdmin`'s address:
```
export OP_URL=$(pass keys/alchemy/optimism/endpoint)
export CONTRACT=0x10948Fd0beBb798d5eeb315c00B747D6436173b7 
export PROXY_ADMIN_SLOT=0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
export PROXY_ADMIN=$(cast storage --rpc-url $OP_URL $CONTRACT $PROXY_ADMIN_SLOT | cut -c 1-2,27-)
echo $PROXY_ADMIN
```

### Calling upgrade on ProxyAdmin
Using the environment already set above. `$PRIVATE_KEY` is the owner of the `ProxyAdmin`.
```
export PRIVATE_KEY="
export IMPL_CONTRACT="
export PROXY_CONTRACT="
cast call --rpc-url $OP_URL --private-key $PRIVATE_KEY $PROXY_ADMIN "upgrade(${PROXY_CONTRACT},${IMPL_CONTRACT})"
```

## notes
The `src` directory contains 
https://github.com/MatinR1/UpgradeableTest/tree/master
