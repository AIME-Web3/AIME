import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, sepolia, createConfig } from "wagmi";
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient } = configureChains(
  [sepolia],
  [
    publicProvider(),
  ]
);

export const { connectors } = getDefaultWallets({
  appName: 'Airdrop App',
  projectId: '29f089b368494e3fed5056775f80ee35',
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});