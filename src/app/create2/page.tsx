// pages/index.tsx
"use client"
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Create Your Own Avatar</h1>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex flex-col items-center">
                        <img src="https://placehold.co/150x150" alt="Placeholder image of an avatar" className="rounded-lg mb-2" />
                        <span className="text-lg">Unnamed Avatar</span>
                    </div>
                </div>
                <div className="w-full mb-6">
                    <div className="flex items-center mb-2">
                        <div className="flex-1 h-1 bg-green-500 rounded"></div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="flex-1 h-1 bg-green-500 rounded"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-1 h-1 bg-green-500 rounded"></div>
                    </div>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="avatarName" className="block text-sm font-medium mb-1">Aiko</label>
                    <input id="avatarName" type="text" placeholder="What is your Avatar's name" className="w-full p-2 bg-gray-700 rounded" />
                </div>
                <div className="w-full mb-6">
                    <textarea placeholder="An Asian girl in a dining room, dressed in black, with a sofa and candlelight." className="w-full p-2 bg-gray-700 rounded h-24 resize-none"></textarea>
                </div>
                <div className="w-full flex justify-between">
                    <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Back</button>
                    <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-400">Generate</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
