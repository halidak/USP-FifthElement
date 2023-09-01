import React from 'react'
import { Link } from 'react-router-dom'
import './CompanyItem.css'

function CompanyItem(props) {
    return (
        <Link to={`/poslodavci/${props.id}`}>
         <div className='card-container'>
            <div className='image-container'>
                <img src={props.photo} className='card-img'/>
            </div>
            <div className='card-title'>
               <h3 className='card-h3' data-testid="company-name"> {props.name} </h3>
               <p className='card-p'>{props.location}</p>
            </div>
         </div>
        </Link>
       )
}

export default CompanyItem
