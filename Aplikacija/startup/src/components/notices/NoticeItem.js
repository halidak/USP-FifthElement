import React from 'react'
import { FaHeart } from 'react-icons/fa';
import './NoticeItem.css';

const colors = {
  gray: "#808080",
  red: "#FF0000"
};

function NoticeItem(props) {

  return (
    <div className='notice-par'>
    <li className='notice'>
      <div className='notice-text'>
        <h3 data-testid='notice-name'>{props.name}</h3>
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
      <div className='notice-img'>
        <img src={props.companyPhoto}/>
      </div>
      <div>
        <a>
        <FaHeart
        onClick={props.addToFavorites}
         color={props.clicked ? colors.red : colors.gray}
        size={24}
        />
        </a>
      </div>
    </div>
  )
}

export default NoticeItem
