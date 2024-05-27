import type { AppProps } from "next/app";
import { ThirdwebProvider, bloctoWallet } from "@thirdweb-dev/react";
import {
  Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Binance, // Mainnets 
  AvalancheFuji,BinanceTestnet // Testnets
} from "@thirdweb-dev/chains";

const BLOCTO_SUPPORTED_MAINNET_CHAIN = [Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Binance];
const BLOCTO_SUPPORTED_TESTNET_CHAIN = [AvalancheFuji, BinanceTestnet];
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={BinanceTestnet}
      supportedChains={BLOCTO_SUPPORTED_TESTNET_CHAIN}
      supportedWallets={[bloctoWallet()]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
