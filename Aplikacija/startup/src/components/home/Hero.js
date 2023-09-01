import React from 'react'
import Form from './Form'
import Heading from './Heading'
import './Hero.css'

const Hero = (props) => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
        <Heading title='Startuj Svoju Karijeru' subtitle='Najlakše do praksi!' />
        <div style={{maxWidth: '80%', margin: 'auto'}}>
        <Form setSearch={props.setSearch} setLocationSearch={props.setLocationSearch} setJobTypeSearch={props.setJobTypeSearch}/>
        </div>
        </div>
      </section>
    </>
  )
}

export default Hero
