'use client'

import Image from 'next/image'
import Link from 'next/link'
import { auth , db } from '../../../firebase-config'
import { createUserWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth'
import { doc , collection , setDoc } from 'firebase/firestore'
import { useRouter , redirect } from 'next/navigation'
import { useState , useEffect } from 'react'

const SignUp = () => {

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
    const [ email , setEmail ] = useState()
    const [ password , setPassword ] = useState()
    const [ error , setError ] = useState()
    const router = useRouter()

    const createUser = async()=>{
        let path = doc( db , 'Users' , email)
        try {
            await createUserWithEmailAndPassword( auth , email , password)
            await setDoc( path , {
                mainUserMail : email
            })
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div>
        <div class = 'h-screen w-full'>
            <Image 
                src = 'https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/05d8322d-7649-4429-ba92-76c8b3075572/KE-en-20231023-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                objectFit='cover'
                fill = {true}
                alt = ''
            />
            <div class = 'fixed w-full px-4 py-24 z-50'>
                <div class = 'max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div class = 'max-w-[320px] mx-auto py-16'>
                        <h1 class = 'text-3xl font-bold'>Sign Up</h1>
                        { error && <p class = 'p-3 my-3 bg-red-600 text-slate-100'>{error}</p>}
                        <div class = 'w-full flex flex-col py-4'>
                            <input
                                onChange={(e)=>{setEmail(e.target.value)}}
                                class = 'p-3 my-2 bg-gray-700 rounded' 
                                type="email" 
                                placeholder='Email' 
                                autoComplete='Email'
                            />
                            <input
                                onChange={(e)=>{setPassword(e.target.value)}}
                                class = 'p-3 my-2 bg-gray-700 rounded' 
                                type="password" 
                                placeholder='Password' 
                                autoComplete='current password'
                            />
                            <button onClick = {createUser} class = 'bg-red-600 py-3 my-6 rounded font-bold active:scale-110 transition duration-300'>Sign Up</button>
                            <div class = 'flex items-center justify-between text-sm text-gray-600'>
                                <p>
                                    <input 
                                        type="checkbox"
                                        class = 'mr-2'
                                    />
                                    Remember Me
                                </p>
                                <p>Need Help?</p>
                            </div>
                            <p class = 'py-4'>
                                <span class = 'text-gray-600'>Already subscribed to Netflix?</span>
                                <Link href = '/signIn'>Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default SignUp

//https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/05d8322d-7649-4429-ba92-76c8b3075572/KE-en-20231023-popsignuptwoweeks-perspective_alpha_website_medium.jpg