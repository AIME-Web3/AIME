"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from "react";
import { LinkButton, WallectConnectButton } from "../components/wallet_connect/button";
import { RecoilRoot } from "recoil";

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Navigation } from "../components/components";
import BgImage from "../asset/bg.png";
import { publicProvider } from 'wagmi/providers/public';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';


import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import { chains, wagmiConfig } from "../utils/wagmi";

const rainbowkitTheme = darkTheme();

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className} style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
        <RecoilRoot>
        <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={rainbowkitTheme}
            modalSize="compact"
          >
                <Navigation/>
                {children}
                </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
