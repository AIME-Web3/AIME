"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertRow, upload } from "@/utils/firebaseHelper";

const Home: React.FC = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null); 
    

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempfile = event.target.files && event.target.files[0];
        if (tempfile) {
            // below test must be address, it is the name of the file
            const url_1 = await upload(`test`, tempfile);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(tempfile);
            
        }
        };


    const handleNextButtonClick = async () => {
        
        router.push('/create2');
        
    };

    return (
        <div className="min-h-screen bg-dark text-white flex flex-col items-center justify-center">
            <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-accent hover:text-accent-light">Create Avatar</a>
                    <a href="#" className="text-white hover:text-gray-300">Docs</a>
                </div>
                <button className="bg-accent hover:bg-accent-light text-dark font-bold py-2 px-4 rounded">
                    Connect
                </button>
            </header>
            <main className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Create Your Own Avatar</h1>
                <div className="flex">
                    <div className="flex flex-col items-center mr-8">
                        
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className="bg-accent text-dark font-bold py-2 px-4 rounded mb-4 cursor-pointer">
                            UPLOAD IMAGE
                        </label>
                        <button className="text-white font-bold py-2 px-4 rounded mb-4">
                            ENTER PROMPT
                        </button>
                        <button className="text-white font-bold py-2 px-4 rounded">
                            MINT YOUR OWN
                        </button>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                     
                        {image && (
                            <div className="flex items-center justify-center w-64 h-64 bg-gray-700 rounded-lg">
                                <img src={image.toString()} alt="Uploaded" className="max-w-full max-h-full" />
                            </div>
                        )}
                        {!image && (
                            <div className="flex items-center justify-center w-64 h-64 bg-gray-700 rounded-lg">
                                <i className="fas fa-image fa-3x text-gray-500"></i>
                            </div>
                        )}
                        <p className="text-center text-gray-400 mt-4">An image for your Avatar</p>
                    </div>
                </div>
                
                <button onClick={handleNextButtonClick} className="bg-accent hover:bg-accent-light text-dark font-bold py-2 px-8 rounded mt-8">
                    Next
                </button>
            </main>
        </div>
    );
};

export default Home;
