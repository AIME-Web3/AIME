"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertRow, upload } from "@/utils/firebaseHelper";
import { Aside, AsideVideo } from '@/components/components';
import { BackendAPI } from '@/utils/backend';
import { useAccount } from 'wagmi';

const Home: React.FC = () => {
    const router = useRouter();
    const { isConnected } = useAccount();

    const [image, setImage] = useState<string | ArrayBuffer | null>(null); 
    const [gender, setGender] = useState("Female");
    const [content, setContent] = useState("Let's talk about the AIME token. This token empowers our AI service to support users in demonstrating or promoting their own products on social media.");
    const [audio, setAudio] = useState<any>(null);
    const [video, setVideo] = useState<any>(null);

    const [generatedImage, setGeneratedImage] =useState<any>("jpg.jpeg");

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempfile = event.target.files && event.target.files[0];
        const _video = await BackendAPI.generateAiAvatarVideo({username: "test"});
        const _audio = await BackendAPI.generateAudio({content, gender}) as any;
        console.log("video", video);
        console.log("audio", audio);
        setVideo(URL.createObjectURL(_video));
        setAudio(_audio);
    }

    const handleNextButtonClick = () => {}

    useEffect(() => {
        if(isConnected) {
            setImage("isImage");
        }
    }, [isConnected]);
    return (
        <>
            <div className={`flex w-4/5 margin-auto justify-around min-h-screen bg-dark`}>
                <AsideVideo/>
                <div className="px-10 rounded-lg w-[600px] flex flex-col items-center flex-wrap text-black">
                    {/** show video */}
                    {   video && audio &&
                            <video controls src={video} className="mb-4 w-[400px] h-[400px] w-auto">
                                <source src={audio} type="audio/mpeg"/>
                            </video>
                    }
                    {/*exist image */}
                    {image && !video && !audio && (
                        <div className="flex items-center justify-center w-[400px] h-[400px] bg-black rounded-lg">
                            <img src={generatedImage} alt="Uploaded" className="max-w-full max-h-full" />
                        </div>
                    )}
                    {/* Upload Image */}
                    {!image && (
                        <>
                            <label htmlFor={`image`} className="flex items-center justify-center w-[194px] h-[194px] rounded-[45px] bg-gray-700">
                                <i className="fas fa-image fa-3x text-gray-500"></i>
                                <input
                                    id="image"
                                    type="file"
                                    className='w-0'
                                    onChange={handleUpload}
                                />
                            </label>
                            <small
                                className="tracking-[0.2px] text-center w-full font-medium leading-6 text-base text-[#828282] my-10"
                            >
                                Connect wallet to check nft.
                            </small>
                        </>
                    )}
                    {image && !video && !audio && (
                        <>
                            <textarea
                             value={content}
                              onChange={(e) => setContent(e.target.value)}
                              className="bg-[#1e1e1e] text-white w-full rounded-[20px] h-[194px] p-5 resize-none" 
                              />
                            <small
                                className="tracking-[0.2px] text-left w-full font-medium leading-6 text-base text-[#828282]"
                            >
                                What would you like your avatar to say?
                            </small>
                            <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="dropdown"
                                className="mt-5 text-white bg-[#1e1e1e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center w-full"
                                type="button"
                            >
                                Female
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="dropdown"
                                className="mt-5 text-white bg-[#1e1e1e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center w-full"
                                type="button"
                            >
                                Soft tone
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <small
                                className="tracking-[0.2px] text-left w-full font-medium leading-6 text-base text-[#828282]"
                            >
                                what tone and voice type would you prefer for your avatar?
                            </small>
                        </>
                    )}
                    {audio && video && (
                        <div className="flex w-full gap-2">
                            <button
                                onClick={()=>{}}
                                className="rounded-md px-6 py-2 flex gap-2 font-bold justify-center items-center self-stretch relative bg-[#828282] w-1/2 text-black mt-10"
                            >
                                Back
                            </button>
                            <button
                                className="rounded-md px-6 py-2 flex gap-2 font-bold justify-center items-center self-stretch relative bg-[#64f2a9] w-1/2 text-black mt-10"
                                onClick={(e) =>handleUpload(e)} 
                            >
                                Download
                            </button>
                            <button
                                className="rounded-md px-6 py-2 flex gap-2 font-bold justify-center items-center self-stretch relative bg-[#64f2a9] w-1/2 text-black mt-10"
                                onClick={(e) =>handleUpload(e)} 
                            >
                                Share
                            </button>
                        </div>
                    )}
                    <div className={`${audio && video && "hidden"}`}>
                        
                        { !image ? (
                            <button
                                onClick={handleNextButtonClick} 
                                className="rounded-md px-6 py-2 flex gap-2 font-bold justify-center items-center self-stretch relative bg-[#64f2a9]  w-full text-black mt-10"
                            >
                                {!image ? "Connect Wallet" : "issue nft"}
                            </button>
                        ): (
                            <div className="flex w-full gap-2">
                                <button
                                    onClick={()=>{}}
                                    className="rounded-md px-6 py-2 flex gap-2 font-bold justify-center items-center self-stretch relative bg-[#828282] w-1/2 text-black mt-10"
                                >
                                    Back
                                </button>
                                <button
                                    className="rounded-md px-6 py-2 flex gap-2 font-bold justify-center items-center self-stretch relative bg-[#64f2a9] w-1/2 text-black mt-10"
                                    onClick={(e) =>handleUpload(e)} 
                                >
                                    Generate
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;