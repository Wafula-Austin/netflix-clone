import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai'
import { onAuthStateChanged } from 'firebase/auth'
import { doc , updateDoc , arrayUnion } from 'firebase/firestore'
import { auth, db } from '../../../firebase-config'

const Movie = ({item}) => {

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged( auth , (user)=>{setCurrentUser(user)})
    return ()=>{
      unsubscribe()
    }
  })

const [ like , setLike ] = useState(false)
const [ cUser , setCurrentUser ] = useState()

const saveShow = async ()=>{
  let path = doc( db , 'Users' , `${cUser?.email}`)
  if(cUser){
    setLike(!like)

    await updateDoc( path , {
      watchList : arrayUnion({
        id : item?.id,
        backdrop : item?.backdrop_path,
        title : item?.title,
      })
    })
  }
  else{
    setLike(false)
    alert('Please Login To Like')
  }
}

  return (
    <div key = {item?.id} class = 'h-[150px] cursor-pointer w-[160px] sm:w-[200px] lg:w-[280px] inline-block relative p-2 mx-3'>
        <Image 
            src = {`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
            alt = {item?.title}
            fill = {true}
            objectFit='cover'
        />
        <div class = 'absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white overflow-clip'>
            <p class = 'white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center text-clip'>
                {item?.title}
            </p>
            { like ? <AiFillHeart onClick={saveShow} size = {18} class = 'absolute top-3 left-3 text-gray-300'/> : <AiOutlineHeart onClick={saveShow} size = {18} class = 'absolute top-4 left-4 text-gray-300'/>}

        </div>
    </div>
  )
}

export default Movie