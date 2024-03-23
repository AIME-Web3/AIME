"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from "react";
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from "../components/wallet_connect/config";
import { ConnectButton, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { LinkButton, WallectConnectButton } from "../components/wallet_connect/button";
import { RecoilRoot } from "recoil";

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Navigation } from "@/components/components";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider theme={darkTheme()}>
                <Navigation/>
                {children}
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
