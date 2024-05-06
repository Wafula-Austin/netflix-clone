'use client'

import NavBar from './components/Navbar'
import HomeImage from './components/HomeImage'
import Row from './components/Rows'
import requests from '../../appConfig'

export default function Home(){
  return(
    <div>
      <HomeImage/>
      <div>
        <Row rowId = '1'title = 'Upcoming' fetchUrl = {requests.requestUpcoming}/>
        <Row rowId = '2'title = 'Popular' fetchUrl = {requests.requestPopular}/>
        <Row rowId = '3'title = 'Trending' fetchUrl = {requests.requestTrending}/>
        <Row rowId = '4'title = 'Top Rated' fetchUrl = {requests.requestTopRated}/>
        <Row rowId = '5'title = 'Horror' fetchUrl = {requests.requestHorror}/>
      </div>
    </div>
  )
}