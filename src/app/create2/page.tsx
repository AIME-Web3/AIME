"use client"
import { useState } from 'react';
import { mintclub } from 'mint.club-v2-sdk';

const MintNFTButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMintNFT = async () => {
    setIsLoading(true);

    try {
      const MortyMee6Nft = mintclub
        .network('sepolia')
        .nft('MnM-NFT');

      await MortyMee6Nft.create({
        name: 'Morty and Mee6',
        reserveToken: {
          address: '0x4200000000000000000000000000000000000006',
          decimals: 18,
        },
        curveData: {
          curveType: 'EXPONENTIAL',
          stepCount: 10,
          maxSupply: 10_000,
          initialMintingPrice: 0.01,
          finalMintingPrice: 0.1,
          creatorAllocation: 100,
        },
        metadataUrl: 'ipfs://...',
      });

      console.log('NFT created successfully!');
    } catch (error) {
      console.error('Error creating NFT:', error);
    }

    setIsLoading(false);
  };

  return (
    <button onClick={handleMintNFT} disabled={isLoading}>
      {isLoading ? 'Minting NFT...' : 'Mint NFT'}
    </button>
  );
};

export default MintNFTButton;