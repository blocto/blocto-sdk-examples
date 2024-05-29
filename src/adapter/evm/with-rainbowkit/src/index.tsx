import "@rainbow-me/rainbowkit/styles.css";
import "./polyfills";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { bscTestnet, blastSepolia, polygonAmoy } from "wagmi/chains";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { bloctoWallet } from "@blocto/rainbowkit-connector";

const projectId = "YOUR_PROJECT_ID";
const appName = "RainbowKit demo";

const connectors = connectorsForWallets(
  [
    {groupName: "Popular", wallets: [
        rainbowWallet,
        metaMaskWallet,
        bloctoWallet(),
        coinbaseWallet,
      ],},
  ],
  {
    projectId,
    appName,
  }
);

const config = createConfig({
  connectors: [...connectors],
  chains: [polygonAmoy, bscTestnet, blastSepolia],
  transports: {
    [polygonAmoy.id]: http(),
    [bscTestnet.id]: http(),
    [blastSepolia.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
