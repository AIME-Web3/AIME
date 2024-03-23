import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    safe(),
  ],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
    // [base.id]: http(),
  },
  
})