import Web3 from "web3";
import BloctoSDK from "@blocto/sdk";
import ContractAbi from "../utils/abi.json";

const bloctoSDK = new BloctoSDK({
    ethereum: {
        chainId: "0x13882", // (required) chainId to be used
        rpc: `https://rpc-amoy.polygon.technology` // (required for Ethereum) JSON RPC endpoint
    }
});

const web3 = new Web3(bloctoSDK.ethereum);

const contract = new web3.eth.Contract(
    ContractAbi,
    "0x009c403bdfae357d82aaef2262a163287c30b739"
);

export { web3, bloctoSDK, contract };
