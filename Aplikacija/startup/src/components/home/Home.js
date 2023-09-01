import React from 'react'
import Hero from './Hero'


const Home = (props) => {
  return (
    <>
      <Hero setSearch={props.setSearch} setLocationSearch={props.setLocationSearch} setJobTypeSearch={props.setJobTypeSearch}/>
    </>
  )
}

export default Home
