import { http, createConfig } from 'wagmi'
import { bscTestnet, optimismGoerli, polygonMumbai } from 'wagmi/chains'
import { blocto } from '@blocto/wagmi-connector'

export const config = createConfig({
  chains: [polygonMumbai, bscTestnet, optimismGoerli],
  multiInjectedProviderDiscovery: false,
  connectors: [
    blocto(),
  ],
  transports: {
    [polygonMumbai.id]: http(
      'https://rpc.ankr.com/polygon_mumbai',
    ),
    [bscTestnet.id]: http(
      'https://rpc.ankr.com/bsc_testnet_chapel',
    ),
    [optimismGoerli.id]: http(
      'https://rpc.ankr.com/optimism_testnet'
    ),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
