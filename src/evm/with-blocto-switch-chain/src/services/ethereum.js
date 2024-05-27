import Web3 from "web3";
import BloctoSDK from "@blocto/sdk";

const bloctoSDK = new BloctoSDK({
    ethereum: {
        chainId: "0x13882", // (required) chainId to be used
        rpc: `https://rpc-amoy.polygon.technology` // (required for Ethereum) JSON RPC endpoint
    }
});

const web3 = new Web3(bloctoSDK.ethereum);

export { web3, bloctoSDK };
