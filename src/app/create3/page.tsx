"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertRow, upload } from "@/utils/firebaseHelper";
import { Aside } from '@/components/components';
// import { mintclub } from 'mint.club-v2-sdk';

const Home: React.FC = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null); 
    const [nftName, setNftName] = useState("");
    const [promt, setPrompt] = useState("");
    

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempfile = event.target.files && event.target.files[0];
        console.log(tempfile);
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
            <div className="flex w-4/5 margin-auto justify-around min-h-screen bg-dark">
                <Aside/>
                <div className="px-10 rounded-lg w-[600px] flex flex-col items-center flex-wrap text-black">
                    
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
                    <input type="file" onChange={handleImageUpload} />
                    <p className="text-center text-gray-400 mt-4">An image for your Avatar</p>
                    <input
                        className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-10 mb-2" 
                        id="nftname"
                        name="nftname"
                        type="text"
                        placeholder="Enter Subject"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                    />
                    <small
                        className="tracking-[0.2px] text-left w-full font-medium leading-6 text-base text-[#828282]"
                    >
                        What is your Avatar's name
                    </small>
                    <input
                        className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-10 mb-2" 
                        id="nftname"
                        name="nftname"
                        type="text"
                        placeholder="Enter Subject"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                    />
                    <small
                        className="tracking-[0.2px] text-left w-full font-medium leading-6 text-base text-[#828282]"
                    >
                        What is your Avatar's name
                    </small>
                <button
                    onClick={handleNextButtonClick} 
                    className="rounded-md px-6 py-2 flex gap-2 justify-center items-center self-stretch relative bg-[#64f2a9] w-full text-black mt-10"
                >
                    Next
                </button>
                </div>
            </div>
    )
};

export default Home;