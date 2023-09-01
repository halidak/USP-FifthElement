import React from 'react'
import Form from '../home/Form'
import  './Label.css'

export default function Label(props) {
  return (
    <div>
       <section className='summary'>
       <h2>Potraži ono što te zanima</h2>
        <Form setSearch={props.setSearch} setLocationSearch={props.setLocationSearch} setJobTypeSearch={props.setJobTypeSearch}/>
    </section>
    </div>
  )
}
