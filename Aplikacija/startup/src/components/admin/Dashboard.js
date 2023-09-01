import React from 'react'
import './AdminPage.css'
import ListOfCompanies from './ListOfCompanies';
import ListOfNotices from './ListOfNotices';
import ListOfUsers from './ListOfUsers';

function Dashboard() {
  return (
  <div className='dash'>
    <ListOfUsers />
    <ListOfCompanies />
    <ListOfNotices />
  </div>
  )
}

export default Dashboard
