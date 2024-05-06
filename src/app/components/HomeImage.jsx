'use client'

import React from 'react'
import axios from 'axios'
import key from '../../../appConfig'
import { useState , useEffect } from 'react'
import Image from 'next/image'

export default function HomeImage(){

    useEffect(()=>{
        getMovie()
    },[])

    const [ movies , setMovies ] = useState([])
    const movie = movies[Math.floor(Math.random()*movies.length)]

    const truncateString = (str , num ) =>{
        if(str?.length > num){
            return str.slice(0 , num ) + '...'
        }else{
            return str
        }
    }

    const getMovie = ()=>{

        const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmY3M2NmMGIyNWQ1ZWY0OTc3ZmVhNWQwMTljMDc4NSIsInN1YiI6IjY0OTMwMjQ4NzA2ZTU2MDEwMDhjODgwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Oa3hW5zredNWlwTpNjAMUhuqRCXUgKTC8SlBVIS7eE'
        }
        }

        axios.request(options).then(function (response) {
            setMovies(response.data.results)
        })
        .catch(function (error) {
            console.error(error);
        })
    }
  return (
    <div class = 'overflow-hidden relative w-full h-[550px]'>
        <Image 
            src = {`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
            objectFit='cover' 
            alt={movie?.title}
            fill = {true}
            />
        <div class = 'w-full h-[550px] bg-gradient-to-r from-black absolute'></div>
        <div class = 'absolute w-full top-[20%] p-4 md:p-8 gap-2'>
            <h1 class = 'font-bold text-3xl md:text-5xl text-slate-50'>{movie?.title}</h1>
            <div class = 'my-4'>
                <button class = 'border border-gray-300 bg-gray-300 text-black py-2 px-5 mr-4'>Play</button>
                <button class = 'border border-gray-300 py-2 px-5 text-white'>Watch Later</button>
            </div>
            <h1 class = 'text-slate-400 text-sm'>Released : {movie?.release_date}</h1>
            <p class = 'w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.overview , 150)}</p>
        </div>
    </div>
  )
}