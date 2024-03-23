"use client"
import { title } from 'process';
import React, { useCallback } from 'react';
import { useState, } from 'react';
import { useAccount, useWalletClient, useWriteContract } from 'wagmi';
import * as AimeErc7007Abi from '../mint/aime-erc7007.abi.json';
// import { writeContract } from 'viem/actions'

const NavBtnStyleNonActive = `m-2 bg-transparent text-white py-2 px-4 border border-green-600 rounded-full hover:bg-gradient-to-r hover:from-green-600 hover:via-green-600 hover:to-green-800 hover:text-white `;
const NavBtnStyleActive = `m-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-150 rounded-full hover:bg-green-600 hover:text-white `;
const buttons = [{
  title: 'All',
  active: true,
  onclick: () => {}
}, {
  title: 'Avartar',
  active: false,
  onclick: () => {}
}, {
  title: 'Tiktok trends',
  active: false,
  onclick: () => {}
}, {
  title: 'Reels',
  active: false,
  onclick: () => {}
}, {
  title: 'BGM video',
  active: false,
  onclick: () => {}
}, ]

const cards = [{
  img: 'https://firebasestorage.googleapis.com/v0/b/ethtaipeihackathon.appspot.com/o/questions%2FAvatar_man3.png?alt=media&token=5a52bb8f-477f-4df6-b6bd-dfa4f8d2562f',
  name: 'Allen',
  price: '11.000 ETH',
  author: 'Allen',
  mint: () => {
    console.log('mint');
  }
}, {
  img: 'https://firebasestorage.googleapis.com/v0/b/ethtaipeihackathon.appspot.com/o/questions%2FAvatar_man3.png?alt=media&token=5a52bb8f-477f-4df6-b6bd-dfa4f8d2562f',
  name: 'Allen',
  price: '11.000 ETH',
  author: 'Allen',
  mint: () => {
    console.log('mint');
  }
}, {
  img: 'https://firebasestorage.googleapis.com/v0/b/ethtaipeihackathon.appspot.com/o/questions%2FAvatar_man3.png?alt=media&token=5a52bb8f-477f-4df6-b6bd-dfa4f8d2562f',
  name: 'Allen',
  price: '11.000 ETH',
  author: 'Allen',
  mint: () => {
    console.log('mint');
  }
},{
  img: 'https://firebasestorage.googleapis.com/v0/b/ethtaipeihackathon.appspot.com/o/questions%2FAvatar_man3.png?alt=media&token=5a52bb8f-477f-4df6-b6bd-dfa4f8d2562f',
  name: 'Allen',
  price: '11.000 ETH',
  author: 'Allen',
  mint: () => {
    console.log('mint');
  }
},{
  img: 'https://firebasestorage.googleapis.com/v0/b/ethtaipeihackathon.appspot.com/o/questions%2FAvatar_man3.png?alt=media&token=5a52bb8f-477f-4df6-b6bd-dfa4f8d2562f',
  name: 'Allen',
  price: '11.000 ETH',
  author: 'Allen',
  mint: () => {
    console.log('mint');
  }
}, ]
const metadataUri = 'https://www.miladymaker.net/milady/json/2';


const MarketPlace: React.FC = () => {
  const { isConnected, address, chainId } = useAccount();
  const result = useWalletClient()

  const { data: hash, writeContract } = useWriteContract()
  const mintAime = useCallback(async (uri: string) => {
    console.log({
      address,
      isConnected,
      chainId,
      result,
    })
    if(!isConnected) {
      alert('Please connect your wallet');
      return;
    }
    writeContract({
      address: '0xCE16905BdD7fF8fBEA3695edaC80e1D48E2bE75f',
      abi: AimeErc7007Abi,
      functionName: 'mint',
      args: ['0x00', '0x00', uri, '0x00'],
    })
    // await writeContract();
  }, [result, address, chainId, isConnected, writeContract]);

  return (
    <>
    <header className='text-center'>
      <h1 className='m-5 uppercase text-white	text-5xl'>Explorer MarketPlace</h1>
    </header>
    <div className="content p-5">
      <div className="nav-bar align-center text-center">
        {buttons.map((btn, index) => <>
          <button key={index} onClick={btn.onclick} className={btn.active ? NavBtnStyleActive : NavBtnStyleNonActive}>{btn.title}</button>
        </>)}
      </div>
      {/* <div className="p-5 mx-auto cards flex justify-center items-center"> */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      
          {cards.map((card, index) => <>
          {/* space-x-4 m-2.5 p-4 max-w-sm rounded overflow-hidden shadow-lg bg-slate-300 */}
            <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-gray-800 rounded-2xl">
              <img className="w-full" src={card.img} alt="Profile image"></img>
              <div className="px-3 py-4">
                <div className="flex justify-between">
                  <div className="box ">
                  <div className="font-bold text-xl mb-2 text-white">Aiko streamer</div>
                    <p className="m-0 p-0 text-gray-500 text-xs">
                      @hibnastiar
                    </p>
                  </div>
                  <div className="box text-center flex justify-center items-center">
                <p className="text-right text-base text-lime-300">
                  1.4 ETH
                </p>

                  </div>
                </div>
              </div>
              <div className="px-6 pt-4 pb-2 text-center">
                
                <button
                onClick={() => mintAime(metadataUri)}
                type="button" className="text-gray-900 bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">MINT</button>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default MarketPlace;