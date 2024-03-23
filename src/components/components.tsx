import React from "react"
import Link from "next/link"
import { LinkButton, WallectConnectButton } from "./wallet_connect/button"
import { useRecoilValue } from "recoil"
import { createStepAtom } from "@/state/state"

export const Navigation = () => {

    return (
        <div className="mb-10 flex justify-end p-5">

            {/* <div className="flex space-x-4">
                <LinkButton
                    destination="/create1"
                    name="+ Create Avatar"
                />
                <LinkButton
                    destination="/create2"
                    name="+ Create Avatar"
                />
            </div> */}
            <WallectConnectButton/>
        </div>
    )
}

export const Container = (props: any) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Aside/>
            <div>
                {props}
            </div>
        </div>
    )
}

export const Aside = () => {
    return (
        <div className="w-[300px] h-full flex flex-col items-end">
            <h2
                className="w-full font-bold text-[36px] text-right text-white mb-10 pl-10"
            >
                Create Your Own Avatar
            </h2>
            <div
                className="pl-10"
            >

            <AILinkButton
                index={1}
                name="UPLOAD IMAGE"
                destination="/create1"
                />
            <AILinkButton
                index={2}
                name="ENTER PROMPT"
                destination="/create2"
                />
            <AILinkButton
                index={3}
                name="MINT YOUR OWN"
                destination="/create3"
                />
            </div>
        </div>
    )
}

export const AILinkButton = (props: {
    index: number,
    name: string,
    destination: string
}) => {
    const step = useRecoilValue(createStepAtom);
    return (
        <Link
            href={props.destination}
            className="mb-10 border-b-[#6fcf97] border-b-2 self-stretch px-4 py-[9px] flex gap-3 justify-start items-center relative bg-transparent"
        >
            <p
                className="rounded-[50px] p-[5px] flex flex-col gap-[5px] justify-center items-center relative w-6 bg-[#6fcf97] tracking-[0.2px] uppercase font-bold leading-[14px] text-xs text-black"
            >
                {props.index}
            </p>
            <p
                className="tracking-[0.4px] uppercase font-bold leading-6 text-base text-[#6fcf97]"
            >
                {props.name}
            </p>
        </Link>
    )
}
