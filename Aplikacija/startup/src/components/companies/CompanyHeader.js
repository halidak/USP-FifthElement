import React from 'react'
import img from '../../assets/companyMain.jpg'
import './CompanyHeader.css'

function CompanyHeader() {
  return (
    <div className='img-div'>
      <img src={img}/>
      <div className='div-text'>
        <h1>Upoznajte poslodavce</h1>
        <p className='header-p'>Pretražite profile poslodavaca i saznajte uslove rada i sve druge važne informacije <br></br> o kompanijama koje vas zanimaju.</p>
      </div>
    </div>
  )
}

export default CompanyHeader
