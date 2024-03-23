"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertRow, upload } from "@/utils/firebaseHelper";
import { Aside } from '@/components/components';

const Home: React.FC = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null); 
    

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempfile = event.target.files && event.target.files[0];
        if (tempfile) {
            // below test must be address, it is the name of the file
            // upload file to firebase
            const url_1 = await upload(`test`, tempfile);
            
            // key will be address
            var key = "aaa"
            // upload file to firebase
            await insertRow('NFT', [key], {
                id: key,
                address: key || '',
                sourceUrl: url_1,
                description: `${key}-Avatar_image`,
              })
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
            <main className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Create Your Own Avatar</h1>
                <div className="flex">
                    <Aside/>
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
