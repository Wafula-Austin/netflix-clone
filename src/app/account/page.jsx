'use client'

import Image from "next/image"
import SavedShows from "../components/SavedShows"

export default function Account() {
  return (
    <div class = 'w-full text-white'>
            <Image 
                src = 'https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/05d8322d-7649-4429-ba92-76c8b3075572/KE-en-20231023-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '400px' }}
                objectFit="cover" // optional
                alt = ''
            />
            <div class = 'bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
            <div class = 'absolute top-[20%] p-6 md:p-8'>
                <p class = 'text-3xl md:text-5xl font-bold'>My Shows</p>
            </div>
        <SavedShows/>
    </div>
  )
}