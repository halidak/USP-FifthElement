import React from 'react'
import './NoticeItem.css';

function CompanyNotice(props) {
  return (
    <div className='notice-par'>
    <li className='notice'>
      <div className='notice-text'>
        <h3>{props.name}</h3>
        <div className='description'>
            {props.companyName}
        </div>
        <div>
            <i className="fa fa-clock"></i>
            {props.date}
        </div>
        <div className='location'>
            <i className="fa fa-location-pin"></i>
            {props.location}
        </div>
      </div>
    </li>
    </div>
  )
}

export default CompanyNotice
