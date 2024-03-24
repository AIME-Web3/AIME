"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';


const App: React.FC = () => {
    const { isConnected } = useAccount();
    const router = useRouter();
    const StartClick = () => {
        console.log('StartClick');
        router.push('/create1');
    };

    return (
        <div className="min-h-screen bg-dark text-white flex flex-col justify-center items-center">
            <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
            </header>
            <main className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Your Own Virtual AI Reporter</h1>
                <div className="flex flex-col items-center mb-8 space-y-2">
                    {['CONNECT WALLET', 'ENTER TRANSCRIPTS', 'PERFORM'].map((step, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-accent text-2xl font-bold">{index + 1}</span>
                            <span className="border-b-2 border-accent ml-2">{step}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <p className="mb-4">Connect wallet to check NFT</p>
                    <button onClick={() => StartClick()} className="bg-blue-500 hover:bg-blue-700 px-8 py-3 rounded-md hover:bg-accent-dark hover:text-white transition duration-300">{isConnected ? 'GO' : 'Connect Wallet'}</button>
                </div>
            </main>
        </div>
    );
};

export default App;
