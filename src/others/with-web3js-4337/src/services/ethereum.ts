import Web3 from "web3";
import BloctoSDK from "@blocto/sdk";
import { EIP4337Plugin } from "@chainsafe/web3-plugin-eip4337";

const bloctoSDK = new BloctoSDK({
  ethereum: {
    chainId: "0x13882", // (required) chainId to be used
    rpc: `https://rpc-amoy.polygon.technology`,
  },
});

const web3 = new Web3(bloctoSDK.ethereum as any);
web3.registerPlugin(new EIP4337Plugin());

export { web3, bloctoSDK };
