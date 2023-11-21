import Web3 from "web3";
import BloctoSDK from "@blocto/sdk";

const bloctoSDK = new BloctoSDK({
    ethereum: {
        chainId: "0x13881", // (required) chainId to be used
        rpc: `https://rpc.ankr.com/polygon_mumbai` // (required for Ethereum) JSON RPC endpoint
    }
});

const web3 = new Web3(bloctoSDK.ethereum);

export { web3, bloctoSDK };
