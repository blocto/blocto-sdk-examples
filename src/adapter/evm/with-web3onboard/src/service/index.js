import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import bloctoModule from "@web3-onboard/blocto";

const bscTestnet = {
    id: "0x61",
    token: "BNB",
    label: "BSC Testnet",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
};

const chains = [bscTestnet];
const blocto = bloctoModule();
const wallets = [injectedModule(), blocto];

const web3Onboard = init({
    wallets,
    chains,
    appMetadata: {
        name: "Web3-Onboard Demo",
        icon: "<svg>My App Icon</svg>",
        description: "A demo of Web3-Onboard."
    }
});

export { web3Onboard };
