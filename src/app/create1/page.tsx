"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertRow, upload } from "../../utils/firebaseHelper";
import { Aside } from '../../components/components';
import { BackendAPI, handleOra } from '../../utils/backend';
import { useAccount } from 'wagmi';

const Home: React.FC = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null); 
    const [nftName, setNftName] = useState("your own nft");
    const [promt, setPrompt] = useState("a girl with Batman body");
    const [isLoading, setIsLoading] = useState(false);
    const { address, isConnected } = useAccount();
    const [generatedImage, setGeneratedImage] =useState<any>("jpg.jpeg");

    const handleImageUpload = async (tempfile: any) => {
        if (tempfile) {
            // below test must be address, it is the name of the file
            // upload file to firebase
            const key = `${address}-${+new Date()}`;
            const url_1 = await upload(`${key}`, tempfile);
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
        handleImageUpload(tempfile);
        setIsLoading(true);
        await BackendAPI.avatarWithPrompt({ prompt: promt, file: tempfile })
        .then((result: File) => {
            console.log("fucl")
            console.log("result", result);
            setImage(URL.createObjectURL(result));
            setGeneratedImage(URL.createObjectURL(result));
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleNextButtonClick = async () => {
        handleOra().then(() => {
            alert("orararara")
        })
    };

    return (
        <>
            <div className={`flex w-4/5 margin-auto justify-around min-h-screen bg-dark`}>
                <Aside/>
                <div className="px-10 rounded-lg w-[600px] flex flex-col items-center flex-wrap text-black">
                    
                    {image && (
                        <div className=" bg-black rounded-lg">
                            
                                <img src={generatedImage} alt="Uploaded" className="max-w-full max-h-full rounded-[40px]" />
                            
                        </div>
                    )}
                    {!image && (
                        <>
                        <label htmlFor={`image`} className="flex items-center justify-center w-64 h-64 bg-gray-700 rounded-lg">
                        {isLoading ?
                                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-gray-500 mx-auto my-4"></div> :
                            <>
                                <i className="fas fa-image fa-3x text-gray-500"></i>
                                <input
                                    id="image"
                                    type="file"
                                    className='w-0'
                                    onChange={(e) => handleUpload(e)}
                                />
                            </>
                        }
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
                                What is your Avatar's name
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
                    onClick={!image? () => {} : handleNextButtonClick} 
                    className="rounded-md px-6 py-2 flex gap-2 justify-center items-center self-stretch relative bg-[#64f2a9] font-bold w-full text-black mt-10"
                >
                    {!image ? "Upload" : "Issue Nft"}
                </button>
                </div>
            </div>
        </>
    )
};

export default Home;