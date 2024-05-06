'use client'

import Link from "next/link"
import { signOut , onAuthStateChanged } from 'firebase/auth'
import { useEffect , useState } from "react"
import { auth } from "../../../firebase-config"
import { useRouter } from "next/navigation"

export default function NavBar(){

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged( 
          auth , (user)=>{
              setCurrentUser(user)
          }
      )
      return ()=>{
        unsubscribe()
      }
    })

    const [ cUser , setCurrentUser ] = useState()
    const router = useRouter()

    const logout = async()=>{
        try {
            await signOut(auth)
        } catch (error) {
            
        }
    }

    return(
        <div class = 'absolute flex items-center justify-between z-[100] w-full p-4'>
            <Link href='/'>
                <h1 class = 'font-extrabold text-4xl text-red-600'>NETFLIX</h1>
            </Link>
            {
                cUser ? 
                <div >
                    <Link href = '/account'>
                        <button class = 'text-white pr-4 active:scale-110 transition duration-300 py-1 '>Account</button>
                    </Link>
                        <button onClick = {logout} class = 'text-white px-6 py-2 rounded bg-red-600 active:scale-110 transition duration-300'>Logout</button>
                </div>
                :
                <div >
                    <Link href = '/signIn'>
                        <button class = 'text-white pr-4 active:scale-110 transition duration-300 py-1 '>Sign In</button>
                    </Link>
                    <Link href = '/signUp'>
                        <button class = 'text-white px-6 py-2 rounded bg-red-600 active:scale-110 transition duration-300'>Sign Up</button>
                    </Link>
                </div>

            }
        </div>
    )
}