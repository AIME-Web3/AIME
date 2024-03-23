import React, { Children } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export const WallectConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}

          >
            {(() => {
              if (!connected) {
                return (
                    <div
                        onClick={openConnectModal} 
                        role="button"
                        className="rounded-md px-6 py-2 flex gap-2 justify-center items-center relative w-[168px] h-12 bg-[#64f2a9] text-black font-bold"
                    >
                        Connect
                    </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        onClick={openAccountModal} 
                        type="button"
                        className="rounded-md border border-[#6fcf97] px-6 py-2 flex gap-2 justify-center items-center relative h-12 bg-transparent w-[168px]"
                    >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const LinkButton = (props: {
  destination: string,
  name: string
}) => {
    return (
        <Link href={props.destination}>
          {props.name}
        </Link>
    )
}