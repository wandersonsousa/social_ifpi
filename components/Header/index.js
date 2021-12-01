import Link from 'next/link'
import { useAuth } from '../../lib/auth'
import { useState } from 'react'
import Image from 'next/image'

export default function Header({title}){
    const { user } = useAuth();
    const [imageLoaded, setimageLoaded] = useState(false)
    

    return(
        <div className="flex items-center justify-between text-white">
            <div className="flex">
                <Link href="/home"><a><div className="h-10 w-10 relative"><Image src="/logo.png" layout="fill"/></div></a></Link>
                <p className="font-bold text-2xl pl-2">{title}</p>
            </div>
            <div className="hidden md:flex md:items-center">
                <Link href="/search"><a><div className="relative h-6 w-6"><Image src="/search.svg" layout="fill" /></div></a></Link>
                <Link href="/home"><a className="mx-8"><h2>Home</h2></a></Link>
                {/* Check if user is loged in */}
                {user ?
                    <Link href={user.displayName}>
                        <a>
                            <div className="flex bg-gray-750 py-1 px-4 rounded-lg items-center cursor-pointer">
                                {imageLoaded ?  null : <div className="h-8 w-8 animate-pulse rounded-md mr-2 bg-purple-550 "></div>}
                                <div className={`h-8 w-8 relative overflow-hidden rounded-md mr-2 ${imageLoaded ? "block" : "hidden"}`}><Image alt="broken image" layout="fill" src={user.photoURL} onLoad={() => setimageLoaded(true)}/></div>
                                <div>
                                    <h2 className="text-md">@{user.displayName}</h2>
                                    <p className="text-sm">Veja seu perfil</p>
                                </div>
                            </div>
                        </a>
                    </Link>
                : null}
            </div>
        </div>
    )
}