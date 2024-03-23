"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertRow, upload } from "@/utils/firebaseHelper";
import { Aside, AsideVideo } from '@/components/components';
import { BackendAPI, handleGetImage } from '@/utils/backend';
import { useAccount } from 'wagmi';

const Home: React.FC = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null); 
    const [nftName, setNftName] = useState("your own nft");
    const [promt, setPrompt] = useState("a girl with Batman body");
    const { isConnected } = useAccount();
    const [generatedImage, setGeneratedImage] =useState<any>("jpg.jpeg");

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
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempfile = event.target.files && event.target.files[0];
        await handleGetImage(prompt, tempfile)
            .then((result: File) => {
                console.log(result);
                setGeneratedImage(URL.createObjectURL(result));
            })
    }

    const handleNextButtonClick = async () => {
        
        // router.push('/create2');
        
    };

    return (
        <>
            <div className={`flex w-4/5 margin-auto justify-around min-h-screen bg-dark ${!isConnected && 'hidden'}`}>
                <AsideVideo/>
                <div className="px-10 rounded-lg w-[600px] flex flex-col items-center flex-wrap text-black">
                    
                    {image && (
                        <div className="flex items-center justify-center w-[400px] h-[400px] bg-black rounded-lg">
                            <img src={generatedImage} alt="Uploaded" className="max-w-full max-h-full" />
                        </div>
                    )}
                    {!image && (
                        <>
                        <label htmlFor={`image`} className="flex items-center justify-center w-64 h-64 bg-gray-700 rounded-lg">
                            <i className="fas fa-image fa-3x text-gray-500"></i>
                            <input
                                id="image"
                                type="file"
                                className='w-0'
                                onChange={handleUpload}
                            />
                        </label>
                        </>
                    )}
                    {!image &&(
                        <>
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
                                What is your Avatar&apos;s name
                            </small>
                            <input
                                className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-10 mb-2" 
                                id="nftname"
                                name="nftname"
                                type="text"
                                placeholder="Enter Subject"
                                value={promt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <small
                                className="tracking-[0.2px] text-left w-full font-medium leading-6 text-base text-[#828282]"
                            >
                                What is your prompt
                            </small>
                        </>
                    )}
                <button
                    onClick={!image? handleNextButtonClick: ()=>{}} 
                    className="rounded-md px-6 py-2 flex gap-2 justify-center items-center self-stretch relative bg-[#64f2a9] w-full text-black mt-10"
                >
                    {!image ? "upload" : "issue nft"}
                </button>
                </div>
            </div>
        </>
    )
};

export default Home;