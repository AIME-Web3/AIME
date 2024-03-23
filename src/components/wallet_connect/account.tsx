import React from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useConnect } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const connect = useConnect();
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && 
                <div
                    className="rounded-md border border-[#6fcf97] px-6 py-2 flex gap-2 justify-center items-center relative h-12 bg-transparent" 
                    onClick={() => {
                        alert("fuck")
                        disconnect()
                    }}
                    role='button'
                >
                {
                    ensName ? 
                        `${ensName} (${address})` :
                        address.slice(0, 5) + '...' + address.slice(-5)
                }
                </div>}
        </div>
    )
}

export default Account;