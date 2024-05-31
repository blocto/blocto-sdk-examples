import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygon, optimism, arbitrum, bsc, bscTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet, bsc, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID || '' }), publicProvider()]
);

export { chains, publicClient, webSocketPublicClient };
