import { http, createConfig } from 'wagmi'
import { bscTestnet, sepolia, polygonAmoy } from 'wagmi/chains'
import { blocto } from '@blocto/wagmi-connector'

export const config = createConfig({
  chains: [polygonAmoy, bscTestnet, sepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    blocto(),
  ],
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'),
    [bscTestnet.id]: http(
      'https://rpc.ankr.com/bsc_testnet_chapel',
    ),
    [sepolia.id]: http(
      'https://rpc.sepolia.org',
    ),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
