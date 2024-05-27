import { configureChains, createConfig } from 'wagmi'
import { bscTestnet, sepolia } from 'wagmi/chains'
import { BloctoConnector } from '@blocto/wagmi-connector';

import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet, sepolia],
  [
    publicProvider(),
  ],
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new BloctoConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})
