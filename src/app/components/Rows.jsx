'use client'

import {useState , useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Movie from './Movie'
import { MdChevronLeft , MdChevronRight } from 'react-icons/md'

export default function Row({title , fetchUrl , rowId}) {

    useEffect(()=>{getData()} , [fetchUrl])

    const [ movies , setMovies ] = useState([])

    const getData = ()=>{
        axios.request(fetchUrl).then(
            (res)=>{
                setMovies(res.data.results)
            }
        )
    }

    const slideLeft = ()=>{
        var slider = document.getElementById('slider' + rowId)
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = ()=>{
        var slider = document.getElementById('slider' + rowId)
        slider.scrollLeft = slider.scrollLeft + 500
    }
  return (
    <>
        <h1 class = 'text-white font-bold md:text-xl p-4'>{title}</h1>
        <div class = 'realtive flex items-center group'>
            <MdChevronLeft 
                onClick={slideLeft} 
                size = {40} 
                class = 'rounded-full left-0 opacity-50 hover:opacity-100 bg-white absolute cursor-pointer z-10 hidden group-hover:block'
            />
            <div 
                id = {'slider' + rowId} 
                class = 'w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
            >
                {
                    movies?.map((item)=>(
                        <Movie key = {item?.id} item = {item}/>
                    ))
                }
            </div>
            <MdChevronRight 
                onClick={slideRight} 
                size = {40} 
                class = 'rounded-full right-0 opacity-50 hover:opacity-100 bg-white absolute cursor-pointer z-10 group-hover:block'
            />
        </div>
    </>
  )
}
