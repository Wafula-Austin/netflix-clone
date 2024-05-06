'use client'

import { useEffect , useState } from 'react'
import Image from 'next/image'
import { MdChevronLeft , MdChevronRight } from 'react-icons/md'
import { auth , db } from '../../../firebase-config'
import { getDocs , doc , collection , updateDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { RxCrossCircled } from 'react-icons/rx'

function SavedShows() {

    useEffect(()=>{
        getWatchlist()
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
    const [ saved , setSaved ] = useState([])


    const slideLeft = ()=>{
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = ()=>{
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    const getWatchlist = async()=>{
        let path = doc( db , 'Users' , `${cUser?.email}`)
        onSnapshot( path , (doc)=>{setSaved(doc.data()?.watchList)})
    }

    const deleteShow = async(id)=>{
        let path = doc( db , 'Users' , `${cUser?.email}`)
        try {
            const result = saved.filter((item)=>item.id !== id)
            await updateDoc( path , {
                watchList : result
            })
        getWatchlist()
        } catch (error) {
            
        }
    }
  return (
    <div>
        <h1 class = 'text-white font-bold md:text-xl p-4'>My Shows</h1>
        {
            saved ? 
            <div class = 'realtive flex items-center group'>
                <MdChevronLeft
                    onClick={slideLeft} 
                    size = {40} 
                    class = 'text-black rounded-full left-0 opacity-50 hover:opacity-100 bg-white absolute cursor-pointer z-10 hidden group-hover:block'
                />
                <div 
                    id = {'slider'} 
                    class = 'w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
                >
                    {
                        saved?.map((item)=>(
                            <div key = {item?.id} class = 'h-[150px] cursor-pointer w-[160px] sm:w-[200px] lg:w-[280px] inline-block relative p-2 mx-3'>
                                <Image 
                                    src = {`https://image.tmdb.org/t/p/original/${item?.backdrop}`}
                                    alt = {item?.title}
                                    fill = {true}
                                    objectFit='cover'
                                />
                                <div class = 'absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                    <p class = 'white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                        {item?.title}
                                    </p>
                                    <p class = 'absolute top-3 right-3'>
                                        <RxCrossCircled onClick = {()=>{deleteShow(item?.id)}} size = {18} class = 'cursor-pointer active:text-black text-slate-300'/>
                                    </p>
                                
                
                                </div>
                            </div>
                        )
                            
                            )
                    }
                </div>
                <MdChevronRight 
                    onClick={slideRight} 
                    size = {40} 
                    class = 'text-black rounded-full right-0 opacity-50 hover:opacity-100 bg-white absolute cursor-pointer z-10 group-hover:block'
                />
            </div>
            : <p className = 'text-slate-300 font-light text-md md:text-sm flex justify-center'>You have no liked movies or shows.</p>
        }
    </div>
  )
}

export default SavedShows